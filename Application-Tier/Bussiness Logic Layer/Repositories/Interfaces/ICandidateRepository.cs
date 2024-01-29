using Bussiness_Logic_Layer.DTOs;
using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.Repositories.Interfaces
{
    public interface ICandidateRepository
    {
        Task<Candidate> GetCandidate(string id);
        Task SaveAdditionalData(AdditionalDataDTO request);
    }
}
