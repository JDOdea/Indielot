namespace Indielot.Models.DTOs
{
    public class TaskDTO
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string AssignedTo { get; set; }

        public DateTime? DueDate { get; set; }

        public string TaskStatus { get; set; }
    }
}