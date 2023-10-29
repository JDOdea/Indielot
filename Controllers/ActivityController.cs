using Indielot.Data;
using Indielot.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivityController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public ActivityController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Activities
            .Include(a => a.Production)
            .Include(a => a.UpdatedBy)
            .OrderByDescending(a => a.ActivityDate));
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(string id)
    {
        Activity activity = _dbContext.Activities
            .Include(a => a.Production)
            .Include(a => a.UpdatedBy)
            .SingleOrDefault(a => a.Id == Guid.Parse(id));

        if (activity != null)
        {
            return Ok(activity);
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
            return Ok(_dbContext.Activities
                .Include(a => a.UpdatedBy)
                .Include(a => a.Production)
                .Where(a => a.UpdaterId == Guid.Parse(userId))
                .OrderByDescending(a => a.ActivityDate)
                .ToList());
        }

        return NotFound();
    }
}