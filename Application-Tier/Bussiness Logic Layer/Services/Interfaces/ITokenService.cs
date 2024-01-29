using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user, IList<string> roles);
    }
}
