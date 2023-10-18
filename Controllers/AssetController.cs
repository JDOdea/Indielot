using Indielot.Data;
using Indielot.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssetController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public AssetController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Assets);
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(string id)
    {
        Asset asset = _dbContext.Assets.SingleOrDefault(a => a.Id == Guid.Parse(id));

        if (asset != null)
        {
            return Ok(asset);
        }

        return NotFound();
    }
}