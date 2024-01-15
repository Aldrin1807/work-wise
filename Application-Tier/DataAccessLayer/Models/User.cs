using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Models
{
    public class User:IdentityUser
    {
        public string FirstName {get; set; }
        public string LastName { get; set; }
        public string Location { get; set; }

        // Navigation properties
        public List<Notification> Notifications { get; set; }
        public List<JobApplication> JobApplications { get; set; }
        public List<Job> JobsPosted { get; set; }// This is if the user is a company


        public ICollection<IdentityUserClaim<string>> Claims { get; set; }
        public ICollection<IdentityUserRole<string>> Roles { get; set; }
    }
}
