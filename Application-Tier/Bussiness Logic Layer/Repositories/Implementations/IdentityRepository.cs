using Bussiness_Logic_Layer.Repositories.Interfaces;
using Bussiness_Logic_Layer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;

namespace Bussiness_Logic_Layer.Repositories.Implementations
{
    public class IdentityRepository: IIdentityRepository
    {
        private readonly UserManager<User> _userManager;
        public IdentityRepository(UserManager<User> userManager, AppDbContext context)
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
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                throw new Exception("Employer does not exist");
            }

            return user;
        }
    }
}
