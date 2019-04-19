using BlogNullReference.DataServices.Entities;
using System;
using System.Linq;

namespace BlogNullReference.DataServices.Services.Dto
{
    public class PostDto
    {
        public PostDto(
            string title,
            string previewText,
            DateTime publishedAt,
            TagDto[] tags = null)
        {
            Title = title;
            PreviewText = previewText;
            PublishedAt = publishedAt;
            Tags = tags ?? new TagDto[0];
        }

        public string Title { get; }
        public string PreviewText { get; }
        public DateTime PublishedAt { get; }
        public TagDto[] Tags { get; }

        internal static PostDto Build(Post post)
        {
            var tags = (post.Tags?.Select(tg => TagDto.Build(tg)) ?? new TagDto[0]).ToArray();
            return new PostDto(post.Title, post.PreviewText, post.PublishedAt, tags);
        }
    }
}
