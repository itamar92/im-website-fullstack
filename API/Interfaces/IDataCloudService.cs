using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IDataCloudService
    {
        Task<ImageUploadResult> UploadPhotoAsync(IFormFile file);
        Task<VideoUploadResult> UploadVideoAsync(IFormFile file);
        Task<DeletionResult> DeleteFileAsync(string publicId);

        Task<ListResourcesResult> ListVideoResourcesAsync();
        
    }
}