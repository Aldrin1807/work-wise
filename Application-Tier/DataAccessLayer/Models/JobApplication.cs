using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Models
{
    public class JobApplication
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Status { get; set; }
        public string DateSubmitted { get; set; }
        public string JobId { get; set; }
        public Job Job { get; set; }
        public string CandidateId { get; set; }
        public Candidate Candidate{ get; set; }


        //
    }
}
