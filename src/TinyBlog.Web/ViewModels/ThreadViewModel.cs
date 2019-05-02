using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class ThreadViewModel
    {
        public ThreadViewModel(PostDto[] posts)
        {
            Posts = posts;
        }

        public PostDto[] Posts { get; set; } = new PostDto[0];
    }
}
