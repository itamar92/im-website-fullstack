using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        
        // public int Id { get; set; }
        // public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        // public string Email { get; set; }
        // public byte[] PasswordHash { get; set; }
        // public byte[] PasswordSalt { get; set; }
        // public string RefreshToken { get; set; }
        // public DateTime RefreshTokenExpiryTime { get; set; }

        public ICollection<Order> Orders { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}