using static DataAccessLayer.Constants.Enumerations;

namespace DataAccessLayer.Models
{
    public class Notification
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Message { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; } 
        public User User { get; set; }
        public DateTime DateTimeCreated { get; set; }

    }
}
