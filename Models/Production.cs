using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Production
    {
        public int Id { get; set; }

        public string Title { get; set; }
        
        public string Description { get; set; }

        public DateTime CreationDate { get; set; }

        public Guid ProductionLeadId { get; set; }

        [ForeignKey("ProductionLeadId")]
        public UserProfile ProductionLead { get; set; }

        public float? Budget { get; set; }

        public bool Completed { get; set; } = false;

        public List<Crew> Crew { get; set; }
    }
}