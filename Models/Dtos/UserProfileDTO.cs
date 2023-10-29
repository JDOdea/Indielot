namespace Indielot.Models.DTOs
{
    public class UserProfileDTO
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string UserName { get; set; }

        public string ProfilePicturePath { get; set; }

        public string Bio { get; set; }
    }
}