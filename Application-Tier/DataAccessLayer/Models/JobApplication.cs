namespace DataAccessLayer.Models
{
    public class JobApplication
    {
        public string Status { get; set; }
        public string DateSubmited { get; set; }
        public string JobId { get; set; }
        public Job Job { get; set; }
        public string CandidateId { get; set; }
        public User User { get; set; }


        //
    }
}
