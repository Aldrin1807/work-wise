using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Constants;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static DataAccessLayer.Constants.Enumerations;
using static System.Net.Mime.MediaTypeNames;

namespace Bussiness_Logic_Layer.Services
{
    public interface IJobsService
    {
        Task<Job> GetJob(string id);
        Task PostJob(JobDTO request);
        Task<List<Job>> GetEmployersJobs(string id);
        Task<List<Job>> GetJobs();
        Task<List<Job>> GetFilteredJobs(string keyword,string location,string type);
        Task AddJobApplication(JobApplicationDTO request);
        Task<List<JobApplication>> GetCandidateApplications(string id);
        Task RemoveApplication(string id);
        Task<bool> HasApplied(string userId, string jobId);
        Task DeleteJob(string id);
        Task<List<JobApplication>> GetJobApplications(string id);
        Task UpdateJobApplication(string id, string status);
    }
    public class JobsService:IJobsService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly IIdentityService _identity;
        private readonly INotificationsService _notifications;
        public JobsService(UserManager<User> userManager, AppDbContext context, IIdentityService identity,INotificationsService notifications)
        {
            _userManager = userManager;
            _context = context;
            _identity = identity;
            _notifications = notifications;
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
                job.ApplicationsNo = await _context.JobApplications.Where(j => j.JobId == job.Id).CountAsync();
            }

            return jobs;
        }

        public async Task<List<Job>> GetJobs()
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

        public async Task<List<Job>> GetFilteredJobs(string keyword, string location, string type)
        {
            var jobs = await _context.Jobs.ToListAsync();

            foreach (var job in jobs)
            {
                var user = await _identity.GetUserById(job.CompanyId);
                job.CompanyName = user.UserName;
                job.CompanyLocation = user.Location;
                job.CompanyPhoto = await _identity.GetUserPhoto(user);
            }

            if (!string.IsNullOrEmpty(keyword))
            {
                jobs = jobs.Where(job =>
                job.JobTitle.ToLower().Contains(keyword.ToLower()) ||
                job.JobDescription.ToLower().Contains(keyword.ToLower()) ||
                job.Skills.ToLower().Contains(keyword.ToLower())).ToList();
            }

            if (!string.IsNullOrEmpty(location))
            {
                jobs = jobs.Where(job => job.Location.Contains(location, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            if (!string.IsNullOrEmpty(type))
            {
                jobs = jobs.Where(job => job.Type.Equals(type, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            return jobs;
        }

        public async Task<List<JobApplication>> GetCandidateApplications(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new Exception("Id was empty");
            var applications = await _context.JobApplications.Where(j => j.CandidateId == id).ToListAsync();
            foreach (var application in applications)
            {
                var job = await _context.Jobs.FirstOrDefaultAsync(j=>j.Id == application.JobId);
                var user = await _identity.GetUserById(job.CompanyId);
                var userClaims = await _userManager.GetClaimsAsync(user);

                user.Claims = userClaims
                .Select(claim => new IdentityUserClaim<string>
                {
                    ClaimType = claim.Type,
                    ClaimValue = claim.Value
                })
                .ToList();

                application.Job = job;
                application.Job.CompanyName = user.UserName;
                application.Job.CompanyPhoto = user.Claims.FirstOrDefault(c => c.ClaimType == UserClaimTypes.Photo).ClaimValue;   
            }

            return applications;
        }

        public async Task<bool> HasApplied(string userId,string jobId)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(jobId))
                throw new Exception("Data provided was empty");
            var application = await _context.JobApplications.FirstOrDefaultAsync(j => j.CandidateId == userId && j.JobId == jobId);
            return application != null;
        }
        public async Task<List<JobApplication>> GetJobApplications(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new Exception("Id was empty");
            var applications = await _context.JobApplications.Where(j => j.JobId == id).ToListAsync();
            foreach(var application in applications)
            {
                var user = await _identity.GetUserById(application.CandidateId);
                var userClaims = await _userManager.GetClaimsAsync(user);

                user.Claims = userClaims
                .Select(claim => new IdentityUserClaim<string>
                {
                    ClaimType = claim.Type,
                    ClaimValue = claim.Value
                })
                .ToList();

                application.User = user;
            }
            return applications;
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

        public async Task AddJobApplication(JobApplicationDTO request)
        {
            if (request == null)
                throw new Exception("Request was empty");
            var job = await _context.Jobs.FirstOrDefaultAsync(j=>j.Id == request.JobId);
            if(job == null)
                throw new Exception("Couldnt find job!");

            var application = new JobApplication
            {
                CandidateId = request.CandidateId,
                JobId = request.JobId,
                Status = Enum.GetName(JobApplicationStatus.Submitted),
                DateSubmitted = DateTime.UtcNow.ToShortDateString()
            };

            await _context.JobApplications.AddAsync(application);
            await _context.SaveChangesAsync();

            var notification = new Notification
            {
                UserId = job.CompanyId,
                Message = "An application was submitted!",
                Status = Enum.GetName(NotificationStatus.Unread),
                Type = Enum.GetName(NotificationType.Information),
                DateTimeCreated = DateTime.UtcNow
            };
            await _notifications.AddNotification(notification);
        }

        #endregion

        #region PUT
        public async Task UpdateJobApplication(string id,string status)
        {
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(status))
                throw new Exception("Request data was empty");
            var application = await _context.JobApplications.FirstOrDefaultAsync(j=>j.Id == id);
            if (application == null)
                throw new Exception("Application does not exist");
            application.Status = status;
            _context.Update(application);
            await _context.SaveChangesAsync();

            var notification = new Notification
            {
                UserId = application.CandidateId,
                Message = "The status of your application has changed!",
                Status = Enum.GetName(NotificationStatus.Unread),
                Type = Enum.GetName(NotificationType.Information),
                DateTimeCreated = DateTime.UtcNow
            };
            await _notifications.AddNotification(notification);

        }
        #endregion

        #region DELETE
        public async Task DeleteJob(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new Exception("Id was empty");
            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);
            if (job != null)
            {
                _context.Jobs.Remove(job);
                await _context.SaveChangesAsync();
            }
            else
                throw new Exception("Couldnt find job");
        }
        public async Task RemoveApplication(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new Exception("Id was empty");

            var application = await _context.JobApplications.FirstOrDefaultAsync(j => j.Id == id);
            if (application == null)
            {
                throw new Exception("Couldnt find application");
            }
            _context.JobApplications.Remove(application);
            await _context.SaveChangesAsync();

            var notification = new Notification
            {
                UserId = application.CandidateId,
                Message = "Your application was removed!",
                Status = Enum.GetName(NotificationStatus.Unread),
                Type = Enum.GetName(NotificationType.Error),
                DateTimeCreated = DateTime.UtcNow
            };
            await _notifications.AddNotification(notification);

        }
        #endregion
    }
}
