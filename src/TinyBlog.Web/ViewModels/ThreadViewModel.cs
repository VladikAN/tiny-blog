using System.Linq;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class ThreadViewModel
    {
        public ThreadViewModel(PostDto[] posts)
        {
            Posts = (posts ?? new PostDto[0])
                .Select(post => new PostViewModel(post))
                .ToArray();
        }

        public PostViewModel[] Posts { get; set; } = new PostViewModel[0];
    }
}
