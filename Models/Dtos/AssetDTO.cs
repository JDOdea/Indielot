namespace Indielot.Models.DTOs
{
    public class AssetDTO
    {
        public Guid Id { get; set; }
        
        public string AssetName { get; set; }

        public string FileLocation { get; set; }

        public string AssetType { get; set; }

        public string UploadedBy { get; set; }

        public string ProductionTitle { get; set; }

        public DateTime UploadDate { get; set; }
    }
}