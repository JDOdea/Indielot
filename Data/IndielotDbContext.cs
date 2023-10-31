using Indielot.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Indielot.Data;

public class IndielotDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Asset> Assets { get; set; }
    public DbSet<BudgetItem> BudgetItems { get; set; }
    public DbSet<CalendarEvent> CalendarEvents { get; set; }
    public DbSet<Conversation> Conversations { get; set; }
    public DbSet<Crew> Crews { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<Production> Productions { get; set; }
    public DbSet<Models.Task> Tasks { get; set; }
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

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "2b37b6bd-3b14-4fbd-ba99-dc27ffdfde6f",
            UserId = "ab68323a-e2d8-4fc9-8bbf-894709616766"
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
                Email = "jholtzer@gmail.com",
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
            },
            new()
            {
                Id = "423c1930-c35b-4db9-84c6-09f0474fcc1b",
                UserName = "wondergoof",
                Email = "dallasfitzmartin@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "7dbd6a7e-a548-4135-ab73-2e5c31d14ac6",
                UserName = "rseaton",
                Email = "rexseaton@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "8b1f1e01-4410-4d3a-ac09-259bd22facb9",
                UserName = "aRivera",
                Email = "arivera@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "ed5cb760-c48e-461d-81b6-be0493f170aa",
                UserName = "gBlaising",
                Email = "gblaising@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "f6dc9b65-be4e-43a6-b1de-567d71e200b9",
                UserName = "htumlin",
                Email = "htumlin@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new()
            {
                Id = "ca7f67e0-072a-476a-bc6a-66f840c7ad91",
                UserName = "confused.potat",
                Email = "niceschoop@gmail.com",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            }
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
            },
            new()
            {
                Id = Guid.Parse("ee177a02-2229-40b2-b8f0-0ee2c1a96a75"),
                IdentityUserId = "423c1930-c35b-4db9-84c6-09f0474fcc1b",
                FirstName = "Dallas",
                LastName = "Fitzmartin",
                Address = "101 Sleepy St"
            },
            new()
            {
                Id = Guid.Parse("fdb68970-1e2b-4dfa-86cd-c4e6c66f0bdb"),
                IdentityUserId = "7dbd6a7e-a548-4135-ab73-2e5c31d14ac6",
                FirstName = "Rex",
                LastName = "Seaton",
                Address = "746 Ocean Way"
            },
            new()
            {
                Id = Guid.Parse("4e5fb806-b237-4407-9444-f0327b989ca1"),
                IdentityUserId = "8b1f1e01-4410-4d3a-ac09-259bd22facb9",
                FirstName = "Angel",
                LastName = "Rivera",
                Address = "829 Main St"
            },
            new()
            {
                Id = Guid.Parse("8b903d43-d840-40d5-a8e0-2b5d541ed15d"),
                IdentityUserId = "ed5cb760-c48e-461d-81b6-be0493f170aa",
                FirstName = "Gracie",
                LastName = "Blaising",
                Address = "1421 Forest Court"
            },
            new()
            {
                Id = Guid.Parse("c58a7b97-9d50-461a-8ccc-95a088ea8ff3"),
                IdentityUserId = "f6dc9b65-be4e-43a6-b1de-567d71e200b9",
                FirstName = "Hayden",
                LastName = "Tumlin",
                Address = "6180 Elvin Haven"
            },
            new()
            {
                Id = Guid.Parse("37f8540b-cc7c-4c7d-bf39-9c479cfa23b4"),
                IdentityUserId = "ca7f67e0-072a-476a-bc6a-66f840c7ad91",
                FirstName = "Nicole",
                LastName = "Schoop",
                Address = "78430 Forest Plaza"
            }
        });

        modelBuilder.Entity<Production>().HasData(new Production[]
        {
            new() 
            {
                Id = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"),
                Title = "Fix", Description = "What will you do for yours?",
                Completed = false,
                Budget = 12500.00f,
                ProductionLeadId = Guid.Parse("ae82495c-74ab-4660-9bd8-dc6a4403eaf9"),
                CreationDate = new DateTime(2023, 10, 16, 11, 30, 0)
            },
            new()
            {
                Id = Guid.Parse("b9e4cf53-6075-4270-a2d5-8451c3f708d4"),
                Title = "Spider-Man Noir and the Man Made of Stone",
                Completed = false,
                Description = "A short fan film based on the character created by David Hine",
                Budget = 40000.00f,
                ProductionLeadId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e"),
                CreationDate = new DateTime(2023, 10, 16, 11, 30, 0)
            },
            new()
            {
                Id = Guid.Parse("020f13be-c902-4a27-a6c6-b3dea5fa880c"),
                Title = "Dissonance",
                Description = "Diabolus in Musica...",
                Completed = false,
                ProductionLeadId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161"),
                CreationDate = new DateTime(2023, 10, 16, 11, 30, 0)
            },
            new()
            {
                Id = Guid.Parse("6763e702-f5ff-454b-89e8-bcf03582ccc5"),
                Title = "Polterguys",
                Description = "Who you gonna call?",
                Completed = true,
                ProductionLeadId = Guid.Parse("8b903d43-d840-40d5-a8e0-2b5d541ed15d"),
                CreationDate = new DateTime(2023, 10, 10, 12, 00, 0)
            },
            new()
            {
                Id = Guid.Parse("1226e4a2-a488-4274-bc59-30c830af5272"),
                Title = "My Type",
                Completed = true,
                ProductionLeadId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e"),
                CreationDate = new DateTime(2023, 10, 10, 12, 00, 0)
            }
        });

        modelBuilder.Entity<Crew>().HasData(new Crew[]
        {
            new()
            {
                Id = Guid.Parse("ab0b6219-ab0c-48f2-a9f8-3e5a62c85168"),
                ProductionId = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"), 
                Roles = new List<Role>() {Role.Director, Role.Writer, Role.Producer, Role.Casting}, 
                UserProfileId = Guid.Parse("ae82495c-74ab-4660-9bd8-dc6a4403eaf9") 
            },
            new()
            {
                Id = Guid.Parse("07cd44dc-3a03-49ca-9449-7179c1426202"), 
                ProductionId = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"), 
                Roles = new List<Role>() {Role.Actor, Role.Producer, Role.Casting}, 
                UserProfileId = Guid.Parse("270ead62-0129-42fd-b3a8-20dacdd629fd")
            },
            new()
            {
                Id = Guid.Parse("d003e6a3-54c1-443b-8ed1-8f6e68221055"), 
                ProductionId = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"), 
                Roles = new List<Role>() {Role.DirectorOfPhotography, Role.Editor}, 
                UserProfileId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e")
            },
            new()
            {
                Id = Guid.Parse("302e2c54-f572-4e31-a63b-02d37af46a15"), 
                ProductionId = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"), 
                Roles = new List<Role>() {Role.Actor, Role.Sound},
                UserProfileId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            },
            new()
            {
                Id = Guid.Parse("95a17e7b-bc65-4bdd-8acf-3ff5c6e3f36c"),
                ProductionId = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"), 
                Roles = new List<Role>() {Role.Actor, Role.Gaffer}, 
                UserProfileId = Guid.Parse("1b9c7d32-7851-4a4b-9ec3-d00e4b010a4f")
            },
            new() 
            {
                Id = Guid.Parse("a67fca84-da24-4faf-bfc3-84b97d3951d2"), 
                ProductionId = Guid.Parse("b9e4cf53-6075-4270-a2d5-8451c3f708d4"), 
                Roles = new List<Role>() {Role.Director, Role.Writer, Role.Actor}, 
                UserProfileId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e")
            },
            new()
            {
                Id = Guid.Parse("294031fb-226b-491b-bf61-8ea2f6171b1e"), 
                ProductionId = Guid.Parse("020f13be-c902-4a27-a6c6-b3dea5fa880c"), 
                Roles = new List<Role>() {Role.Director, Role.Writer}, 
                UserProfileId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            },
            new()
            {
                Id = Guid.Parse("3c9f79c6-909b-4acd-8ff9-b000d87c46a8"),
                ProductionId = Guid.Parse("6763e702-f5ff-454b-89e8-bcf03582ccc5"),
                Roles = new List<Role>() {Role.Director, Role.Writer},
                UserProfileId = Guid.Parse("8b903d43-d840-40d5-a8e0-2b5d541ed15d")
            },
            new()
            {
                Id = Guid.Parse("c6cd2229-9ad9-414d-aa97-a8cd84a13639"),
                ProductionId = Guid.Parse("6763e702-f5ff-454b-89e8-bcf03582ccc5"),
                Roles = new List<Role>() {Role.Sound},
                UserProfileId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            },
            new()
            {
                Id = Guid.Parse("f160a428-6820-49c6-bbba-ac5b7197d28e"),
                ProductionId = Guid.Parse("6763e702-f5ff-454b-89e8-bcf03582ccc5"),
                Roles = new List<Role>() {Role.Sound},
                UserProfileId = Guid.Parse("c58a7b97-9d50-461a-8ccc-95a088ea8ff3")
            },
            new()
            {
                Id = Guid.Parse("5f1fa147-8f56-46d4-bdba-bb03abe14b2a"),
                ProductionId = Guid.Parse("1226e4a2-a488-4274-bc59-30c830af5272"),
                Roles = new List<Role>() {Role.Director, Role.DirectorOfPhotography, Role.Actor, Role.Editor},
                UserProfileId = Guid.Parse("b741081a-7b4e-4bad-9e45-181fcc188e5e")
            },
            new()
            {
                Id = Guid.Parse("47ebb467-e1e4-425f-ad5b-55800220d308"),
                ProductionId = Guid.Parse("1226e4a2-a488-4274-bc59-30c830af5272"),
                Roles = new List<Role>() {Role.Director, Role.Writer, Role.Actor},
                UserProfileId = Guid.Parse("37f8540b-cc7c-4c7d-bf39-9c479cfa23b4")
            },
            new()
            {
                Id = Guid.Parse("2af6ecc6-c844-4934-8e5b-f458bdb6cd58"),
                ProductionId = Guid.Parse("1226e4a2-a488-4274-bc59-30c830af5272"),
                Roles = new List<Role>() {Role.Actor, Role.MusicEditor},
                UserProfileId = Guid.Parse("ee177a02-2229-40b2-b8f0-0ee2c1a96a75")
            },
            new()
            {
                Id = Guid.Parse("e5f1dd02-0591-4bc9-b82b-136c57105bfc"),
                ProductionId = Guid.Parse("1226e4a2-a488-4274-bc59-30c830af5272"),
                Roles = new List<Role>() {Role.Sound, Role.Composer},
                UserProfileId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            }
        });

        modelBuilder.Entity<Location>().HasData(new Location[]
        {
            new()
            {
                Id = Guid.Parse("951fb305-a33d-4c35-81e5-bd9b96a64907"), 
                ProductionId = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"), 
                Name = "Int. Travis Apartment", 
                Description = "1st AirBnb", 
                Address = "2334 Ashley Road, Charlotte, NC 28208"
            },
            new()
            {
                Id = Guid.Parse("452bf302-8a06-429a-ac49-e519e04330b7"), 
                ProductionId = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"), 
                Name = "Ext. Jewelry Store", 
                Description = "Morrison Smith Fine & Custom Jewelers", 
                Address = "705 Providence Rd, Charlotte, NC 28207"
            },
            new()
            {
                Id = Guid.Parse("164f1b74-68af-4578-9530-9d7532f4b8ec"), 
                ProductionId = Guid.Parse("b9e4cf53-6075-4270-a2d5-8451c3f708d4"), 
                Name = "Ext. Apartment", 
                Description = "Xanadu Condominium", 
                Address = "750 N Atlantic Ave, Cocoa Beach, FL 32931"
            }
        });

        modelBuilder.Entity<Models.Task>().HasData(new Models.Task[]
        {
            new()
            {
                Id = Guid.Parse("fe55ea20-4cae-463a-9aa3-eb5b5106ddff"), 
                ProductionId = Guid.Parse("507aa23a-bbb3-4fe1-bc76-1fb3437b5be3"), 
                Title = "SFX", 
                Description = "Finish post sound sfx placement", 
                TaskStatus = Models.TaskStatus.InProgress, 
                AssignedCrewId = Guid.Parse("294031fb-226b-491b-bf61-8ea2f6171b1e")
            },
            new()
            {
                Id = Guid.Parse("f8246c24-7bbb-4a35-af08-64187bd9a7a4"), 
                ProductionId = Guid.Parse("b9e4cf53-6075-4270-a2d5-8451c3f708d4"), 
                Title = "Raise Funding",
                Description = "Acquire funding through Kickstarter", 
                TaskStatus = Models.TaskStatus.InProgress, 
                AssignedCrewId = Guid.Parse("a67fca84-da24-4faf-bfc3-84b97d3951d2")
            },
            new()
            {
                Id = Guid.Parse("ee640c55-80fd-442f-aceb-8e27923d9f6a"), 
                ProductionId = Guid.Parse("020f13be-c902-4a27-a6c6-b3dea5fa880c"), 
                Title = "Finish Script v1", 
                Description = "Finish the first draft of script", 
                TaskStatus = Models.TaskStatus.InProgress, 
                AssignedCrewId = Guid.Parse("294031fb-226b-491b-bf61-8ea2f6171b1e")
            },
            new()
            {
                Id = Guid.Parse("d6cf8aea-b14d-4e83-85d0-e4c1a73ec140"),
                ProductionId = Guid.Parse("6763e702-f5ff-454b-89e8-bcf03582ccc5"),
                Title = "Record ADR",
                Description = "Record ADR for multiple scenes",
                TaskStatus = Models.TaskStatus.Completed,
                AssignedCrewId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            },
            new()
            {
                Id = Guid.Parse("123de2f6-9e61-47a7-92e5-93d3a2d294bb"),
                ProductionId = Guid.Parse("6763e702-f5ff-454b-89e8-bcf03582ccc5"),
                Title = "SFX Sound Design",
                Description = "Record and place sfx",
                TaskStatus = Models.TaskStatus.Completed,
                AssignedCrewId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            },
            new()
            {
                Id = Guid.Parse("4bce7d3f-9284-4f8b-8144-019c8a0abe97"),
                ProductionId = Guid.Parse("1226e4a2-a488-4274-bc59-30c830af5272"),
                Title = "Compose",
                Description = "Finish composing music",
                TaskStatus = Models.TaskStatus.Completed,
                AssignedCrewId = Guid.Parse("7b0d2f3f-b66e-4115-9ee6-a5d79408f161")
            }
        });
    }
}