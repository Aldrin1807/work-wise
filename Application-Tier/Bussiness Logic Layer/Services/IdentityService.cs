using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Bussiness_Logic_Layer.Services
{
    public interface IIdentityService
    {
        Task<User> GetUserById(string id);
        string GetUserClaimValue(IEnumerable<Claim> claims, string claimType);
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

        public string GetUserClaimValue(IEnumerable<Claim> claims, string claimType)
        {
            var claim = claims.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value ?? string.Empty;
        }
    }
}
