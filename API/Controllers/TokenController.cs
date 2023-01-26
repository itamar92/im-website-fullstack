using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TokenController : BaseApiController
    {
        // private readonly DataContext _context;
        // private readonly ITokenService _tokenService;

        // public TokenController(DataContext context, ITokenService tokenService)
        // {
        //     _context = context;
        //     _tokenService = tokenService;
        // }

        // [HttpPost]
        // [Route("refresh")]
        // public async Task<ActionResult<UserDto>> Refresh(TokenApiDto tokenApiDto)
        // {
        //     string accessToken = tokenApiDto.AccessToken;
        //     string refreshToken = tokenApiDto.RefreshToken;

        //     var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
        //     var username = principal.Identity.Name; // mapp to the name claim by default

        //     var user = await this._context.Users.SingleOrDefaultAsync(X => X.UserName == username);

        //     if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
        //         return BadRequest("Invalid client request");

        //     var newAccessToken = _tokenService.CreateToken(user);
        //     var newRefreshToken = _tokenService.CreateRefreshToken();

        //     user.RefreshToken = newRefreshToken;
        //     _context.SaveChanges();

        //     return Ok(new UserDto()
        //     {
        //         Username = user.UserName,
        //         Firstname = user.FirstName,
        //         Token = accessToken,
        //         RefreshToken = refreshToken
        //     });
        // }

        // [HttpPost]
        // [Route("revoke")]
        // public async Task<ActionResult> Revoke()
        // {
        //     var username = User.Identity.Name;

        //     var user = await this._context.Users.SingleOrDefaultAsync(X => X.UserName == username);
        //     if (user == null) return BadRequest();

        //     user.RefreshToken = null;

        //     _context.SaveChanges();

        //     return NoContent();
        // }
    }
}