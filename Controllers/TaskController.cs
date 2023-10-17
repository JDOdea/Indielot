using Indielot.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public TaskController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Tasks);
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(int id)
    {
        Models.Task task = _dbContext.Tasks.SingleOrDefault(t => t.Id == id);

        if (task != null)
        {
            return Ok(task);
        }

        return NotFound();
    }
}