using Indielot.Data;
using Indielot.Models;
using Indielot.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductionController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public ProductionController(IndielotDbContext context)
    {
        _dbContext = context;
    }


    [HttpGet]
    //[Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Productions
            .Include(p => p.ProductionLead)
            .Select(p => new ProductionDTO
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                PicturePath = p.PicturePath,
                ProductionLead = p.ProductionLead.FullName,
                Completed = p.Completed,
                Crew = _dbContext.Crews
                    .Include(c => c.UserProfile)
                    .Where(c => c.ProductionId == p.Id)
                    .Select(c => new CrewDTO
                    {
                        Id = c.Id,
                        Name = c.UserProfile.FullName,
                        ProfilePicturePath = c.UserProfile.ProfilePicturePath,
                        Roles = c.GetRoleNames(c.Roles)
                    })
                    .ToList()
            }));
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(string id)
    {
        Production production = _dbContext.Productions
            .Include(p => p.ProductionLead)
            .SingleOrDefault(p => p.Id == Guid.Parse(id));

        if (production != null)
        {
            return Ok(_dbContext.Productions
                .Select(p => new ProductionDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    PicturePath = p.PicturePath,
                    ProductionLead = production.ProductionLead.FullName,
                    Completed = p.Completed,
                    Crew = _dbContext.Crews
                        .Include(c => c.UserProfile)
                        .Where(c => c.ProductionId == p.Id)
                        .Select(c => new CrewDTO
                        {
                            Id = c.Id,
                            Name = c.UserProfile.FullName,
                            ProfilePicturePath = c.UserProfile.ProfilePicturePath,
                            Roles = c.GetRoleNames(c.Roles)
                        })
                        .ToList()
                }).SingleOrDefault(p => p.Id == Guid.Parse(id)));
        }

        return NotFound();
    }

    [HttpGet("user/{userId}")]
    //[Authorize]
    public IActionResult GetByUserId(string userId)
    {
        UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == Guid.Parse(userId));

        if (userProfile != null)
        {
            List<Production> productions = _dbContext.Productions
                .Include(p => p.Crew)
                .Where(p => p.ProductionLeadId == Guid.Parse(userId) || p.Crew.Any(c => c.UserProfileId == Guid.Parse(userId)))
                .ToList();

            return Ok(_dbContext.Productions
                .Include(p => p.Crew)
                .Where(p => p.ProductionLeadId == Guid.Parse(userId) || p.Crew.Any(c => c.UserProfileId == Guid.Parse(userId)))
                .Select(p => new ProductionDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    PicturePath = p.PicturePath,
                    ProductionLead = p.ProductionLead.FullName,
                    Completed = p.Completed,
                    Crew = _dbContext.Crews
                        .Include(c => c.UserProfile)
                        .Where(c => c.ProductionId == p.Id)
                        .Select(c => new CrewDTO
                        {
                            Id = c.Id,
                            Name = c.UserProfile.FullName,
                            ProfilePicturePath = c.UserProfile.ProfilePicturePath,
                            Roles = c.GetRoleNames(c.Roles)
                        })
                        .ToList()
                })
                .ToList());
        }

        return NotFound();
    }

    [HttpGet("user/{userId}/active")]
    //[Authorize]
    public IActionResult GetActiveByUserId(string userId)
    {
        UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == Guid.Parse(userId));

        if (userProfile != null)
        {
            List<Production> productions = _dbContext.Productions
                .Include(p => p.Crew)
                .Where(p => p.ProductionLeadId == Guid.Parse(userId) || p.Crew.Any(c => c.UserProfileId == Guid.Parse(userId)))
                .Where(p => p.Completed == false)
                .ToList();

            return Ok(_dbContext.Productions
                .Include(p => p.Crew)
                .Where(p => p.ProductionLeadId == Guid.Parse(userId) || p.Crew.Any(c => c.UserProfileId == Guid.Parse(userId)))
                .Where(p => p.Completed == false)
                .Select(p => new ProductionDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    PicturePath = p.PicturePath,
                    ProductionLead = p.ProductionLead.FullName,
                })
                .ToList());
        }

        return NotFound();
    }

    [HttpPost]
    //[Authorize]
    public IActionResult CreateProduction(Production production)
    {
        production.CreationDate = DateTime.Now;
        _dbContext.Productions.Add(production);

        Activity activity = new()
        {
            ProductionId = production.Id,
            UpdaterId = production.ProductionLeadId,
            ActivityDate = production.CreationDate,
            Description = $"created a new production.",
            ActivityType = ActivityType.Created
        };
        _dbContext.Activities.Add(activity);

        _dbContext.SaveChanges();

        return Created($"/api/production/{production.Id}", production);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdateProduction(string id, Production production)
    {
        Production foundProduction = _dbContext.Productions.SingleOrDefault(p => p.Id == Guid.Parse(id));

        if (foundProduction != null)
        {
            foundProduction.Title = production.Title;
            foundProduction.Description = production.Description;
            foundProduction.PicturePath = production.PicturePath;
            foundProduction.Budget = production.Budget;

            Activity activity = new()
            {
                ProductionId = foundProduction.Id,
                UpdaterId = foundProduction.ProductionLeadId,
                ActivityDate = DateTime.Now,
                Description = $"edited",
                ActivityType = ActivityType.Edited
            };

            _dbContext.Activities.Add(activity);
            
            _dbContext.SaveChanges();
            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeleteProduction(string id)
    {
        Production production = _dbContext.Productions.SingleOrDefault(p => p.Id == Guid.Parse(id));

        if (production != null)
        {
            Activity activity = new()
            {
                ProductionId = production.Id,
                UpdaterId = production.ProductionLeadId,
                ActivityDate = DateTime.Now,
                Description = $"deleted a production.",
                ActivityType = ActivityType.Deleted
            };

            // TODO: fix cascading delete
            _dbContext.Activities.Add(activity);

            _dbContext.Productions.Remove(production);
            _dbContext.SaveChanges();
            return NoContent();
        }

        return NotFound();
    }
}