using Microsoft.Extensions.Logging;
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

            var result = data.ToList().Select(pst => pst.BuildDto()).ToArray();
            return result;
        }

        public async Task<PostDto[]> GetByTag(string name)
        {
            var queryParam = name.ToLower();
            var options = new FindOptions<Post> { Sort = Builders<Post>.Sort.Descending(x => x.PublishedAt) };
            var data = await PostCollection().FindAsync(pst => pst.Tags.Any(x => x.Name == queryParam), options);

            var result = data.ToList().Select(pst => pst.BuildDto()).ToArray();
            return result;
        }

        public async Task<PostDto> GetByLinkText(string linkText)
        {
            var queryParam = linkText.ToLower();
            var data = await PostCollection().FindAsync(pst => pst.LinkText == queryParam);

            var post = data.FirstOrDefault();
            if (post == null)
            {
                return null;
            }

            var result = post.BuildDto(includeText: true);
            return result;
        }

        public async Task<bool> Create(PostDto post)
        {
            try
            {
                await PostCollection().InsertOneAsync(post.BuildDomain());
                _logger.LogInformation($"Post {post.LinkText} was created");

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return false;
            }
        }

        public async Task<bool> Update(PostDto post)
        {
            try
            {
                var definition = Builders<Post>.Update
                .Set(x => x.Title, post.Title)
                .Set(x => x.LinkText, post.LinkText)
                .Set(x => x.PreviewText, post.PreviewText)
                .Set(x => x.FullText, post.FullText);

                var options = new UpdateOptions { IsUpsert = false };

                await PostCollection().UpdateOneAsync(x => x.LinkText == post.LinkText, definition, options);
                _logger.LogInformation($"Post {post.LinkText} was updated");

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return false;
            }
        }

        public async Task<bool> TogglePublish(string linkText, bool publish)
        {
            try
            {
                var definition = Builders<Post>.Update
                    .Set(x => x.IsPublished, publish);

                if (publish)
                {
                    definition.Set(x => x.PublishedAt, DateTime.UtcNow);
                }

                var options = new UpdateOptions { IsUpsert = false };

                await PostCollection().UpdateOneAsync(x => x.LinkText == linkText, definition, options);
                _logger.LogInformation($"Post '{linkText}' has changed publish flag to {publish}");

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return false;
            }
        }

        private IMongoCollection<Post> PostCollection() => Repository.GetCollection<Post>(CollectionName);
    }
}