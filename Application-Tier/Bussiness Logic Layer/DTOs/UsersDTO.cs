using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.DTOs
{
    public class UsersDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string Photo { get; set; }
        public string Location { get; set; }
        public string Position { get; set; }
        public string DateOfBirth { get; set; }
        public string Introduction { get; set; }
        public string Skills { get; set; }
        public List<UserExperience> Experiences { get; set; }
    }
}
