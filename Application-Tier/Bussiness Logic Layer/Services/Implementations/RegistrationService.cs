using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Repositories.Interfaces;
using Bussiness_Logic_Layer.Services.Interfaces;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static DataAccessLayer.Constants.Enumerations;

namespace Bussiness_Logic_Layer.Services.Implementations
{
    public class RegistrationService:IRegistrationService
    {

        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly INotificationRepository _notificationRepository;

        public RegistrationService(UserManager<User> userManager, AppDbContext context,INotificationRepository notificationRepository)
        {
            _userManager = userManager;
            _context = context;
            _notificationRepository = notificationRepository;
        }

        public async Task Register(RegisterCompanyDTO request)
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
            await _notificationRepository.AddNotification(notification);
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
            await _notificationRepository.AddNotification(notification);

        }
    }
}
