using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Constants;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using System.Security.Claims;

namespace Bussiness_Logic_Layer.Services
{
    public interface IAuthService
    {
        Task<string> Login(LoginDTO request);
        Task Register(RegisterUserDTO request);
        Task Register(RegisterCompanyDTO request);
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

        public async Task Register(RegisterCompanyDTO request)
        {
            if (request == null)
            {
                throw new Exception("User is not provided");
            }
            var users = await _userManager.FindByEmailAsync(request.Email);
            if(users != null)
            {
                throw new Exception("This email already exists");
            }
            var _user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.CompanyName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Location = request.Location
            };
            var result = await _userManager.CreateAsync(_user, request.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }
            await _userManager.AddToRoleAsync(_user, "Employer");

            byte[] photoBytes;
            using (var memoryStream = new MemoryStream())
            {
                await request.Photo.CopyToAsync(memoryStream);
                photoBytes = memoryStream.ToArray();
            }

            await _userManager.AddClaimAsync(_user, new Claim(CompanyClaimTypes.Photo, Convert.ToBase64String(photoBytes)));
            await _userManager.AddClaimAsync(_user, new Claim(CompanyClaimTypes.Founded, request.Founded));
            await _userManager.AddClaimAsync(_user, new Claim(CompanyClaimTypes.Founder, request.Founder));
            await _userManager.AddClaimAsync(_user, new Claim(CompanyClaimTypes.NoEmployees, request.NoEmployees));
            await _userManager.AddClaimAsync(_user, new Claim(CompanyClaimTypes.Website, request.Website));


        }

        public async Task Register(RegisterUserDTO request)
        {
            if (request == null)
            {
                throw new Exception("User is not provided");
            }
            var _user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.FirstName + request.LastName + Guid.NewGuid().ToString().Substring(0, 5),
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Location = request.Location
            };

            var result = await _userManager.CreateAsync(_user, request.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }
            await _userManager.AddToRoleAsync(_user, "User");

            byte[] photoBytes;
            using (var memoryStream = new MemoryStream())
            {
                await request.Photo.CopyToAsync(memoryStream);
                photoBytes = memoryStream.ToArray();
            }

            await _userManager.AddClaimAsync(_user,new Claim(UserClaimTypes.Photo, Convert.ToBase64String(photoBytes)));
            await _userManager.AddClaimAsync(_user, new Claim(UserClaimTypes.Gender, request.Gender));
            await _userManager.AddClaimAsync(_user, new Claim(UserClaimTypes.Position, request.Position));

        }
        public Task<string> GenerateToken(User user)
        {
            throw new NotImplementedException();
        }
    }
}
