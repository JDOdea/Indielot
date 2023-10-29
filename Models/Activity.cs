using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Activity
    {
        public Guid Id { get; set; }

        public Guid ProductionId { get; set; }

        public Guid UpdaterId { get; set; }

        public DateTime ActivityDate { get; set; }

        public string Description { get; set; }

        public Production Production { get; set; }

        [ForeignKey("UpdaterId")]
        public UserProfile UpdatedBy { get; set; }

        public ActivityType ActivityType { get; set; }

        [NotMapped]
        public string ActivityTypeName { get; set; }

        public string GetActivityTypeName(ActivityType activityType)
        {
            return Enum.GetName(typeof(ActivityType), activityType);
        }
    }

    public enum ActivityType
    {
        Created,
        Added,
        Uploaded,
        Edited,
        Deleted,
        Finished,
        Wrapped
    }
}