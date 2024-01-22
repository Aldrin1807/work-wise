using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Bussiness_Logic_Layer.Services
{
    public interface IJobsService
    {
        Task<Job> GetJob(string id);
        Task PostJob(JobDTO request);
        Task<List<Job>> GetEmployersJobs(string id);
        Task<List<Job>> GetPopularJobs();
    }
    public class JobsService:IJobsService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly IIdentityService _identity;
        public JobsService(UserManager<User> userManager, AppDbContext context, IIdentityService identity)
        {
            _userManager = userManager;
            _context = context;
            _identity = identity;
        }

        
        #region GET
        public async Task<Job> GetJob(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new Exception("Id is null");
            }
            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id== id);
            if(job == null)
            {
                throw new Exception("Couldnt find job!");
            }
             
            return job;
        }
        public async Task<List<Job>> GetEmployersJobs(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new Exception("Id is null");
            }
            var jobs = await _context.Jobs.Where(j => j.CompanyId == id).ToListAsync();

            foreach (var job in jobs)
            {
                var user = await _identity.GetUserById(job.CompanyId);
                job.CompanyName = user.UserName;
                job.CompanyLocation = user.Location;
                job.CompanyPhoto = await _identity.GetUserPhoto(user);
            }

            return jobs;
        }

        public async Task<List<Job>> GetPopularJobs()
        {
            var jobs = await _context.Jobs.ToListAsync();

            foreach(var job in jobs)
            {
                var user = await _identity.GetUserById(job.CompanyId);
                job.CompanyName = user.UserName;
                job.CompanyLocation = user.Location;
                job.CompanyPhoto = await _identity.GetUserPhoto(user);
            }

            return jobs;
        }
        #endregion

        #region POST
        public async Task PostJob(JobDTO request)
        {
            if (request == null)
            {
                throw new Exception("Request is empty");
            }
            var _job = new Job
            {
                JobTitle = request.JobTitle,
                JobDescription = request.JobDescription,
                Category = request.Category,
                CompanyId = request.CompanyId,
                DateTime = DateTime.UtcNow.ToShortDateString(),
                Experience = request.Experience,
                Skills = request.Skills,
                Salary = request.Salary,
                Type = request.Type,
                Location = request.Location,
                Qualification = request.Qualification,
                Spots = request.Spots
            };

            await _context.Jobs.AddAsync(_job);
            await _context.SaveChangesAsync();
        }
        #endregion
    }
}
