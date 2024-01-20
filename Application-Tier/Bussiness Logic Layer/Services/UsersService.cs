using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Constants;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Bussiness_Logic_Layer.Services
{
    public interface IUsersService
    {
        Task<UsersDTO> GetUser(string id);
        Task SaveAdditionalData(AdditionalDataDTO request);
    }
    public class UsersService : IUsersService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        public UsersService(UserManager<User> userManager,AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        public async Task<UsersDTO> GetUser(string id)
        {
            if (id == null)
            {
                throw new Exception("Id is empty");
            }

            var user = await GetUserById(id);
            var userClaims = await _userManager.GetClaimsAsync(user);

            var _user = new UsersDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Gender = GetUserClaimValue(userClaims, UserClaimTypes.Gender),
                Photo = GetUserClaimValue(userClaims, UserClaimTypes.Photo),
                Location = user.Location,
                Position = GetUserClaimValue(userClaims, UserClaimTypes.Position),
                DateOfBirth = GetUserClaimValue(userClaims, UserClaimTypes.DateOfBirth),
                Introduction = GetUserClaimValue(userClaims,UserClaimTypes.Introduction),
                Skills = GetUserClaimValue(userClaims,UserClaimTypes.Skills)
            };
            var _experiences = await _context.UserExperiences.Where(u => u.UserId == id).ToListAsync();
            _user.Experiences = _experiences;

            return _user;
        }

        private async Task<User> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new Exception("User does not exist");
            }

            return user;
        }

        private string GetUserClaimValue(IEnumerable<Claim> claims, string claimType)
        {
            var claim = claims.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value ?? string.Empty;
        }
    

        public async Task SaveAdditionalData(AdditionalDataDTO request)
        {
            var user = await GetUserById(request.UserId);
            var userClaims = await _userManager.GetClaimsAsync(user);

            var introClaim = GetUserClaimValue(userClaims, UserClaimTypes.Introduction);
            var skillsClaim = GetUserClaimValue(userClaims, UserClaimTypes.Skills);

            
            if(!string.IsNullOrEmpty(introClaim))
            {
               await _userManager.ReplaceClaimAsync(user, userClaims.FirstOrDefault(c => c.Type == UserClaimTypes.Introduction), new Claim(UserClaimTypes.Introduction, request.Introduction));
            }
            await _userManager.AddClaimAsync(user, new Claim(UserClaimTypes.Introduction, request.Introduction));

            if (request.Skills != null)
            {
                if (!string.IsNullOrEmpty(skillsClaim))
                {
                    await _userManager.ReplaceClaimAsync(user, userClaims.FirstOrDefault(c => c.Type == UserClaimTypes.Skills), new Claim(UserClaimTypes.Skills, request.Skills));
                }
                await _userManager.AddClaimAsync(user, new Claim(UserClaimTypes.Skills, request.Skills));
            }
            if (request.Experiences != null)
            {
                foreach (var experience in request.Experiences)
                {
                    var _experience = await _context.UserExperiences.FirstOrDefaultAsync(e => e.Id == experience.Id);
                    if (_experience != null)
                    {
                        _experience.Position = experience.Position;
                        _experience.CompanyName = experience.CompanyName;
                        _experience.DateFrom = experience.DateFrom;
                        _experience.DateTo = experience.DateTo;
                        _experience.Description = experience.Description;

                        _context.UserExperiences.Update(_experience);
                    }
                    else
                    {
                        var newExperience = new UserExperience
                        {
                            CompanyName = experience.CompanyName,
                            Position = experience.Position,
                            DateFrom = experience.DateFrom,
                            DateTo = experience.DateTo,
                            Description = experience.Description,
                            UserId = experience.UserId
                        };
                       await _context.UserExperiences.AddAsync(newExperience);
                    }

                }
                await _context.SaveChangesAsync();
            }

        }
    }
}
