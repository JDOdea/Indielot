namespace Indielot.Models
{
    public class Conversation
    {
        public Guid Id { get; set; }

        public DateTime BeganOn { get; set; }

        public List<Guid> UserProfileIds { get; set; }

        public List<UserProfile> UserProfiles { get; set; }

        public List<Message> Messages { get; set; }
    }
}