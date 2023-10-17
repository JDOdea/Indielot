namespace Indielot.Models.DTOs
{
    public class ProductionDTO
    {
        public int Id { get; set; }
        
        public string Title { get; set; }

        public string Description { get; set; }

        public string ProductionLead { get; set; }

        public bool Completed { get; set; }

        public List<CrewDTO> Crew { get; set; }
    }
}