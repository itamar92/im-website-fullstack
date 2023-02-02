using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {

        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {

            if (await userManager.Users.AnyAsync()) return;


            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"},
            };

            //3. add the roles to the manager
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();


                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        }

        //logic to get the data from the json file to the db
        public static async Task SeedMusic(DataContext context)
        {

            if (await context.Products.AnyAsync()) return;


            var musicData = await System.IO.File.ReadAllTextAsync("Data/MusicSeedData.json");

            // deserialize the json data into a list of AppUser objects
            var musics = JsonSerializer.Deserialize<List<Product>>(musicData);

            foreach (var file in musics)
            {
                // adding the files to our db

                context.Products.Add(file); // this is not the actual adding, only tracking the operation
            }

            await context.SaveChangesAsync();

        }
    }
}