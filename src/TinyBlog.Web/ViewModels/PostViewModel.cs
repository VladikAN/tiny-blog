using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class PostViewModel
    {
        public PostViewModel(PostDto post)
        {
            Post = post;
        }

        public PostDto Post { get; set; }
    }
}
