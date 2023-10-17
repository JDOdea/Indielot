namespace Indielot.Models.DTOs
{
    public class CrewDTO
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public string ProfilePicturePath { get; set; }

        public string ProductionTitle { get; set; }
        
        public List<string> Roles { get; set; }
    }
}