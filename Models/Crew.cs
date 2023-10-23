using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Xml.Linq;
using Microsoft.OpenApi.Extensions;

namespace Indielot.Models
{
    public class Crew
    {
        public Guid Id { get; set; }
        
        public Guid UserProfileId { get; set; }
        
        public Guid ProductionId { get; set; }
        
        public UserProfile UserProfile { get; set; }

        public Production Production { get; set; }

        public List<Role> Roles { get; set; }

        [NotMapped]
        public List<string> RoleNames { get; set; }

        public List<string> GetRoleNames(List<Role> roles)
        {
            return roles.Select(r => Enum.GetName(typeof(Role), r)).ToList();
        }
        
        // TODO: Finish enum
    }
    
    public enum Role
    {
        [Display(Name = "Director")]
        Director,

        [EnumMember(Value = "Writer")]
        Writer,

        [Display(Name = "Actor")]
        Actor,

        [EnumMember(Value = "Producer")]
        Producer,

        [EnumMember(Value = "Composer")]
        Composer,

        [Display(Name = "Director of Photography")]
        DirectorOfPhotography,

        [EnumMember(Value = "Cinematographer")]
        Cinematographer,

        [EnumMember(Value = "Editor")]
        Editor,

        [EnumMember(Value = "Casting")]
        Casting,

        [EnumMember(Value = "Production Designer")]
        ProductionDesigner,

        [EnumMember(Value = "Art Director")]
        ArtDirector,

        [EnumMember(Value = "Set Director")]
        SetDirector,

        [EnumMember(Value = "Costume Designer")]
        CostumeDesigner,

        [EnumMember(Value = "Makeup")]
        Makeup,

        [EnumMember(Value = "Assistant Director")]
        AssistantDirector,

        [EnumMember(Value = "Art")]
        Art,

        [EnumMember(Value = "Sound")]
        Sound,

        [EnumMember(Value = "Special Effects")]
        SpecialEffects,

        [EnumMember(Value = "Visual Effects")]
        VisualEffects,

        [EnumMember(Value = "Gaffer")]
        Gaffer
    }
}