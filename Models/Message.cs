namespace Indielot.Models
{
    public class Message
    {
        public Guid Id { get; set; }

        public Guid SenderUserId { get; set; }

        public Guid ReceiverUserId { get; set; }

        public string Content { get; set; }

        public DateTime Timestamp { get; set; }
    }
}