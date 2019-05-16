using MongoDB.Driver;
using System;
using System.Linq;
using System.Threading.Tasks;
using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Extensions;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.DataServices.Settings;

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
                .FindAsync(FilterDefinition<Post>.Empty, options);

            var result = data.ToList().Select(pst => pst.BuildDto()).ToArray();
            return result;
        }

        public async Task<PostDto[]> GetByTag(string name)
        {
            var now = DateTime.UtcNow;
            var queryParam = name.ToLower();

            var options = new FindOptions<Post> { Sort = Builders<Post>.Sort.Descending(x => x.PublishedAt) };
            var data = await Repository.GetCollection<Post>(CollectionName)
                .FindAsync(pst => pst.Tags.Any(x => x.Name == queryParam), options);

            var result = data.ToList().Select(pst => pst.BuildDto()).ToArray();
            return result;
        }

        public async Task<PostDto> GetByLinkText(string linkText)
        {
            var now = DateTime.UtcNow;
            var queryParam = linkText.ToLower();

            var data = await Repository.GetCollection<Post>(CollectionName)
                .FindAsync(pst => pst.LinkText == queryParam);

            var post = data.FirstOrDefault();
            if (post == null)
            {
                return null;
            }

            var result = post.BuildDto(includeText: true);
            return result;
        }

        public Task Create(PostDto post)
        {
            return Repository.GetCollection<Post>(CollectionName)
                .InsertOneAsync(post.BuildDomain());
        }

        public Task Update(PostDto post)
        {
            var definition = Builders<Post>.Update
                .Set(x => x.Title, post.Title)
                .Set(x => x.LinkText, post.LinkText)
                .Set(x => x.PreviewText, post.PreviewText)
                .Set(x => x.FullText, post.FullText);
                
            var options = new UpdateOptions { IsUpsert = false };

            return Repository.GetCollection<Post>(CollectionName)
                .UpdateOneAsync(x => x.LinkText == post.LinkText, definition, options);
        }

        public Task TogglePublish(string linkText, bool publish)
        {
            var definition = Builders<Post>.Update
                .Set(x => x.IsPublished, publish);

            if (publish)
            {
                definition.Set(x => x.PublishedAt, DateTime.UtcNow);
            }

            var options = new UpdateOptions { IsUpsert = false };

            return Repository.GetCollection<Post>(CollectionName)
                .UpdateOneAsync(x => x.LinkText == linkText, definition, options);
        }
    }
}