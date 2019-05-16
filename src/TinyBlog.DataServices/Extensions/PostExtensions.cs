using System.Linq;
using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Extensions
{
    internal static class PostExtensions
    {
        internal static PostDto BuildDto(this Post post, bool includeText = false)
        {
            var tags = (post.Tags?.Select(tg => tg.BuildDto()) ?? new TagDto[0]).ToArray();
            var fullText = includeText ? post.FullText : string.Empty;

            return new PostDto(
                post.Title,
                post.LinkText,
                post.PreviewText,
                fullText,
                post.PublishedAt,
                post.IsPublished,
                tags);
        }

        internal static Post BuildDomain(this PostDto post)
        {
            var result = new Post
            {
                Title = post.Title,
                LinkText = post.LinkText,
                PreviewText = post.PreviewText,
                FullText = post.FullText,
                PublishedAt = post.PublishedAt,
                Tags = (post.Tags ?? new TagDto[0])
                    .Select(tg => tg.BuildDomain())
                    .ToArray()
            };

            return result;
        }
    }
}
