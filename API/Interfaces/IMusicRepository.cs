using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.DTOs;

namespace API.Interfaces
{
    public interface IMusicRepository
    {
        void Update(Music music);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Music>> GetMusicAsync();
        Task<Music> GetMusicByIdAsync(int id);
        Task<Music> GetMusicByUserNameAsync(string filename);


    }
}