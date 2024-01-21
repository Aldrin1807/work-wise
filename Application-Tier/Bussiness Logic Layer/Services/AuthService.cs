using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Constants;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Bussiness_Logic_Layer.Services
{
    public interface IAuthService
    {
        Task<string> Login(LoginDTO request);
        Task Register(RegisterUserDTO request);
        Task Register(RegisterCompanyDTO request);
        string GenerateToken(User user, IList<string> roles);
    }
    public class AuthService:IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<User> userManager,IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        public async Task<string> Login(LoginDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                throw new Exception("Email does not exist");
            }

            if (user != null && await _userManager.CheckPasswordAsync(user, request.Password))
            {
                var roles = await _userManager.GetRolesAsync(user);
                var token = GenerateToken(user, roles);

                return token;
            }
            else
            {
                throw new Exception("Invalid password");
            }

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
            await _userManager.AddClaimAsync(_user, new Claim(CompanyClaimTypes.Description, request.Description));


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
                Location = request.Location,
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
            await _userManager.AddClaimAsync(_user, new Claim(UserClaimTypes.DateOfBirth, request.DateOfBirth));

        }
        public string GenerateToken(User user, IList<string> roles)
        {

            var claims = new[]
            {
                new Claim("Id", user.Id),
                new Claim("Email", user.Email),
                new Claim("Role", roles[0])
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(24), 
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
