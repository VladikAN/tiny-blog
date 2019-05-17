using System;
using System.Linq;
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
            Title = post.Title;
            LinkText = post.LinkText;
            PreviewText = post.PreviewText;
            FullText = post.FullText;
            PublishedAt = post.PublishedAt;
            Tags = (post.Tags ?? new TagDto[0])
                .Select(tag => new TagViewModel(tag))
                .ToArray();
            IsPublished = post.IsPublished;
        }

        public string Title { get; set; }
        public string LinkText { get; set; }
        public string PreviewText { get; set; }
        public string FullText { get; set; }
        public DateTime PublishedAt { get; }
        public TagViewModel[] Tags { get; } = new TagViewModel[0];
        public bool IsPublished { get; }

        public PostDto ToDto()
        {
            return new PostDto
            {
                Title = Title,
                LinkText = LinkText,
                PreviewText = PreviewText,
                FullText = FullText,
                PublishedAt = PublishedAt,
                Tags = (Tags ?? new TagViewModel[0])
                    .Select(tag => tag.ToDto())
                    .ToArray(),
                // IsPublished ignored
            };
        }
    }
}
