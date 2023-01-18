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
            var musicFiles = await _musicRepository.GetMusicAsync();

            return Ok(musicFiles);
        }

        [HttpGet("{filename}", Name = "GetMusic"),]
        public async Task<ActionResult<AppMusic>> GetMusic(string filename)
        {
            var rtn = await _musicRepository.GetMusicByUserNameAsync(filename);

            return rtn;
        }

        [HttpPost("add-music")]
        public async Task<ActionResult<AppMusic>> AddMusic(IFormFile file)
        {

            var result = await _dataCloudService.UploadVideoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var music = new AppMusic
            {
                asset_id = result.AssetId,
                filename = ConvertPublicIdToName(result.PublicId),
                artist = "Itamar Miron",
                url = result.SecureUrl.AbsoluteUri,
                public_id = result.PublicId
            };

            if (await MusicExists(music.public_id)) return BadRequest("File already exist");

            _context.Music.Add(music);
            await _context.SaveChangesAsync();
            return music;

            
        }

        [HttpDelete("delete-music/{Id}")]
        public async Task<ActionResult> DeleteMusic(int Id)
        {
            var musicRepo = await _musicRepository.GetMusicByIdAsync(Id);
                      
            var result = await _dataCloudService.DeleteFileAsync(musicRepo.public_id);

            if (result.Error != null) return BadRequest(result.Error.Message + "File not found on cloud");


            _context.Music.Remove(musicRepo);
            await _dataCloudService.DeleteFileAsync(musicRepo.public_id);

            if (await _musicRepository.SaveAllAsync()) return Ok(musicRepo.public_id + "was deleted");

            return BadRequest("Failed to delete music");
        }

        private async Task<bool> MusicExists(string publicId)
        {
            return await _context.Music.AnyAsync(x => x.public_id == publicId);
        }

        public string ConvertPublicIdToName(string name)
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