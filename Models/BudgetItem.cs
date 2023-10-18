namespace Indielot.Models
{
    public class BudgetItem
    {
        public Guid Id { get; set; }
        
        public Guid ProductionId { get; set; }

        public string Description { get; set; }

        public decimal Amount { get; set; }

        public string Category { get; set; }

        public Production Production { get; set; }


        // TODO: category enum
    }
}