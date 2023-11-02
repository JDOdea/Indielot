using Indielot.Data;
using Indielot.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CalendarEventController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public CalendarEventController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.CalendarEvents
            .Include(c => c.Production)
            .Include(c => c.Location));
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(string id)
    {
        CalendarEvent calendarEvent = _dbContext.CalendarEvents
            .Include(c => c.Production)
            .Include(c => c.Location)
            .SingleOrDefault(c => c.Id == Guid.Parse(id));

        if (calendarEvent != null)
        {
            return Ok(calendarEvent);
        }

        return NotFound();
    }

    [HttpGet("production/{productionId}")]
    // [Authorize]
    public IActionResult GetByProductionId(string productionId)
    {
        Production production = _dbContext.Productions.SingleOrDefault((p) => p.Id == Guid.Parse(productionId));

        if (production != null)
        {
            return Ok(_dbContext.CalendarEvents
                .Include(c => c.Production)
                .Include(c => c.Location)
                .Where(c => c.ProductionId == Guid.Parse(productionId))
                .ToList());
        }

        return NotFound();
    }

    [HttpPost]
    // [Authorize]
    public IActionResult CreateCalendarEvent(CalendarEvent calendarEvent)
    {

        _dbContext.CalendarEvents.Add(calendarEvent);
        _dbContext.SaveChanges();

        return Created($"/api/calendarevent/{calendarEvent.Id}", calendarEvent);
    }
}