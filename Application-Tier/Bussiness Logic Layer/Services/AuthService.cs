using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;

namespace Bussiness_Logic_Layer.Services
{
    public interface IAuthService
    {
        Task<string> Login(LoginDTO request);
        Task<string> Register(RegisterUserDTO request);
        Task<string> Register(RegisterCompanyDTO request);
        Task<string> GenerateToken(User user);
    }
    public class AuthService:IAuthService
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        public AuthService(AppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public Task<string> Login(LoginDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<string> Register(RegisterCompanyDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<string> Register(RegisterUserDTO request)
        {
            throw new NotImplementedException();
        }
        public Task<string> GenerateToken(User user)
        {
            throw new NotImplementedException();
        }
    }
}
