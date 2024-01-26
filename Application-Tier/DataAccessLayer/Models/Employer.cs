using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class Employer
    {
        [Key]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        // Additional properties for Employer
        public string Photo { get; set; }
        public string Founded { get; set; }
        public string Founder { get; set; }
        public string NoEmployees { get; set; }
        public string Website { get; set; }
        public string Description { get; set; }
        public List<Job> JobsPosted { get; set; }
    }
}
