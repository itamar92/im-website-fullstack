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
        public async Task<IEnumerable<AppMusic>> GetMusicAsync()
        {
            return await _context.Music
             .ToListAsync();
        }

        public async Task<AppMusic> GetMusicByIdAsync(int id)
        {
            return await _context.Music.FindAsync(id);
        }

        public async Task<AppMusic> GetMusicByUserNameAsync(string filename)
        {
            return await _context.Music
            .SingleOrDefaultAsync(x => x.filename == filename);
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