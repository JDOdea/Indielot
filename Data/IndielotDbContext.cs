using Indielot.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Indielot.Data;

public class IndielotDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<Production> Productions { get; set; }
    public DbSet<Crew> Crews { get; set; }
    public DbSet<Asset> Assets { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Models.Task> Tasks { get; set; }
    public DbSet<BudgetItem> BudgetItems { get; set; }
    public DbSet<CalendarEvent> CalendarEvents { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }

    public IndielotDbContext(DbContextOptions<IndielotDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "2b37b6bd-3b14-4fbd-ba99-dc27ffdfde6f",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new()
            {
                Id = "ab68323a-e2d8-4fc9-8bbf-894709616766",
                UserName = "admin",
                Email = "adminLord@indielot.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "78c59dc5-1e6a-4202-816f-6b19a18a35e3",
                UserName = "jdodea",
                Email = "jdodea@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "94e90d54-0680-4603-8c30-cc75d6cf7ce6",
                UserName = "jholtzer",
                Email = "jholter@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "ef50e437-8431-4f82-bc74-195bfd22dba2",
                UserName = "molesen",
                Email = "molesen@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "f5201872-d716-48be-9ce4-4c6021e1f421",
                UserName = "speterson",
                Email = "speterson@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "5e4186f3-556b-42a9-8fc1-299e6ef701d8",
                UserName = "raggman",
                Email = "llanda@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            }
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "2b37b6bd-3b14-4fbd-ba99-dc27ffdfde6f",
            UserId = "ab68323a-e2d8-4fc9-8bbf-894709616766"
        });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
            new() 
            {
                Id = Guid.Parse("933e1e11-d3f5-4f35-b2d8-88fa9b16d9a9"),
                IdentityUserId = "ab68323a-e2d8-4fc9-8bbf-894709616766",
                FirstName = "Admina",
                LastName = "Strator",
                Address = "665 High Way",
                IsActive = true
            },
            new() 
            {
                Id = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161"),
                IdentityUserId = "78c59dc5-1e6a-4202-816f-6b19a18a35e3",
                FirstName = "JD",
                LastName = "Odea",
                Address = "620 Way High",
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("ae82495c-74ab-4660-9bd8-dc6a4403eaf9"),
                IdentityUserId = "94e90d54-0680-4603-8c30-cc75d6cf7ce6",
                FirstName = "Jake",
                LastName = "Holtzer",
                Address = "420 Ave",
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("1b9c7d32-7851-4a4b-9ec3-d00e4b010a4f"),
                IdentityUserId = "ef50e437-8431-4f82-bc74-195bfd22dba2",
                FirstName = "Malcolm",
                LastName = "Olesen",
                Address = "342 Blaze St",
                IsActive = true
            },
            new()
            {
                Id = Guid.Parse("270ead62-0129-42fd-b3a8-20dacdd629fd"),
                IdentityUserId = "f5201872-d716-48be-9ce4-4c6021e1f421",
                FirstName = "Scott",
                LastName = "Peterson",
                Address = "9230 Atlanta Blvd",
                IsActive = false
            },
            new()
            {
                Id = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e"),
                IdentityUserId = "5e4186f3-556b-42a9-8fc1-299e6ef701d8",
                FirstName = "Luis",
                LastName = "Landa",
                Address = "649 Grid City Lane",
                IsActive = true
            }
        });

        modelBuilder.Entity<Production>().HasData(new Production[]
        {
            new() 
            {
                Id = 1, Title = "Fix", Description = "What will you do for yours?", Completed = false, Budget = 12500.00f, ProductionLeadId = Guid.Parse("ae82495c-74ab-4660-9bd8-dc6a4403eaf9"), CreationDate = new DateTime(2023, 10, 16, 11, 30, 0)
            },
            new()
            {
                Id = 2, Title = "Spider-Man Noir and the Man Made of Stone", Completed = false, Description = "A short fan film based on the character created by David Hine", Budget = 40000.00f, ProductionLeadId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e"), CreationDate = new DateTime(2023, 10, 16, 11, 30, 0)
            },
            new()
            {
                Id = 3, Title = "Dissonance", Description = "Diabolus in Musica...", Completed = false, ProductionLeadId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161"), CreationDate = new DateTime(2023, 10, 16, 11, 30, 0)
            }
        });

        modelBuilder.Entity<Crew>().HasData(new Crew[]
        {
            new()
            {
                Id = 1, ProductionId = 1, Roles = new List<Role>() {Role.Director, Role.Writer, Role.Producer, Role.Casting}, UserProfileId = Guid.Parse("ae82495c-74ab-4660-9bd8-dc6a4403eaf9") 
            },
            new()
            {
                Id = 2, ProductionId = 1, Roles = new List<Role>() {Role.Actor, Role.Producer, Role.Casting}, UserProfileId = Guid.Parse("270ead62-0129-42fd-b3a8-20dacdd629fd")
            },
            new()
            {
                Id = 3, ProductionId = 1, Roles = new List<Role>() {Role.DirectorOfPhotography, Role.Editor}, UserProfileId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e")
            },
            new()
            {
                Id = 4, ProductionId = 1, Roles = new List<Role>() {Role.Actor, Role.Sound}, UserProfileId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            },
            new()
            {
                Id = 5, ProductionId = 1, Roles = new List<Role>() {Role.Actor, Role.Gaffer}, UserProfileId = Guid.Parse("1b9c7d32-7851-4a4b-9ec3-d00e4b010a4f")
            },
            new() 
            {
                Id = 6, ProductionId = 2, Roles = new List<Role>() {Role.Director, Role.Writer, Role.Actor}, UserProfileId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e")
            },
            new()
            {
                Id = 7, ProductionId = 3, Roles = new List<Role>() {Role.Director, Role.Writer}, UserProfileId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            }
        });

        modelBuilder.Entity<Asset>().HasData(new Asset[]
        {
            new()
            {
                Id = 1, ProductionId = 1, Title = "Call Sheet - Day 1", AssetType = "Call Sheet", UploadDate = new DateTime(2023, 10, 16, 10, 26, 0)
            },
            new()
            {
                Id = 2, ProductionId = 1, Title = "Call Sheet - Day 2", AssetType = "Call Sheet", UploadDate = new DateTime(2023, 10, 16, 10, 26, 0)
            }
        });

        modelBuilder.Entity<Location>().HasData(new Location[]
        {
            new()
            {
                Id = 1, ProductionId = 1, Name = "Int. Travis Apartment", Description = "1st AirBnb", Address = "2334 Ashley Road, Charlotte, NC 28208"
            },
            new()
            {
                Id = 2, ProductionId = 1, Name = "Ext. Jewelry Store", Description = "Morrison Smith Fine & Custom Jewelers", Address = "705 Providence Rd, Charlotte, NC 28207"
            },
            new()
            {
                Id = 3, ProductionId = 2, Name = "Ext. Apartment", Description = "Xanadu Condominium", Address = "750 N Atlantic Ave, Cocoa Beach, FL 32931"
            }
        });

        modelBuilder.Entity<Models.Task>().HasData(new Models.Task[]
        {
            new()
            {
                Id = 1, ProductionId = 1, Title = "SFX", Description = "Finish post sound sfx placement", Status = Models.TaskStatus.InProgress, AssignedUserId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            },
            new()
            {
                Id = 2, ProductionId = 2, Title = "Raise Funding", Description = "Acquire funding through Kickstarter", Status = Models.TaskStatus.InProgress, AssignedUserId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e")
            },
            new()
            {
                Id = 3, ProductionId = 3, Title = "Finish Script v1", Description = "Finish the first draft of script", Status = Models.TaskStatus.InProgress, AssignedUserId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            }
        });

    }
}