using TinyBlog.DataServices.Entities;
using System;
using System.Linq;

namespace TinyBlog.DataServices.Services.Dto
{
    public class PostDto
    {
        public PostDto(
            string title,
            string linkText,
            string previewText,
            string fullText,
            DateTime publishedAt,
            TagDto[] tags = null)
        {
            Title = title;
            LinkText = linkText;
            PreviewText = previewText;
            FullText = fullText;
            PublishedAt = publishedAt;
            Tags = tags ?? new TagDto[0];
        }

        public string Title { get; }
        public string LinkText { get; set; }
        public string PreviewText { get; }
        public string FullText { get; set; }
        public DateTime PublishedAt { get; }
        public TagDto[] Tags { get; }

        internal static PostDto Build(Post post, bool includeText = false)
        {
            var tags = (post.Tags?.Select(tg => TagDto.Build(tg)) ?? new TagDto[0]).ToArray();
            var fullText = includeText ? post.FullText : string.Empty;

            return new PostDto(post.Title, post.LinkText, post.PreviewText, fullText, post.PublishedAt, tags);
        }
    }
}
