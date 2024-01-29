using Bussiness_Logic_Layer.DTOs;

namespace Bussiness_Logic_Layer.Services.Interfaces
{
    public interface IRegistrationService
    {
        Task Register(RegisterCandidateDTO request);
        Task Register(RegisterCompanyDTO request);
    }
}
