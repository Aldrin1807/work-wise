using DataAccessLayer.Constants;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Bussiness_Logic_Layer.Services
{
    public interface IIdentityService
    {
        Task<User> GetUserById(string id);
        Task<User> GetEmployerById(string id);

    }
    public class IdentityService:IIdentityService
    {
        private readonly UserManager<User> _userManager;
        public IdentityService(UserManager<User> userManager, AppDbContext context)
        {
            _userManager = userManager;
        }

        public async Task<User> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new Exception("User does not exist");
            }

            return user;
        }
        public async Task<User> GetEmployerById(string id)
        {
            var users = await _userManager.GetUsersInRoleAsync("Employer");
            var user = users.FirstOrDefault(u=>u.Id == id);
            if (user == null)
            {
                throw new Exception("Employer does not exist");
            }

            return user;
        }

        
    }
}
