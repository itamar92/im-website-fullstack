using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class MusicController : BaseApiController
    {
        private readonly IDataCloudService _dataCloudService;
        private readonly IMusicRepository _musicRepository;
        private readonly DataContext _context;

        public MusicController(IMusicRepository musicRepository, IDataCloudService dataCloudService, DataContext context)
        {
            _context = context;
            _dataCloudService = dataCloudService;
            _musicRepository = musicRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MusicDto>>> GetMusic()
        {
            var musicFile = await _musicRepository.GetMusicAsync();

            return Ok(musicFile);
        }

        [HttpGet("{filename}", Name = "GetMusic"),]
        public async Task<ActionResult<MusicDto>> GetMusic(string filename)
        {
            var rtn = await _musicRepository.GetMusicByFileNameAsync(filename);

            return rtn;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMusic(MusicDto musicDto)
        {

            var musicRepo = await _musicRepository.GetMusicByIdAsync(musicDto.Id);

            musicRepo.filename = musicDto.FileName;
            musicRepo.description = musicDto.Description;
            musicRepo.price = musicDto.Price;
            musicRepo.artist = musicDto.Artist;
            // musicRepo.Tags = (ICollection<ProductTag>)musicDto.Tag;


            _musicRepository.Update(musicRepo);

            if (await _musicRepository.SaveAllAsync())
            {
                return Ok(musicRepo);
            }
            return BadRequest("Failed to update product");

        }

        [HttpPost("add-music")]
        public async Task<ActionResult<Product>> AddMusic(IFormFile file)
        {

            var result = await _dataCloudService.UploadVideoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var music = new Product
            {
                filename = ConvertPublicIdToName(result.PublicId),
                artist = "Itamar Miron",
                url = result.SecureUrl.AbsoluteUri,
                public_id = result.PublicId
            };

            if (await MusicExists(music.public_id)) return BadRequest("File already exist");

            _context.Products.Add(music);
            await _context.SaveChangesAsync();
            return music;


        }

        [HttpDelete("delete-music/{Id}")]
        public async Task<ActionResult> DeleteMusic(int Id)
        {
            var musicRepo = await _musicRepository.GetMusicByIdAsync(Id);

            var result = await _dataCloudService.DeleteFileAsync(musicRepo.public_id);

            if (result.Error != null) return BadRequest(result.Error.Message + "File not found on cloud");


            _context.Products.Remove(musicRepo);
            await _dataCloudService.DeleteFileAsync(musicRepo.public_id);

            if (await _musicRepository.SaveAllAsync()) return Ok(musicRepo.public_id + "was deleted");

            return BadRequest("Failed to delete music");
        }

        private async Task<bool> MusicExists(string publicId)
        {
            return await _context.Products.AnyAsync(x => x.public_id == publicId);
        }

        private string ConvertPublicIdToName(string name)
        {

            name = name.Replace("/", " ");

            name = name.Replace("_", " ");

            // Capitalize first letter of each word
            var words = name.Split(' ');
            for (int i = 0; i < words.Length; i++)
            {
                if (!string.IsNullOrWhiteSpace(words[i]))
                    words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1);
            }
            name = string.Join(" ", words, 1, words.Length - 1);

            return name;
        }


    }
}