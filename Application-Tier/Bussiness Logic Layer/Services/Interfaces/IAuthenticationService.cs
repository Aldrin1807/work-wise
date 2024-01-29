using Bussiness_Logic_Layer.DTOs;

namespace Bussiness_Logic_Layer.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<string> Login(LoginDTO request);
    }
}
