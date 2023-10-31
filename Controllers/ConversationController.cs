using Indielot.Data;
using Indielot.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConversationController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public ConversationController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Conversations);
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(string id)
    {
        Conversation conversation = _dbContext.Conversations
            .Include(c => c.UserProfiles)
            .Include(c => c.Messages)
            .SingleOrDefault(c => c.Id == Guid.Parse(id));

        if (conversation != null)
        {
            return Ok(conversation);
        }

        return NotFound();
    }

    [HttpGet("user/{userId}")]
    //[Authorize]
    public IActionResult GetByUserId(string userId)
    {
        /* 

        if (userProfile != null)
        {
            Conversation conversation = _dbContext.Conversations
                .Include(c => c.UserProfiles)
                .Include(c => c.Messages)
                .Where(c => c.UserProfileIds.Contains(Guid.Parse(userId)));

            List<UserProfile> userProfiles = new List<UserProfile>();
            
            foreach (Guid id in conversation.UserProfileIds
            {
                UserProfile foundUser = _dbContext.UserProfiles
                    .SingleOrDefault(up => up.Id == id);

                userProfiles.Add(foundUser);
            })

            conversation.UserProfiles = userProfiles; 
            
            return Ok(conversation);
        }
            */
            
            

        return NotFound();
    }

    [HttpPost]
    //[Authorize]
    public IActionResult CreateConversation(Conversation conversation)
    {
        conversation.BeganOn = DateTime.Now;

        _dbContext.Conversations.Add(conversation);
        _dbContext.SaveChanges();

        /* return Created($"/api/conversation/{conversation.Id}", conversation); */
        return Ok(_dbContext.Conversations
            .Include(c => c.UserProfiles)
            .SingleOrDefault(c => c.Id == conversation.Id));
    }
}