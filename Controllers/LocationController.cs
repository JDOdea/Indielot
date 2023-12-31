using Indielot.Data;
using Indielot.Models;
using Indielot.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public LocationController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Locations);
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(string id)
    {
        Location location = _dbContext.Locations.SingleOrDefault(l => l.Id == Guid.Parse(id));

        if (location != null)
        {
            return Ok(location);
        }

        return NotFound();
    }

    [HttpGet("production/{productionId}")]
    //[Authorize]
    public IActionResult GetByProductionId(string productionId)
    {
        Production production = _dbContext.Productions.SingleOrDefault((p) => p.Id == Guid.Parse(productionId));

        if (production != null)
        {
            return Ok(_dbContext.Locations
                .Where(l => l.ProductionId == Guid.Parse(productionId))
                .Select(l => new LocationDTO
                {
                    Id = l.Id,
                    Name = l.Name,
                    Description = l.Description,
                    Address = l.Address,
                    Photos = l.Photos
                }));
        }

        return NotFound();
    }

    [HttpPost]
    //[Authorize]
    public IActionResult CreateLocation(Location location)
    {
        _dbContext.Locations.Add(location);
        _dbContext.SaveChanges();

        return Created($"/api/location/{location.Id}", location);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdateLocation(Location updatedLocation)
    {
        Location location = _dbContext.Locations.SingleOrDefault((l) => l.Id == updatedLocation.Id);

        if (location != null)
        {
            location.Name = updatedLocation.Name;
            location.Description = updatedLocation.Description;
            location.Address = updatedLocation.Address;

            _dbContext.SaveChanges();

            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeleteLocation(string id)
    {
        Location location = _dbContext.Locations.SingleOrDefault((l) => l.Id == Guid.Parse(id));

        if (location != null)
        {
            _dbContext.Locations.Remove(location);
            _dbContext.SaveChanges();

            return NoContent();
        }
        
        return NotFound();
    }
}