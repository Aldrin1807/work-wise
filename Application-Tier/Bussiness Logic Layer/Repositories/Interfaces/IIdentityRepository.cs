using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.Repositories.Interfaces
{
    public interface IIdentityRepository
    {
        Task<User> GetUserById(string id);
        Task<User> GetEmployerById(string id);
    }
}
