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
        void Update(Product music);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<MusicDto>> GetMusicAsync();
        Task<Product> GetMusicByIdAsync(int id);
        Task<MusicDto> GetMusicByFileNameAsync(string filename);
        
    }
}