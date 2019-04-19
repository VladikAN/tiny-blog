using BlogNullReference.DataServices.Entities;
using BlogNullReference.DataServices.Services.Dto;
using BlogNullReference.DataServices.Settings;
using MongoDB.Driver;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BlogNullReference.DataServices.Services
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
                .FindAsync(x => x.PublishAt == null || x.PublishAt <= now, options);

            var result = data.ToList().Select(pst => PostDto.Build(pst)).ToArray();

            return result;
        }
    }
}