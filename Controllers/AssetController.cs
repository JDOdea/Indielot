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
}

// Upload an image and log the response to the console
//=======================================
/* var uploadParams = new ImageUploadParams()
{
    File = new FileDescription(@"https://cloudinary-devs.github.io/cld-docs-assets/assets/images/cld-sample.jpg"),
    UseFilename = true,
    UniqueFilename = false,
    Overwrite = true
};
var uploadResult = cloudinary.Upload(uploadParams);
Console.WriteLine(uploadResult.JsonObj); */