using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using API.DTOs;

namespace API.Data
{
    public class MusicRepository : IMusicRepository
    {
        private readonly DataContext _context;

        public MusicRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<MusicDto>> GetMusicAsync()
        {
            return await _context.Music
            .Select(music => new MusicDto
            {
                Id = music.Id,
                FileName = music.filename,
                Artist = music.artist,
                Description = music.description,
                Tag = music.tag,
                Url = music.url
            })
             .ToListAsync();
        }

        public async Task<AppMusic> GetMusicByIdAsync(int id)
        {
            return await _context.Music.FindAsync(id);
        }

        public async Task<MusicDto> GetMusicByUserNameAsync(string filename)
        {
            return await _context.Music
            .Where(x => x.filename == filename)
             .Select(music => new MusicDto
             {
                 Id = music.Id,
                 FileName = music.filename,
                 Artist = music.artist,
                 Description = music.description,
                 Tag = music.tag,
                 Url = music.url
             })
            .SingleOrDefaultAsync();

        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppMusic music)
        {
            _context.Entry<AppMusic>(music).State = EntityState.Modified;
        }
    }
}