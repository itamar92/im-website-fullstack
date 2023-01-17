using System;
using System.Collections.Generic;
using System.Security.Claims;
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

        // [HttpGet("{filename}", Name = "GetMusic"),]
        // public async Task<ActionResult<MusicDto>> GetUser(string filename)
        // {
        //     var rtn = await _musicRepository.GetMusicAsync(filename);

        //     return rtn;
        // }

        [HttpPost("add-music")]
        public async Task<ActionResult<MusicDto>> AddMusic(IFormFile file)
        {

            var result = await _dataCloudService.UploadVideoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var music = new AppMusic
            {
                url = result.SecureUrl.AbsoluteUri,
                public_id = result.PublicId
            };

            if (await _musicRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetMusic", new { filename = music.filename });
            }

            return BadRequest("Problem adding music");
        }

        [HttpDelete("delete-music/{musicId}")]
        public async Task<ActionResult> DeleteMusic(string musicId)
        {
            var musicRepo = await _musicRepository.GetMusicByIdAsync(musicId);


            if (await MusicExists(musicId)) return BadRequest("music not found");

            // some of our photos are stored on cloudinary (have PublicId), but maybe not all...
            if (musicRepo.public_id != null)
            {
                var result = await _dataCloudService.DeleteFileAsync(musicRepo.public_id);

                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            _context.Music.Remove(musicRepo);

            if (await _musicRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete photo");
        }

        private async Task<bool> MusicExists(string musicId)
        {
            return await _context.Music.AnyAsync(x => x.asset_id == musicId);
        }
    }
}