using System.Security.Claims;
using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
        string CreateRefreshToken();
         ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}