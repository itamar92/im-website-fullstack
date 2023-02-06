
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")] // POST api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");


            var user = new AppUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,

            };
            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");
            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Firstname = user.FirstName,
                Token = await _tokenService.CreateToken(user),
                RefreshToken = _tokenService.CreateRefreshToken()
            };
        }

        [HttpPost("login")] // POST api/account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //get user from db
            var user = await this._userManager.Users
            .Include(x => x.Orders)
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
            if (user == null) return Unauthorized("Invalid username or password");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);



            if (!result.Succeeded) return Unauthorized("invalid password");

            var accessToken = await _tokenService.CreateToken(user);
            var refreshToken = _tokenService.CreateRefreshToken();

            // user.RefreshToken = refreshToken;
            // user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

            return new UserDto
            {
                Username = user.UserName,
                Firstname = user.FirstName,
                Token = accessToken,
                RefreshToken = refreshToken
            };



        }


        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}