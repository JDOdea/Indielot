using Indielot.Data;
using Indielot.Models;
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
            .Include(p => p.ProductionLead));
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(int id)
    {
        Production production = _dbContext.Productions
            .Include(p => p.ProductionLead)
            .SingleOrDefault(p => p.Id == id);

        if (production != null)
        {
            return Ok(production);
        }

        return NotFound();
    }
}