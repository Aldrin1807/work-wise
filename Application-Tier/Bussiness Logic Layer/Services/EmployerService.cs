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
    }
    public class EmployerService:IEmployerService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        public EmployerService(UserManager<User> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<EmployerDTO> GetEmployer(string id)
        {
            if (id == null)
            {
                throw new Exception("Id is empty");
            }

            var user = await GetUserById(id);
            var claims = await _userManager.GetClaimsAsync(user);

            var _employer = new EmployerDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                CompanyName = user.UserName,
                Founded = GetEmployerClaimValue(claims, CompanyClaimTypes.Founded),
                Founder = GetEmployerClaimValue(claims, CompanyClaimTypes.Founder),
                Description = GetEmployerClaimValue(claims, CompanyClaimTypes.Description),
                Location = user.Location,
                NoEmployees = GetEmployerClaimValue(claims,CompanyClaimTypes.NoEmployees),
                PhoneNumber = user.PhoneNumber,
                Photo = GetEmployerClaimValue(claims, CompanyClaimTypes.Photo),
                Website = GetEmployerClaimValue(claims, CompanyClaimTypes.Website)
            };

            var _jobs = await _context.Jobs.Where(j => j.CompanyId == id).ToListAsync();
            if (_jobs != null)
            {
                _employer.Jobs = _jobs;
            }

            return _employer;
        }

        private string GetEmployerClaimValue(IEnumerable<Claim> claims, string claimType)
        {
            var claim = claims.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value ?? string.Empty;
        }


        private async Task<User> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new Exception("User does not exist");
            }

            return user;
        }
    }
}
