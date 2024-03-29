﻿using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Repositories.Interfaces;
using Bussiness_Logic_Layer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Bussiness_Logic_Layer.Repositories.Implementations
{
    public class CandidateRepository:ICandidateRepository
    {
        private readonly AppDbContext _context;
        private readonly IIdentityRepository _identity;
        public CandidateRepository(AppDbContext context, IIdentityRepository identity)
        {
            _context = context;
            _identity = identity;
        }
        public async Task<Candidate> GetCandidate(string id)
        {
            if (id == null)
            {
                throw new Exception("Id is empty");
            }

            var user = await _identity.GetUserById(id);
            var candidate = await _context.Candidates.FirstOrDefaultAsync(c => c.UserId == user.Id);
            var _experiences = await _context.UserExperiences.Where(u => u.UserId == id).ToListAsync();

            if (!_experiences.IsNullOrEmpty())
                candidate.Experiences = _experiences;

            candidate.User = user;

            return candidate;
        }

        public async Task SaveAdditionalData(AdditionalDataDTO request)
        {
            var candidate = await _context.Candidates.FirstOrDefaultAsync(e => e.UserId == request.UserId);

            candidate.Skills = request.Skills;
            candidate.Introduction = request.Introduction;

            _context.Candidates.Update(candidate);

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
            }
            await _context.SaveChangesAsync();

        }
    }
}
