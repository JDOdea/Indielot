using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Note
    {
        public int Id { get; set; }

        public int ProductionId { get; set; }

        public Guid AuthorId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreationDate { get; set; }

        [ForeignKey("AuthorId")]
        public UserProfile AuthorProfile { get; set; }
    }
}