using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.Services.Interfaces
{
    public interface IRoleService
    {
        Task AddRole(string roleName,string description);
        Task<ApplicationRole> GetRole (string roleName);
        Task UpdateRole(string roleName,string description);
        Task DeleteRole (string roleName);
    }
}
