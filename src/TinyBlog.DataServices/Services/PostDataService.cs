using Microsoft.Extensions.Logging;
using MongoDB.Bson;
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

        private ILogger _logger;

        public PostDataService(
            IDatabaseSettings settings,
            ILogger<PostDataService> logger) : base(settings)
        {
            _logger = logger;
        }

        public async Task<PostDto[]> GetAll()
        {
            var options = new FindOptions<Post> { Sort = Builders<Post>.Sort.Descending(x => x.PublishedAt) };
            var data = await PostCollection().FindAsync(FilterDefinition<Post>.Empty, options);
            return data.ToList().Select(pst => pst.BuildDto()).ToArray();
        }

        public async Task<PostDto[]> GetByTag(string name)
        {
            var queryParam = name.Trim().ToLower();
            var options = new FindOptions<Post> { Sort = Builders<Post>.Sort.Descending(x => x.PublishedAt) };
            var data = await PostCollection().FindAsync(pst => pst.Tags.Any(x => x.Name == queryParam), options);

            var result = data.ToList().Select(pst => pst.BuildDto()).ToArray();
            return result;
        }

        public async Task<PostDto> GetByLinkText(string linkText)
        {
            var queryParam = linkText.Trim().ToLower();
            var data = await PostCollection().FindAsync(pst => pst.LinkText == queryParam);
            var post = await data.FirstOrDefaultAsync();
            return post?.BuildDto(includeText: true);
        }

        public async Task<bool> Create(PostDto post)
        {
            try
            {
                await PostCollection().InsertOneAsync(post.BuildDomain());
                _logger.LogInformation($"Post '{post.LinkText}' was created");
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return false;
            }
        }

        public async Task<PostDto> Get(string id)
        {
            var entity = await GetById(id);
            return entity?.BuildDto();
        }

        public async Task<bool> Update(PostDto post)
        {
            try
            {
                var domain = post.BuildDomain();
                var definition = Builders<Post>.Update
                    .Set(x => x.Title, domain.Title)
                    .Set(x => x.LinkText, domain.LinkText)
                    .Set(x => x.PreviewText, domain.PreviewText)
                    .Set(x => x.FullText, domain.FullText)
                    .Set(x => x.Tags, domain.Tags);

                var options = new UpdateOptions { IsUpsert = false };
                var entityId = ObjectId.Parse(post.Id);

                await PostCollection().UpdateOneAsync(x => x.EntityId == entityId, definition, options);
                _logger.LogInformation($"Post '{post.LinkText}' was updated");

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return false;
            }
        }

        public async Task<bool> TogglePublish(string id, bool publish)
        {
            try
            {
                var entity = await GetById(id);

                var definition = Builders<Post>.Update.Set(x => x.IsPublished, publish);
                if (publish && entity.PublishedAt == null)
                {
                    definition.Set(x => x.PublishedAt, DateTime.UtcNow);
                }

                var options = new UpdateOptions { IsUpsert = false };
                await PostCollection().UpdateOneAsync(x => x.EntityId == entity.EntityId, definition, options);
                _logger.LogInformation($"Post '{entity.LinkText}' has changed publish flag to {publish}");

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return false;
            }
        }

        private async Task<Post> GetById(string id)
        {
            var queryParam = ObjectId.Parse(id);
            var data = await PostCollection().FindAsync(pst => pst.EntityId == queryParam);
            return await data.FirstOrDefaultAsync();
        }

        private IMongoCollection<Post> PostCollection() => Repository.GetCollection<Post>(CollectionName);
    }
}