using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Constants;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Bussiness_Logic_Layer.Services
{
    public interface IUsersService
    {
        Task<UsersDTO> GetUser(string id);
    }
    public class UsersService : IUsersService
    {
        private readonly UserManager<User> _userManager;
        public UsersService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<UsersDTO> GetUser(string id)
        {
            if (id == null)
            {
                throw new Exception("Id is empty");
            }

            var user = await GetUserById(id);
            var userClaims = await _userManager.GetClaimsAsync(user);

            var _user = new UsersDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Gender = GetUserClaimValue(userClaims, UserClaimTypes.Gender),
                Photo = GetUserClaimValue(userClaims, UserClaimTypes.Photo),
                Location = user.Location,
                Position = GetUserClaimValue(userClaims, UserClaimTypes.Position)
            };

            return _user;
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

        private string GetUserClaimValue(IEnumerable<Claim> claims, string claimType)
        {
            var claim = claims.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value ?? string.Empty;
        }
    
    }
}
