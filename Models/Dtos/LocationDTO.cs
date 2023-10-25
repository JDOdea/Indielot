namespace Indielot.Models.DTOs
{
    public class LocationDTO
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        
        public string Description { get; set; }

        public string Address { get; set; }

        public List<string> Photos { get; set; }
    }
}