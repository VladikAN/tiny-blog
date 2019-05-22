using System;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class PostViewModel
    {
        public PostViewModel()
        {
        }

        public PostViewModel(PostDto post)
        {
            Id = post.Id;
            Title = post.Title;
            LinkText = post.LinkText;
            PreviewText = post.PreviewText;
            FullText = post.FullText;
            PublishedAt = post.PublishedAt;
            Tags = post.Tags ?? new string[0];
            IsPublished = post.IsPublished;
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public string LinkText { get; set; }
        public string PreviewText { get; set; }
        public string FullText { get; set; }
        public DateTime PublishedAt { get; }
        public string[] Tags { get; set; } = new string[0];
        public bool IsPublished { get; }

        public PostDto ToDto()
        {
            return new PostDto
            {
                Id = Id,
                Title = Title,
                LinkText = LinkText,
                PreviewText = PreviewText,
                FullText = FullText,
                PublishedAt = PublishedAt,
                Tags = Tags
                // IsPublished ignored
            };
        }
    }
}
