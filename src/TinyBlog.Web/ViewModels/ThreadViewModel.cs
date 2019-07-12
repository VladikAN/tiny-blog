using System.Linq;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class ThreadViewModel
    {
        public ThreadViewModel(PostDto[] posts, string filterByTag = null)
        {
            Posts = (posts ?? new PostDto[0])
                .Select(post => new PostViewModel(post))
                .ToArray();
            FilterByTag = filterByTag;
        }

        public PostViewModel[] Posts { get; set; } = new PostViewModel[0];
        public string FilterByTag { get;set; }
    }
}
