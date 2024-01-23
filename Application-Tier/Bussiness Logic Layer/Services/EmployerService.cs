using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Constants;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Bussiness_Logic_Layer.Services
{
    public interface IEmployerService
    {
        Task<EmployerDTO> GetEmployer(string id);
        Task<List<EmployerDTO>> GetEmployers();
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

        #region GET
        public async Task<EmployerDTO> GetEmployer(string id)
        {
            if (id == null)
            {
                throw new Exception("Id is empty");
            }

            var user = await _identity.GetEmployerById(id);
            
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

        public async Task<List<EmployerDTO>> GetEmployers()
        {
            var employers = await _userManager.GetUsersInRoleAsync("Employer");

            List<EmployerDTO> employersList = new List<EmployerDTO>();

            foreach(var user in employers)
            {
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
                    NoEmployees = _identity.GetUserClaimValue(claims, CompanyClaimTypes.NoEmployees),
                    PhoneNumber = user.PhoneNumber,
                    Photo = _identity.GetUserClaimValue(claims, CompanyClaimTypes.Photo),
                    Website = _identity.GetUserClaimValue(claims, CompanyClaimTypes.Website)
                };
                var _jobs = await _context.Jobs.Where(j => j.CompanyId == user.Id).ToListAsync();
                if (_jobs != null)
                {
                    _employer.Jobs = _jobs;
                }
                employersList.Add(_employer);
            }

            return employersList;

        }

        #endregion

        
    }
}
