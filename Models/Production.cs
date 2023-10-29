using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Production
    {
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }
        
        public string Description { get; set; } = "No description provided...";

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string PicturePath { get; set; }

        public DateTime CreationDate { get; set; }

        public Guid ProductionLeadId { get; set; }

        [ForeignKey("ProductionLeadId")]
        public UserProfile ProductionLead { get; set; }

        public float? Budget { get; set; }

        public bool Completed { get; set; } = false;

        public DateTime? DateCompleted { get; set; }

        public List<Crew> Crew { get; set; }

        public List<Activity> Activities { get; set; }

        public List<Genre> Genres { get; set; }

        public List<string> GetGenreNames(List<Genre> genres)
        {
            return genres.Select(g => Enum.GetName(typeof(Genre), g)).ToList();
        }
    }

    public enum Genre 
    {
        Anthology,

        ArtFilm,

        Crime,

        Detective,

        FilmNoir,

        NeoNoir,

        Gangster,

        Mafia,

        Heist,

        Mystery,

        Experimental,

        Absurdist,

        Surrealist,

        Exploitation,

        Gothic,

        Fantasy,

        Historical,

        Musical,

        Police,

        Romance,

        Paranormal,

        Period,
        
        Political,

        Psychological,

        Cyberpunk,

        Action,

        Superhero,

        Disaster,

        Spy,

        Adventure,

        Pirate,

        Animated,

        StopMotion,

        Puppet,

        Comedy,
        
        Mockumentary,

        Parody,

        Spoof,

        Satire,

        Silent,

        Sitcom,

        Sketch,

        Slapstick,

        Religious,

        Drama,

        Docudrama,

        Legal,
        
        Medical,

        Military,

        War,

        Teen,

        ComingOfAge,

        Biopic,

        Epic,

        Fiction,

        Horror,

        FoundFootage,

        Ghost,

        Monster,

        Vampire,

        Werewolf,

        Zombie,

        Folk,

        Slasher,

        Splatter,

        Art,

        BodyHorror,

        Cannibal,

        Environmental,

        Holiday,

        Lovecraftian,

        SciFi,

        ScienceFiction,

        Dystopian,

        PostApocalyptic,

        SpaceOpera,

        Western,

        Steampunk,

        Revenge,

        SpaghettiWestern,

        Amateur,

        Documentary,

        Educational,

        Instructional,

        Reality,

        Court,

        TalkShow,

        Variety,

        Concert,

        Sports
    }
}