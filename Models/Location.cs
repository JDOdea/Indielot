using System.ComponentModel.DataAnnotations;

namespace Indielot.Models
{
    public class Location
    {
        public Guid Id { get; set; }

        public Guid ProductionId { get; set; }
        
        [Required]
        public string Name { get; set; }

        public string Description { get; set; } = "No description provided...";

        [Required]
        public string Address { get; set; }

        public List<string> Photos { get; set; }

        public Production Production { get; set; }
    }
}