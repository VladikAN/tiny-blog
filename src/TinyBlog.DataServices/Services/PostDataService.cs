using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.DataServices.Settings;
using MongoDB.Driver;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace TinyBlog.DataServices.Services
{
    public class PostDataService : BaseDataService, IPostDataService
    {
        private const string CollectionName = "posts";

        public PostDataService(IDatabaseSettings settings) : base(settings)
        {
        }

        public async Task<PostDto[]> GetAll()
        {
            var now = DateTime.UtcNow;

            var options = new FindOptions<Post> { Sort = Builders<Post>.Sort.Descending(x => x.PublishedAt) };
            var data = await Repository.GetCollection<Post>(CollectionName)
                .FindAsync(pst => pst.PublishAt == null || pst.PublishAt <= now, options);

            var result = data.ToList().Select(pst => PostDto.Build(pst)).ToArray();

            return result;
        }

        public async Task<PostDto[]> GetByTag(string name)
        {
            var now = DateTime.UtcNow;
            var queryParam = name.ToLower();

            var options = new FindOptions<Post> { Sort = Builders<Post>.Sort.Descending(x => x.PublishedAt) };
            var data = await Repository.GetCollection<Post>(CollectionName)
                .FindAsync(pst => 
                    pst.Tags.Any(x => x.Name == queryParam)
                    && (pst.PublishAt == null || pst.PublishAt <= now), options);

            var result = data.ToList().Select(pst => PostDto.Build(pst)).ToArray();

            return result;
        }

        public async Task<PostDto> GetByLinkText(string linkText)
        {
            var now = DateTime.UtcNow;
            var queryParam = linkText.ToLower();

            var data = await Repository.GetCollection<Post>(CollectionName)
                .FindAsync(pst => 
                    pst.LinkText == queryParam
                    && (pst.PublishAt == null || pst.PublishAt <= now));

            var post = data.FirstOrDefault();
            if (post == null)
            {
                return null;
            }

            var result = PostDto.Build(post, includeText: true);

            return result;
        }
    }
}