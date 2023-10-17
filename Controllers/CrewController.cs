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
        return Ok(_dbContext.Crews);
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(int id)
    {
        Crew crew = _dbContext.Crews
        .Include(c => c.UserProfile)
        .Include(c => c.Production)
        .SingleOrDefault(c => c.Id == id);

        if (crew != null)
        {
            List<string> roleStrings = crew.Roles.Select(r => Enum.GetName(typeof(Role), r)).ToList();

            return Ok(_dbContext.Crews
                .Select(c => new CrewDTO
                {
                    Id = c.Id,
                    Name = c.UserProfile.FullName,
                    ProfilePicturePath = c.UserProfile.ProfilePicturePath,
                    ProductionTitle = crew.Production.Title,
                    Roles = roleStrings
                }).SingleOrDefault(c => c.Id == id));
        }

        return NotFound();
    }

    /* [HttpGet("production/{productionId}")]
    //[Authorize]
    public IActionResult GetByProductionId(int productionId)
    {
        Production production = _dbContext.Productions.SingleOrDefault(p => p.Id == productionId);

        if (production != null)
        {

        }
    } */
}