using System.ComponentModel.DataAnnotations;

namespace Indielot.Models
{
    public class CalendarEvent
    {
        public int Id { get; set; }
        
        public int ProductionId { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public int LocationId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Production Production { get; set; }

        public Location Location { get; set; }
    }
}