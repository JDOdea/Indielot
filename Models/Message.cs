using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Message
    {
        public Guid Id { get; set; }

        public Guid SenderId { get; set; }

        public Guid ConversationId { get; set; }

        public string Content { get; set; }

        public DateTime Timestamp { get; set; }

        [ForeignKey("SenderId")]
        public UserProfile Sender { get; set; }

        public Conversation Conversation { get; set; }
    }
}