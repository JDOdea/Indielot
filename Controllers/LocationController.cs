using Indielot.Data;
using Indielot.Models;
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
}