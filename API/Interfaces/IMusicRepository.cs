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
        void Update(AppMusic music);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<MusicDto>> GetMusicAsync();
        Task<AppMusic> GetMusicByIdAsync(int id);
        Task<MusicDto> GetMusicByUserNameAsync(string filename);


    }
}