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
using static DataAccessLayer.Constants.Enumerations;

namespace Bussiness_Logic_Layer.Services
{
    public interface IAuthService
    {
        Task<string> Login(LoginDTO request);
        Task Register(RegisterCandidateDTO request);
        Task Register(RegisterCompanyDTO request);
        string GenerateToken(User user, IList<string> roles);
    }
    public class AuthService:IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly INotificationsService _notifications;
        private readonly AppDbContext _context;

        public AuthService(UserManager<User> userManager,IConfiguration configuration,INotificationsService notifications,AppDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _notifications = notifications;
            _context = context;
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

            var employer = new Employer
            {
                UserId = _user.Id,
                Founded = request.Founded,
                Founder = request.Founder,
                Photo = Convert.ToBase64String(photoBytes),
                Description = request.Description,
                NoEmployees = request.NoEmployees,
                Website = request.Website
            };
            await _context.Employers.AddAsync(employer);
            

            var notification = new Notification
            {
                UserId = _user.Id,
                Message = "Account created succesfully, Enjoy!",
                Status = Enum.GetName(NotificationStatus.Unread),
                Type = Enum.GetName(NotificationType.Success),
                DateTimeCreated = DateTime.UtcNow
            };
            await _notifications.AddNotification(notification);
        }

        public async Task Register(RegisterCandidateDTO request)
        {
            if (request == null)
            {
                throw new Exception("User is not provided");
            }
            var users = await _userManager.FindByEmailAsync(request.Email);
            if (users != null)
            {
                throw new Exception("This email already exists");
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
            await _userManager.AddToRoleAsync(_user, "Candidate");

            byte[] photoBytes;
            using (var memoryStream = new MemoryStream())
            {
                await request.Photo.CopyToAsync(memoryStream);
                photoBytes = memoryStream.ToArray();
            }

            var candidate = new Candidate
            {
                UserId = _user.Id,
                Photo = Convert.ToBase64String(photoBytes),
                Gender = request.Gender,
                Position = request.Position,
                DateOfBirth = request.DateOfBirth
            };

            await _context.Candidates.AddAsync(candidate);

            var notification = new Notification
            {
                UserId = _user.Id,
                Message = "Account created succesfully, Enjoy!",
                Status = Enum.GetName(NotificationStatus.Unread),
                Type = Enum.GetName(NotificationType.Success),
                DateTimeCreated = DateTime.UtcNow
            };
            await _notifications.AddNotification(notification);

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
