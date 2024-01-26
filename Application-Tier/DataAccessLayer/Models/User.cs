using DataAccessLayer.Constants;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Models
{
    public class User:IdentityUser
    {
        public string FirstName {get; set; }
        public string LastName { get; set; }
        public string Location { get; set; }

        // Navigation properties
        public List<Notification> Notifications { get; set; }

        public ICollection<IdentityUserClaim<string>> Claims { get; set; }
        public ICollection<IdentityUserRole<string>> Roles { get; set; }
    }
}
