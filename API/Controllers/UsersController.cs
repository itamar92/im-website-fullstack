using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        public UsersController(DataContext context, IUserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;


        }

        [HttpGet] // api/users
        // [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<UserDto>> GetUser(string username)
        {
            var rtn = await _userRepository.GetUserDtoByUserNameAsync(username);

            return rtn;


        }
        // [Authorize]
        // [HttpGet("{id}")] // api/users/1
        // public async Task<ActionResult<AppUser>> GetUser(int id)
        // {
        //     return await _context.Users.FindAsync(id);
        // }
    }
}