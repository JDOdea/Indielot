using Indielot.Data;
using Indielot.Models;
using Indielot.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CrewController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public CrewController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Crews
            .Select(c => new CrewDTO
            {
                Id = c.Id,
                Name = c.UserProfile.FullName,
                ProfilePicturePath = c.UserProfile.ProfilePicturePath,
                ProductionTitle = c.Production.Title,
                Roles = c.GetRoleNames(c.Roles)
            }));
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(string id)
    {
        Crew crew = _dbContext.Crews
        .Include(c => c.UserProfile)
        .Include(c => c.Production)
        .SingleOrDefault(c => c.Id == Guid.Parse(id));

        if (crew != null)
        {
            return Ok(_dbContext.Crews
                .Select(c => new CrewDTO
                {
                    Id = c.Id,
                    Name = c.UserProfile.FullName,
                    ProfilePicturePath = c.UserProfile.ProfilePicturePath,
                    ProductionTitle = crew.Production.Title,
                    Roles = c.GetRoleNames(c.Roles)
                }).SingleOrDefault(c => c.Id == Guid.Parse(id)));
        }

        return NotFound();
    }

    [HttpGet("production/{productionId}")]
    //[Authorize]
    public IActionResult GetByProductionId(string productionId)
    {
        Production production = _dbContext.Productions.SingleOrDefault(p => p.Id == Guid.Parse(productionId));

        if (production != null)
        {
            return Ok(_dbContext.Crews
                .Include(c => c.UserProfile)
                .Include(c => c.Production)
                .Where(c => c.ProductionId == Guid.Parse(productionId))
                .Select(c => new CrewDTO
                {
                    Id = c.Id,
                    Name = c.UserProfile.FullName,
                    ProfilePicturePath = c.UserProfile.ProfilePicturePath,
                    ProductionTitle = c.Production.Title,
                    Roles = c.GetRoleNames(c.Roles)
                }));
        }

        return NotFound();
    }

    [HttpGet("roles")]
    //[Authorize]
    public IActionResult GetRoles()
    {
        var roles  = Enum.GetNames(typeof(Role)).ToList();

        return Ok(roles);
    }

    [HttpPost]
    //[Authorize]
    public IActionResult CreateCrewMember(Crew crew)
    {
        List<Role> roles = new List<Role>();
        foreach (string r in crew.RoleNames)
        {   
            Enum.TryParse(r, out Role role);
            roles.Add(role);
        }
        crew.Roles = roles;

        _dbContext.Crews.Add(crew);
        _dbContext.SaveChanges();
        
        return Created($"/api/crew/{crew.Id}", crew);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdateCrewMember(Crew updatedCrewMember)
    {
        Crew crew = _dbContext.Crews.SingleOrDefault((c) => c.Id == updatedCrewMember.Id);

        if (crew != null)
        {
            crew.RoleNames = updatedCrewMember.RoleNames;

            List<Role> roles = new();
            foreach (string r in updatedCrewMember.RoleNames)
            {
                Enum.TryParse(r, out Role role);
                roles.Add(role);
            }
            crew.Roles = roles;

            _dbContext.SaveChanges();

            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeleteCrewMember(string id)
    {
        Crew crew = _dbContext.Crews.SingleOrDefault((c) => c.Id == Guid.Parse(id));

        if (crew != null)
        {
            _dbContext.Crews.Remove(crew);
            _dbContext.SaveChanges();

            return NoContent();
        }

        return NotFound();
    }
}