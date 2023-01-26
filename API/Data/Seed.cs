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

         public static async Task SeedUsers( UserManager<AppUser> userManager)
        {
           
            if (await userManager.Users.AnyAsync()) return;

        
            var userData =  await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();

               
                await userManager.CreateAsync(user, "Pa$$w0rd");
                            }
        }

        //logic to get the data from the json file to the db
        public static async Task SeedMusic(DataContext context)
        {

            if (await context.Music.AnyAsync()) return;


            var musicData = await System.IO.File.ReadAllTextAsync("Data/MusicSeedData.json");

            // deserialize the json data into a list of AppUser objects
            var musics = JsonSerializer.Deserialize<List<AppMusic>>(musicData);

            foreach (var file in musics)
            {
                // adding the files to our db

                context.Music.Add(file); // this is not the actual adding, only tracking the operation
            }

            await context.SaveChangesAsync();

        }
    }
}