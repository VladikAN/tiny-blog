using MongoDB.Bson;
using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Extensions
{
    internal static class PostExtensions
    {
        internal static PostDto BuildDto(this Post post, bool includeText = false)
        {
            var fullText = includeText ? post.FullText : string.Empty;
            return new PostDto(
                post.EntityId.ToString(),
                post.Title,
                post.LinkText,
                post.PreviewText,
                fullText,
                post.PublishedAt,
                post.IsPublished,
                post.Tags);
        }

        internal static Post BuildDomain(this PostDto post)
        {
            var entityId = !string.IsNullOrWhiteSpace(post.Id) ? ObjectId.Parse(post.Id) : ObjectId.GenerateNewId();
            var result = new Post
            {
                EntityId = entityId,
                Title = post.Title,
                LinkText = post.LinkText,
                PreviewText = post.PreviewText,
                FullText = post.FullText,
                PublishedAt = post.PublishedAt,
                Tags = post.Tags
            };

            return result;
        }
    }
}
