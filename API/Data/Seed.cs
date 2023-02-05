using System.Collections.Generic;
using System.Linq;
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

            //add the roles to the manager
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
                UserName = "admin",
                FirstName = "admin"

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
                // adding the files to db

                context.Products.Add(file);
            }

            await context.SaveChangesAsync();

        }
        public static async Task SeedTag(DataContext context)
        {

            if (await context.Tags.AnyAsync()) return;


            var tagData = await System.IO.File.ReadAllTextAsync("Data/TagSeedData.json");

            var tags = JsonSerializer.Deserialize<List<Tag>>(tagData);

            foreach (var name in tags)
            {

                context.Tags.Add(name);
            }

            await context.SaveChangesAsync();

        }

        public static async Task SeedProductTag(DataContext context)
        {
            if (await context.ProductTags.AnyAsync()) return;

            var products = context.Products.ToList();
            var tags = context.Tags.ToList();

            var productTags = new List<ProductTag>
        {
            new ProductTag { Product = products[0], Tag = tags[6] },
            new ProductTag { Product = products[0], Tag = tags[2] },
            new ProductTag { Product = products[1], Tag = tags[5] },
            new ProductTag { Product = products[2], Tag = tags[4] },
            new ProductTag { Product = products[2], Tag = tags[6] },
            new ProductTag { Product = products[3], Tag = tags[0] },
            new ProductTag { Product = products[3], Tag = tags[4] },
            new ProductTag { Product = products[3], Tag = tags[3] },
            new ProductTag { Product = products[4], Tag = tags[4] },
            new ProductTag { Product = products[4], Tag = tags[6] },
            new ProductTag { Product = products[4], Tag = tags[7] }
        };

            context.ProductTags.AddRange(productTags);
            context.SaveChanges();
        }
    }
}