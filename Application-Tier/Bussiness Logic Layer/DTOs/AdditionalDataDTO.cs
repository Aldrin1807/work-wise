using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.DTOs
{
    public class AdditionalDataDTO
    {
        public string UserId { get; set; }
        public string Introduction { get; set; }
        public string? Skills { get; set; }
        public List<UserExperience>? Experiences { get; set; }
    }
}
