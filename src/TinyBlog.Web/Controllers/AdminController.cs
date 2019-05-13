using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers
{
    public class AdminController : BaseController
    {
        private readonly IPostDataService _postDataService;

        public AdminController(IPostDataService postDataService)
        {
            _postDataService = postDataService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<ThreadViewModel> Thread()
        {
            var posts = await _postDataService.GetAll();
            return new ThreadViewModel(posts);
        }
    }
}
