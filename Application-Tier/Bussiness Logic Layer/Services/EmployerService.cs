﻿using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Constants;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Bussiness_Logic_Layer.Services
{
    public interface IEmployerService
    {
        Task<EmployerDTO> GetEmployer(string id);
        Task PostJob(JobDTO request);
        Task<List<Job>> GetJobs(string id);
    }
    public class EmployerService:IEmployerService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly IIdentityService _identity;
        public EmployerService(UserManager<User> userManager, AppDbContext context,IIdentityService identity)
        {
            _userManager = userManager;
            _context = context;
            _identity = identity;
        }

        #region Employer Data
        public async Task<EmployerDTO> GetEmployer(string id)
        {
            if (id == null)
            {
                throw new Exception("Id is empty");
            }

            var user = await _identity.GetUserById(id);
            var claims = await _userManager.GetClaimsAsync(user);

            var _employer = new EmployerDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                CompanyName = user.UserName,
                Founded = _identity.GetUserClaimValue(claims, CompanyClaimTypes.Founded),
                Founder = _identity.GetUserClaimValue(claims, CompanyClaimTypes.Founder),
                Description = _identity.GetUserClaimValue(claims, CompanyClaimTypes.Description),
                Location = user.Location,
                NoEmployees = _identity.GetUserClaimValue(claims,CompanyClaimTypes.NoEmployees),
                PhoneNumber = user.PhoneNumber,
                Photo = _identity.GetUserClaimValue(claims, CompanyClaimTypes.Photo),
                Website = _identity.GetUserClaimValue(claims, CompanyClaimTypes.Website)
            };

            var _jobs = await _context.Jobs.Where(j => j.CompanyId == id).ToListAsync();
            if (_jobs != null)
            {
                _employer.Jobs = _jobs;
            }

            return _employer;
        }

        #endregion

        #region Job Data
        public async Task PostJob(JobDTO request)
        {
            if(request == null)
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
                Industry = request.Industry,
                Location = request.Location,
                Qualification = request.Qualification,
                Spots = request.Spots
            };
            await _context.Jobs.AddAsync(_job);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Job>> GetJobs(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new Exception("Id is null");
            }
            var jobs = await _context.Jobs.Where(j => j.CompanyId == id).ToListAsync();
            return jobs;
        }
        #endregion
    }
}
