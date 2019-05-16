using System;

namespace TinyBlog.DataServices.Services.Dto
{
    public class PostDto
    {
        public PostDto()
        {
        }

        public PostDto(
            string title,
            string linkText,
            string previewText,
            string fullText,
            DateTime publishedAt,
            bool isPublished,
            TagDto[] tags = null)
        {
            Title = title;
            LinkText = linkText;
            PreviewText = previewText;
            FullText = fullText;
            PublishedAt = publishedAt;
            IsPublished = isPublished;
            Tags = tags ?? new TagDto[0];
        }

        public string Title { get; set; }
        public string LinkText { get; set; }
        public string PreviewText { get; set; }
        public string FullText { get; set; }
        public DateTime PublishedAt { get; set; }
        public TagDto[] Tags { get; set; }
        public bool IsPublished { get; set; }
    }
}
