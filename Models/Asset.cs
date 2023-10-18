namespace Indielot.Models
{
    public class Asset
    {
        public Guid Id { get; set; }

        public Guid ProductionId { get; set; }

        public string Title { get; set; }

        public string AssetType { get; set; }

        public DateTime UploadDate { get; set; }

        public string FileLocation { get; set; }

        public Production Production { get; set; }

        // TODO: Type enum and file type property
    }
}