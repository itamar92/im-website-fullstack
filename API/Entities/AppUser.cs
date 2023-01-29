using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        
    
        public string FirstName { get; set; }
        public string LastName { get; set; }
       

        public ICollection<Order> Orders { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}