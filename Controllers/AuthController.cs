using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Indielot.Models;
using Indielot.Data;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private IndielotDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public AuthController(IndielotDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public IActionResult Login([FromHeader(Name = "Authorization")] string authHeader)
    {
        try
        {
            string encodedCreds = authHeader[6..].Trim();// MAKE SURE WORKS
            string creds = Encoding
                .GetEncoding("iso-8859-1")
                .GetString(Convert.FromBase64String(encodedCreds));

                // Get email and password
                int seperator = creds.IndexOf(':');
                string email = creds[..seperator];// MAKE SURE
                string password = creds[(seperator + 1)..];// MAKE SURE

                var user = _dbContext.Users.Where(u => u.Email == email).FirstOrDefault();
                var userRoles = _dbContext.UserRoles.Where(ur => ur.UserId == user.Id).ToList();
                var hasher = new PasswordHasher<IdentityUser>();
                var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);
                if (user != null && result == PasswordVerificationResult.Success)
                {
                    var claims = new List<Claim>
                    {
                        new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new(ClaimTypes.Name, user.UserName.ToString()),
                        new(ClaimTypes.Email, user.Email)
                    };

                    foreach (var userRole in userRoles)
                    {
                        var role = _dbContext.Roles.FirstOrDefault(r => r.Id == userRole.RoleId);
                        claims.Add(new Claim(ClaimTypes.Role, role.Name));
                    }

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity)
                    ).Wait();

                    return Ok();
                }

                return new UnauthorizedResult();
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }

    [HttpGet]
    [Route("logout")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public IActionResult Logout()
    {
        try
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).Wait();
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }

    [HttpGet("Me")]
    [Authorize]
    public IActionResult Me()
    {
        var cookie = Request.Cookies["IndielotLoginCookie"];
        
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);
        var roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();
        if (profile != null)
        {
            profile.UserName = User.FindFirstValue(ClaimTypes.Name);
            profile.Email = User.FindFirstValue(ClaimTypes.Email);
            profile.Roles = roles;

            /* return Ok(profile); */
            return Ok(new { profile, token = cookie });
        }
        return NotFound();
    }

    [HttpGet("Token")]
    [Authorize]
    public IActionResult Token()
    {
        try
        {
            var cookie = Request.Cookies["IndielotLoginCookie"];

            if (!string.IsNullOrEmpty(cookie))
            {
                return Ok(new { token = cookie });
            }
            return NotFound();
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(Registration registration)
    {
        var user = new IdentityUser
        {
            UserName = registration.UserName,
            Email = registration.Email
        };

        var password = Encoding
            .GetEncoding("iso-8859-1")
            .GetString(Convert.FromBase64String(registration.Password));

        var result = await _userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            _dbContext.UserProfiles.Add(new UserProfile
            {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                Address = registration.Address,
                IdentityUserId = user.Id,
            });
            _dbContext.SaveChanges();

            var claims = new List<Claim>
                {
                    new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new(ClaimTypes.Name, user.UserName.ToString()),
                    new(ClaimTypes.Email, user.Email)
                };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity))
            .Wait();
            
            return Ok();
        }
        return StatusCode(500);
    }
}