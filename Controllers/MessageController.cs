using Indielot.Data;
using Indielot.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public MessageController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Messages
            .Include(m => m.Sender)
            .Include(m => m.Recipients));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        Message message = _dbContext.Messages
            .Include(m => m.Sender)
            .Include(m => m.Recipients)
            .SingleOrDefault(m => m.Id == Guid.Parse(id));

        if (message != null)
        {
            return Ok(message);
        }

        return NotFound();
    }
}