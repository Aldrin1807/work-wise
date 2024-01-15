using System.Text.Json.Serialization;

namespace DataAccessLayer.Models
{
    public class Job
    {
        public string Id { get; set; } = Guid.NewGuid().ToString(); 
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public string Experience { get; set; }
        public string Skills { get; set; } //Skills are gonna be saved by seperating them with comma, for example php,js,html 
        public string Location { get; set; }
        public string Qualification { get; set; }
        public string Industry { get; set; }
        public int Spots { get; set; }
        public string DateTime { get; set; }
        public int CategoryNo { get; set; }
        public string CompanyId { get; set; }
        [JsonIgnore]
        public User Company { get; set; }


        public List<JobApplication> Applications { get; set; }

    }
}
