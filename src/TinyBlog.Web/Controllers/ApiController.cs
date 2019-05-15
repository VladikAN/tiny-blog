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
    }
}
