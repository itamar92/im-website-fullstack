using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;     
        public AdminController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

       [Authorize(Policy = "RequireAdminRole")] 
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
            .Include(r => r.UserRoles)
            .ThenInclude(r  => r.Role)
            .OrderBy(r => r.UserName)
            .Select(u => new
            {
                u.Id,
                Username = u.UserName,
                Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
            })
            .ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "ModerateMusicRole")]
        [HttpGet("music-to-moderate")]
        public  ActionResult GetMusicForModeration()
        {
            return Ok("Admins or moderators can see this");
        }

        [Authorize(Policy = "RequireAdminRole")] 
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(',').ToArray();
            var user = await _userManager.FindByNameAsync(username);
            if(user == null) return NotFound("Could not Find User");


            var userRoles = await _userManager.GetRolesAsync(user);

            //add missing roles
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
            
            if (!result.Succeeded) return BadRequest("Failed to add to roles");
            
            //remove extra roles
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
            
            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            // returning the current user roles
            return Ok(await _userManager.GetRolesAsync(user));
            
        }
    }
}