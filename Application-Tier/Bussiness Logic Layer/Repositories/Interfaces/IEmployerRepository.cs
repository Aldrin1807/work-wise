using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.Repositories.Interfaces
{
    public interface IEmployerRepository
    {
        Task<Employer> GetEmployer(string id);
        Task<List<Employer>> GetEmployers();
    }
}
