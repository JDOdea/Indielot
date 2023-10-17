using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Task
    {
        public int Id { get; set; }

        public int ProductionId { get; set; }
        
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public Guid? AssignedUserId { get; set; }

        public DateTime AssignedOn { get; set; }

        public DateTime? DueDate { get; set; }

        public Production Production { get; set; }

        [ForeignKey("AssignedUserId")]
        public UserProfile AssignedUser { get; set; }

        public TaskStatus Status { get; set; }

    }
    public enum TaskStatus
    {
        ToDo,
        InProgress,
        OnHold,
        Completed
    }
}