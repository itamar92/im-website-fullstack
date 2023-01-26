using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    //1. derive from IdentityUserRole<int>
    public class AppUserRole: IdentityUserRole<int>
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
        
    }
}