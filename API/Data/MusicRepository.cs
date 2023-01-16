using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class MusicRepository : IMusicRepository
    {
        private readonly DataContext _context;

        public MusicRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Music>> GetMusicAsync()
        {
            return await _context.Music
             .ToListAsync();
        }

        public async Task<Music> GetMusicByIdAsync(int id)
        {
            return await _context.Music.FindAsync(id);
        }

        public async Task<Music> GetMusicByUserNameAsync(string filename)
        {
            return await _context.Music
            .SingleOrDefaultAsync(x => x.FileName == filename);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Music music)
        {
            _context.Entry<Music>(music).State = EntityState.Modified;
        }
    }
}