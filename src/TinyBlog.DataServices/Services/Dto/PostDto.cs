using System;

namespace TinyBlog.DataServices.Services.Dto
{
    public class PostDto
    {
        public PostDto()
        {
        }

        public PostDto(
            string id,
            string title,
            string linkText,
            string previewText,
            string fullText,
            DateTime publishedAt,
            bool isPublished,
            string[] tags)
        {
            Id = id;
            Title = title;
            LinkText = linkText;
            PreviewText = previewText;
            FullText = fullText;
            PublishedAt = publishedAt;
            IsPublished = isPublished;
            Tags = tags ?? new string[0];
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public string LinkText { get; set; }
        public string PreviewText { get; set; }
        public string FullText { get; set; }
        public DateTime PublishedAt { get; set; }
        public string[] Tags { get; set; }
        public bool IsPublished { get; set; }
    }
}
