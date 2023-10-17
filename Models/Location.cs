using System.ComponentModel.DataAnnotations;

namespace Indielot.Models
{
    public class Location
    {
        public int Id { get; set; }

        public int ProductionId { get; set; }
        
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string Address { get; set; }

        public List<string> Photos { get; set; }

        public Production Production { get; set; }
    }
}