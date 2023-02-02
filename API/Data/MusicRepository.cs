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
            return await _context.Products
            .Select(music => new MusicDto
            {
                Id = music.Id,
                FileName = music.filename,
                Artist = music.artist,
                Description = music.description,
                Url = music.url,
                Price = music.price
            })
             .ToListAsync();
        }

        public async Task<Product> GetMusicByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<MusicDto> GetMusicByFileNameAsync(string filename)
        {
            return await _context.Products
            .Include(x => x.Tags)
            .Where(x => x.filename == filename)
             .Select(music => new MusicDto
             {
                 Id = music.Id,
                 FileName = music.filename,
                 Artist = music.artist,
                 Description = music.description,
                 Url = music.url,
                 Price = music.price
             })
            .SingleOrDefaultAsync();

        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product music)
        {
            _context.Entry<Product>(music).State = EntityState.Modified;
        }
    }
}