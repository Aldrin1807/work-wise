namespace DataAccessLayer.Models
{
    public class UserExperience
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string UserId { get; set; }
        public string CompanyName { get; set;}
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }

    }
}
