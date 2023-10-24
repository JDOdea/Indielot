using Indielot.Data;
using Indielot.Models;
using Indielot.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        return Ok(_dbContext.Assets
            .Include(a => a.Production)
            .Include(a => a.Uploader)
            .Select(a => new AssetDTO
            {
                Id = a.Id,
                AssetName = a.AssetName,
                FileLocation = a.FileLocation,
                AssetType = a.GetAssetTypeName(a.AssetType),
                UploadedBy = a.Uploader.FullName,
                ProductionTitle = a.Production.Title,
                UploadDate = a.UploadDate
            }));
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(string id)
    {
        Asset asset = _dbContext.Assets
        .Include(a => a.Production)
        .Include(a => a.Uploader)
        .SingleOrDefault(a => a.Id == Guid.Parse(id));

        if (asset != null)
        {
            return Ok(_dbContext.Assets
                .Select(a => new AssetDTO
                {
                    Id = a.Id,
                    AssetName = a.AssetName,
                    FileLocation = a.FileLocation,
                    AssetType = a.GetAssetTypeName(a.AssetType),
                    UploadedBy = asset.Uploader.FullName,
                    ProductionTitle = asset.Production.Title,
                    UploadDate = a.UploadDate
                }).SingleOrDefault(a => a.Id == Guid.Parse(id)));
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
            return Ok(_dbContext.Assets
                .Include(a => a.Production)
                .Include(a => a.Uploader)
                .Where(a => a.ProductionId == Guid.Parse(productionId))
                .Select(a => new AssetDTO
                {
                    Id = a.Id,
                    AssetName = a.AssetName,
                    FileLocation = a.FileLocation,
                    AssetType = a.GetAssetTypeName(a.AssetType),
                    UploadedBy = a.Uploader.FullName,
                    ProductionTitle = a.Production.Title,
                    UploadDate = a.UploadDate
                }));
        }

        return NotFound();
    }

    [HttpGet("types")]
    //[Authorize]
    public IActionResult GetTypes()
    {
        var types = Enum.GetNames(typeof(AssetType)).ToList();

        return Ok(types);
    }

    [HttpPost]
    //[Authorize]
    public IActionResult CreateAsset(Asset asset)
    {
        Enum.TryParse(asset.AssetName, out AssetType assetType);
        asset.AssetType = assetType;
        asset.UploadDate = DateTime.Now;

        _dbContext.Assets.Add(asset);
        _dbContext.SaveChanges();

        return Created($"/api/asset/{asset.Id}", asset);
    }
}