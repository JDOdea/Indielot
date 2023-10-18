using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Production
    {
        public Guid Id { get; set; }

        public string Title { get; set; }
        
        public string Description { get; set; } = "No description provided...";

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string PicturePath { get; set; }

        public DateTime CreationDate { get; set; }

        public Guid ProductionLeadId { get; set; }

        [ForeignKey("ProductionLeadId")]
        public UserProfile ProductionLead { get; set; }

        public float? Budget { get; set; }

        public bool Completed { get; set; } = false;

        public DateTime? DateCompleted { get; set; }

        public List<Crew> Crew { get; set; }
    }
}