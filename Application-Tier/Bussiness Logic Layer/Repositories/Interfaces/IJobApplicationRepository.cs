using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.Repositories.Interfaces
{
    public interface IJobApplicationRepository
    {
        Task AddJobApplication(JobApplicationDTO request);
        Task<List<JobApplication>> GetCandidateApplications(string id);
        Task RemoveApplication(string id);
        Task<bool> HasApplied(string userId, string jobId);
        Task<List<JobApplication>> GetJobApplications(string id);
        Task UpdateJobApplication(string id, string status);
    }
}
