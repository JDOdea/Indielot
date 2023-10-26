using Indielot.Data;
using Indielot.Models;
using Indielot.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public IActionResult GetById(string id)
    {
        Models.Task task = _dbContext.Tasks.SingleOrDefault(t => t.Id == Guid.Parse(id));

        if (task != null)
        {
            return Ok(task);
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
            return Ok(_dbContext.Tasks
                .Include(t => t.AssignedCrew)
                .ThenInclude(c => c.UserProfile)
                .Where(t => t.ProductionId == Guid.Parse(productionId))
                .Select(t => new TaskDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    AssignedTo = t.AssignedCrew.UserProfile.FullName,
                    DueDate = t.DueDate,
                    TaskStatus = t.GetTaskStatusName(t.TaskStatus)
                }));
        }

        return NotFound();
    }

    [HttpGet("statuses")]
    //[Authorize]
    public IActionResult GetStatuses()
    {
        var statuses = Enum.GetNames(typeof(Models.TaskStatus)).ToList();

        return Ok(statuses);
    }

    [HttpPost]
    //[Authorize]
    public IActionResult CreateTask(Models.Task task)
    {
        if (task.TaskStatusName == "")
        {
            task.TaskStatusName = "ToDo";
        }
        Enum.TryParse(task.TaskStatusName, out Models.TaskStatus taskStatus);
        task.TaskStatus = taskStatus;

        task.AssignedOn = DateTime.Now;

        _dbContext.Tasks.Add(task);
        _dbContext.SaveChanges();

        return Created($"/api/task/{task.Id}", task);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdateTask(Models.Task task)
    {

        return NotFound();
    }

    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeleteTask(string id)
    {
        Models.Task task = _dbContext.Tasks.SingleOrDefault((t) => t.Id == Guid.Parse(id));

        if (task != null)
        {
            _dbContext.Tasks.Remove(task);
            _dbContext.SaveChanges();

            return NoContent();
        }

        return NotFound();
    }
}