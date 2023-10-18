using System.ComponentModel.DataAnnotations;

namespace Indielot.Models
{
    public class CalendarEvent
    {
        public Guid Id { get; set; }
        
        public Guid ProductionId { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public Guid LocationId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Production Production { get; set; }

        public Location Location { get; set; }
    }
}