using BlogNullReference.DataServices.Services.Dto;

namespace BlogNullReference.Web.ViewModels
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
