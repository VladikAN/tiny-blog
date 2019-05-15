using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers
{
    public class ApiController : BaseController
    {
        private readonly IPostDataService _postDataService;

        public ApiController(IPostDataService postDataService)
        {
            _postDataService = postDataService;
        }

        [HttpGet, Route("api/posts")]
        public async Task<ThreadViewModel> Posts()
        {
            var posts = await _postDataService.GetAll();
            return new ThreadViewModel(posts);
        }

        [HttpGet, Route("api/post/{linkText:required}")]
        public async Task<PostViewModel> Post(string linkText)
        {
            var post = await _postDataService.GetByLinkText(linkText);
            return post != null ? new PostViewModel(post) : null;
        }
    }
}
