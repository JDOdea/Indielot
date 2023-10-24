using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Indielot.Models
{
    public class Asset
    {
        public Guid Id { get; set; }

        public Guid ProductionId { get; set; }

        public Guid UploaderId { get; set; }

        public string AssetName { get; set; }

        public string FileName { get; set; }

        public DateTime UploadDate { get; set; }

        public string FileLocation { get; set; }

        public Production Production { get; set; }

        [ForeignKey("UploaderId")]
        public UserProfile Uploader { get; set; }

        public AssetType AssetType { get; set; }

        [NotMapped]
        public string AssetTypeName { get; set; }

        public string GetAssetTypeName(AssetType assetType)
        {
            return Enum.GetName(typeof(AssetType), assetType);
        }

        // TODO: Finish enum
    }

    public enum AssetType
    {
        [Display(Name = "Call Sheet")]
        CallSheet
    }
}