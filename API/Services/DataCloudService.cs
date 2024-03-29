using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class DataCloudService : IDataCloudService
    {

        private readonly Cloudinary _cloudinary;


        public DataCloudService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account(

                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            
            _cloudinary = new Cloudinary(acc);
        }

        public async Task<DeletionResult> DeleteFileAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId)
            {
                ResourceType = ResourceType.Video
            };

            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result;
        }
        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),

                    //Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams);

            }
            return uploadResult;
        }

        public async Task<VideoUploadResult> UploadVideoAsync(IFormFile file)
        {
            var uploadResult = new VideoUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();

                var uploadParams = new VideoUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Folder = "Music",
                    UseFilename = true,
                    UniqueFilename = false,
                    UseFilenameAsDisplayName = true

                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams);

            }

            return uploadResult;
        }

        public async Task<ListResourcesResult> ListVideoResourcesAsync()
        {
            var listParams = new ListResourcesParams()
            {
                Type = "upload",
                ResourceType = ResourceType.Video

            };

            var listResources = await _cloudinary.ListResourcesAsync(listParams);

            return listResources;

        }

    }
}