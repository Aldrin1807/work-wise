namespace Bussiness_Logic_Layer.DTOs
{
    public class RegisterCandidateDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Position { get; set; }
        public string Gender { get; set; }
        public IFormFile Photo { get; set; }
        public string Location { get; set; }
        public string DateOfBirth { get; set; }
    }
    public class RegisterCompanyDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string Founded { get; set; }
        public string Founder { get; set; }
        public string NoEmployees { get; set; }
        public string Website { get; set; }
        public IFormFile Photo { get; set; }
        public string Location { get; set; }
    }
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
