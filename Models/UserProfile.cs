using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Indielot.Models
{
    public class UserProfile
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        public string Address { get; set; }

        public DateTime CreateDateTime { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ProfilePicturePath { get; set; }

        public string Bio { get; set; } = "No bio provided...";

        public bool IsActive { get; set; }

        [NotMapped]
        public string Email { get; set; }

        [NotMapped]
        public string UserName { get; set; }

        [NotMapped]
        public List<string> Roles { get; set; }

        public string IdentityUserId { get; set; }

        public IdentityUser IdentityUser { get; set; }

        public List<Conversation> Conversations { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}

