using System.ComponentModel.DataAnnotations;

namespace Indielot.Models.DTOs
{
    public class ProductionDTO
    {
        public Guid Id { get; set; }
        
        public string Title { get; set; }

        public string Description { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string PicturePath { get; set; }

        public string ProductionLead { get; set; }

        public bool Completed { get; set; }

        public List<CrewDTO> Crew { get; set; }
    }
}