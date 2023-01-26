using System.Security.Claims;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
        string CreateRefreshToken();
         ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}