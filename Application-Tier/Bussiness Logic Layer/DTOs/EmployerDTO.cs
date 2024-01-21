using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.DTOs
{
    public class EmployerDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Photo { get; set; }
        public string Location { get; set; }
        public string Founded { get; set; }
        public string Founder { get; set; }
        public string NoEmployees { get; set; }
        public string Website { get; set; }
        public string Description { get; set; }
        public List<Job> Jobs { get; set; }
    }
}
