using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Repositories.Interfaces;
using Bussiness_Logic_Layer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using static DataAccessLayer.Constants.Enumerations;

namespace Bussiness_Logic_Layer.Repositories.Implementations
{
    public class JobApplicationRepository:IJobApplicationRepository
    {
        private readonly AppDbContext _context;
        private readonly IIdentityRepository _identity;
        private readonly INotificationRepository _notifications;
        public JobApplicationRepository(AppDbContext context, IIdentityRepository identity, INotificationRepository notifications)
        {
            _context = context;
            _identity = identity;
            _notifications = notifications;
        }
        public async Task<List<JobApplication>> GetCandidateApplications(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new Exception("Id was empty");

            var applications = await _context.JobApplications.Where(j => j.CandidateId == id).ToListAsync();
            foreach (var application in applications)
            {
                var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == application.JobId);
                var user = await _identity.GetUserById(job.CompanyId);
                var employer = await _context.Employers.FirstOrDefaultAsync(e => e.UserId == user.Id);


                application.Job = job;
                application.Job.CompanyName = user.UserName;
                application.Job.CompanyPhoto = employer.Photo;
            }

            return applications;
        }

        public async Task<bool> HasApplied(string userId, string jobId)
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

            foreach (var application in applications)
            {
                var user = await _identity.GetUserById(application.CandidateId);
                var candidate = await _context.Candidates.FirstOrDefaultAsync(e => e.UserId == user.Id);

                application.Candidate = candidate;
            }
            return applications;
        }



        public async Task AddJobApplication(JobApplicationDTO request)
        {
            if (request == null)
                throw new Exception("Request was empty");

            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == request.JobId);

            if (job == null)
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


        public async Task UpdateJobApplication(string id, string status)
        {
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(status))
                throw new Exception("Request data was empty");

            var application = await _context.JobApplications.FirstOrDefaultAsync(j => j.Id == id);

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
    }
}
