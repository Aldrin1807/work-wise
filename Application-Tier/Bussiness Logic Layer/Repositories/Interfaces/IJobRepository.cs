using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.Repositories.Interfaces
{
    public interface IJobRepository
    {
        Task<Job> GetJob(string id);
        Task PostJob(JobDTO request);
        Task<List<Job>> GetEmployersJobs(string id);
        Task<List<Job>> GetJobs();
        Task<List<Job>> GetFilteredJobs(string keyword, string location, string type);
        Task DeleteJob(string id);

    }
}
