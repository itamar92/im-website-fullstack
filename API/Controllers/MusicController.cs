using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    public class MusicController : BaseApiController
    {
        private readonly HttpClient _client;

    public MusicController()
    {
        _client = new HttpClient();
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if(file == null || file.Length == 0)
            return BadRequest();
        if(file.Length > 100 * 1024 * 1024)
            return StatusCode(StatusCodes.Status413PayloadTooLarge);

        try
        {
            var url = "https://api.opendrive.com/v1/files/upload";
            var fileName = Path.GetFileName(file.FileName);
            var content = new MultipartFormDataContent();
            var fileContent = new StreamContent(file.OpenReadStream());
            fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
            {
                Name = "file",
                FileName = fileName
            };
            content.Add(fileContent);
            content.Add(new StringContent("your_folder_id"), fileName);
            

            var response = await _client.PostAsync(url, content);
            response.EnsureSuccessStatusCode();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex);
        }
    }
    }
}