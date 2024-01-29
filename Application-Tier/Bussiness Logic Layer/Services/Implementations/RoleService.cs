using Bussiness_Logic_Layer.Services.Interfaces;
using DataAccessLayer.Constants;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Bussiness_Logic_Layer.Services.Implementations
{
    public class RoleService:IRoleService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RoleService(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task AddRole(string roleName, string description)
        {
            var role = new ApplicationRole { Name = roleName };
            var result = await _roleManager.CreateAsync(role);

            if (result.Succeeded)
            {
                await _roleManager.AddClaimAsync(role, new Claim(RoleClaimTypes.Description, description));
            }
            else
            {
                throw new ApplicationException($"Error creating role: {result.Errors.First().Description}");
            }
        }

        public async Task DeleteRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);

            if (role != null)
            {
                var result = await _roleManager.DeleteAsync(role);

                if (!result.Succeeded)
                {
                    throw new ApplicationException($"Error deleting role: {result.Errors.First().Description}");
                }
            }
            else
            {
                throw new ApplicationException($"Role '{roleName}' not found.");
            }
        }

        public async Task<ApplicationRole> GetRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role != null)
            {
                var applicationRole = new ApplicationRole { Id = role.Id,Name = roleName, NormalizedName = role.NormalizedName,ConcurrencyStamp = role.ConcurrencyStamp};
                var descriptionClaim = _roleManager.GetClaimsAsync(role).Result.FirstOrDefault(c=>c.Type == RoleClaimTypes.Description)?.Value;

                if (descriptionClaim != null)
                {
                    applicationRole.Description = descriptionClaim;
                }

                return applicationRole;
            }
            else
            {
                throw new ApplicationException($"Role '{roleName}' not found.");
            }
        }

        public async Task UpdateRole(string roleName, string description)
        {
            var role = await _roleManager.FindByNameAsync(roleName);

            if (role != null)
            {
                var descriptionClaim = _roleManager.GetClaimsAsync(role).Result.FirstOrDefault(c => c.Type == RoleClaimTypes.Description);

                if (descriptionClaim != null)
                {
                    await _roleManager.RemoveClaimAsync(role, descriptionClaim);
                }

                await _roleManager.AddClaimAsync(role, new Claim(RoleClaimTypes.Description, description));
            }
            else
            {
                throw new ApplicationException($"Role '{roleName}' not found.");
            }
        }

    }
}
