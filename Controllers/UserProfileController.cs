using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Indielot.Data;
using Indielot.Models;
using Indielot.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public UserProfileController(IndielotDbContext context)
    {
        _dbContext = context;
    }



    [HttpGet]
    //[Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .Select(up => new UserProfileDTO
            {
                Id = up.Id,
                Name = up.FullName,
                UserName = up.IdentityUser.UserName,
                ProfilePicturePath = up.ProfilePicturePath
            }));
    }


    [HttpGet("withroles")]
    //[Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .Select(up => new UserProfile
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Email = up.Email,
                UserName = up.IdentityUser.UserName,
                ProfilePicturePath = up.ProfilePicturePath,
                Bio = up.Bio,
                CreateDateTime = up.CreateDateTime,
                IdentityUserId = up.IdentityUserId,
                Roles = _dbContext.UserRoles
                    .Where(ur => ur.UserId == up.IdentityUserId)
                    .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
                    .ToList()
            }).OrderBy(up => up.UserName).ToList());
    }


    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(string id)
    {
        UserProfile user = _dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == Guid.Parse(id));
        
        if (user != null)
        {
            user.Email = user.IdentityUser.Email;
            user.UserName = user.IdentityUser.UserName;
            return Ok(user);
        }

        return NotFound();
    }


    [HttpGet("activated")]
    //[Authorize]
    public IActionResult GetActivated()
    {
        return Ok(_dbContext.UserProfiles.Where(up => up.IsActive == true).ToList());
    }


    [HttpGet("deactivate")]
    //[Authorize]
    public IActionResult GetDeactivated()
    {
        return Ok(_dbContext.UserProfiles.Where(up => up.IsActive == false).ToList());
    }


    [HttpGet("withroles/{id}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult GetWithRolesById(string id)
    {
        UserProfile user = _dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == Guid.Parse(id));

        if (user != null)
        {
            return Ok(_dbContext.UserProfiles
                .Include(up => up.IdentityUser)
                .Where(up => up.Id == Guid.Parse(id))
                .Select(up => new UserProfile
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.IdentityUser.UserName,
                ProfilePicturePath = user.ProfilePicturePath,
                Bio = up.Bio,
                CreateDateTime = user.CreateDateTime,
                IdentityUserId = user.IdentityUserId,
                Roles = _dbContext.UserRoles
                    .Where(ur => ur.UserId == user.IdentityUserId)
                    .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
                    .ToList()
            }).SingleOrDefault(up => up.Id == Guid.Parse(id)));
        }

        return NotFound();
    }


    [HttpGet("withroles/activated")]
    //[Authorize(Roles = "Admin")]
    public IActionResult GetActivatedWithRoles()
    {
        return Ok(_dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .Where(up => up.IsActive == true)
            .Select(up => new UserProfile
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Email = up.Email,
                UserName = up.IdentityUser.UserName,
                ProfilePicturePath = up.ProfilePicturePath,
                Bio = up.Bio,
                CreateDateTime = up.CreateDateTime,
                IdentityUserId = up.IdentityUserId,
                Roles = _dbContext.UserRoles
                    .Where(ur => ur.UserId == up.IdentityUserId)
                    .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
                    .ToList()
            }).ToList());
    }


    [HttpGet("withroles/deactivated")]
    //[Authorize(Roles = "Admin")]
    public IActionResult GetDeactivatedWithRoles()
    {
        return Ok(_dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .Where(up => up.IsActive == false)
            .Select(up => new UserProfile
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Email = up.Email,
                UserName = up.IdentityUser.UserName,
                ProfilePicturePath = up.ProfilePicturePath,
                Bio = up.Bio,
                CreateDateTime = up.CreateDateTime,
                IdentityUserId = up.IdentityUserId,
                Roles = _dbContext.UserRoles
                    .Where(ur => ur.UserId == up.IdentityUserId)
                    .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
                    .ToList()
            }).ToList());
    }


    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult EditUserProfile(string id, UserProfile userProfile)
    {
        UserProfile foundUserProfile = _dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == Guid.Parse(id));

        if (foundUserProfile != null)
        {
            foundUserProfile.FirstName = userProfile.FirstName;
            foundUserProfile.LastName = userProfile.LastName;
            foundUserProfile.Email = userProfile.Email;
            foundUserProfile.IdentityUser.UserName = userProfile.UserName;
            foundUserProfile.Address = userProfile.Address;
            _dbContext.SaveChanges();

            return NoContent();
        }

        return NotFound();
    }

    [HttpPut("activate/{id}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult ActivateUser(string id)
    {
        UserProfile userToActivate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == Guid.Parse(id));

        if (userToActivate != null)
        {
            userToActivate.IsActive = true;
            _dbContext.SaveChanges();

            return NoContent();
        }

        return NotFound();
    }

    [HttpPut("deactivate/{id}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult DeactivateUser(string id)
    {
        UserProfile userToDeactivate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == Guid.Parse(id));

        if (userToDeactivate != null)
        {
            userToDeactivate.IsActive = false;
            _dbContext.SaveChanges();
            
            return NoContent();
        }

        return NotFound();
    }

    [HttpPost("image")]
    //[Authorize]
    public IActionResult UploadImage()
    {
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(@"https://cloudinary-devs.github.io/cld-docs-assets/assets/images/cld-sample.jpg"),
            UseFilename = true,
            UniqueFilename = false,
            Overwrite = true
        };
        
        return NoContent();
    }


    [HttpPost("promote/{id}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult Promote(string id)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        UserProfile user = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == Guid.Parse(id));

        _dbContext.UserRoles.Add(new IdentityUserRole<string>
        {
            RoleId = role.Id,
            UserId = user.IdentityUserId
        });
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("demote/{id}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult Demote(string id)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        UserProfile user = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == Guid.Parse(id));
        IdentityUserRole<string> userRole = _dbContext.UserRoles.SingleOrDefault(ur => ur.RoleId == role.Id && ur.UserId == user.IdentityUserId);

        if (_dbContext.UserRoles.Where(ur => ur.RoleId == role.Id).Count() > 1)
        {
            _dbContext.UserRoles.Remove(userRole);
            _dbContext.SaveChanges();

            return NoContent();
        }
        return StatusCode(418, "At least 1 admin must exist at all times.");
    }

}