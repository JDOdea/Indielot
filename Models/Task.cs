using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Task
    {
        public Guid Id { get; set; }

        public Guid ProductionId { get; set; }
        
        [Required]
        public string Title { get; set; }

        public string Description { get; set; } = "No description provided";

        public Guid? AssignedCrewId { get; set; }

        public DateTime AssignedOn { get; set; }

        public DateTime? DueDate { get; set; }

        public Production Production { get; set; }

        [ForeignKey("AssignedUserId")]
        public Crew AssignedCrew { get; set; }

        public TaskStatus TaskStatus { get; set; }

        [NotMapped]
        public string TaskStatusName { get; set; }

        public string GetTaskStatusName(TaskStatus taskStatus)
        {
            return Enum.GetName(typeof(TaskStatus), taskStatus);
        }

    }
    public enum TaskStatus
    {
        ToDo,
        InProgress,
        OnHold,
        Completed
    }
}