using Bussiness_Logic_Layer.Repositories.Interfaces;
using Bussiness_Logic_Layer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Bussiness_Logic_Layer.Repositories.Implementations
{
    public class EmployerRepository: IEmployerRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly IIdentityRepository _identity;
        public EmployerRepository(UserManager<User> userManager, AppDbContext context, IIdentityRepository identity)
        {
            _userManager = userManager;
            _context = context;
            _identity = identity;
        }

        #region GET
        public async Task<Employer> GetEmployer(string id)
        {
            if (id == null)
            {
                throw new Exception("Id is empty");
            }

            var user = await _identity.GetEmployerById(id);
            var employer = await _context.Employers.FirstOrDefaultAsync(e => e.UserId == user.Id);

            employer.User = user;

            var _jobs = await _context.Jobs.Where(j => j.CompanyId == id).ToListAsync();
            if (_jobs != null)
            {
                employer.JobsPosted = _jobs;
            }

            return employer;
        }

        public async Task<List<Employer>> GetEmployers()
        {
            var employers = await _userManager.GetUsersInRoleAsync("Employer");

            List<Employer> employersList = new List<Employer>();

            foreach (var user in employers)
            {
                var employer = await _context.Employers.FirstOrDefaultAsync(e => e.UserId == user.Id);

                employer.User = user;

                var _jobs = await _context.Jobs.Where(j => j.CompanyId == user.Id).ToListAsync();
                if (_jobs != null)
                {
                    employer.JobsPosted = _jobs;
                }
                employersList.Add(employer);
            }

            return employersList;

        }

        #endregion

    }
}
