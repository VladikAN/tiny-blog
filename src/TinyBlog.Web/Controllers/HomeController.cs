using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace TinyBlog.Web.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly IPostDataService _postDataService;

        public HomeController(IPostDataService postDataService)
        {
            _postDataService = postDataService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var posts = (await _postDataService.GetAll()).Where(x => x.IsPublished).ToArray();
            var model = new ThreadViewModel(posts);
            return View(model);
        }

        [HttpGet, Route("admin/{*internal}")]
        public IActionResult Admin()
        {
            return View();
        }

        [HttpGet, Route("post/{linkText:required}")]
        public async Task<IActionResult> Post(string linkText)
        {
            var post = await _postDataService.GetByLinkText(linkText);
            if (post == null || !post.IsPublished)
            {
                return NotFound();
            }

            var model = new PostViewModel(post);
            return View(model);
        }

        [HttpGet, Route("tag/{name}")]
        public async Task<IActionResult> Tag(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return RedirectToAction(nameof(Index));
            }

            var posts = (await _postDataService.GetByTag(name)).Where(x => x.IsPublished).ToArray();
            if (posts.Length == 0)
            {
                return NotFound();
            }

            var model = new ThreadViewModel(posts);
            return View(nameof(Index), model);
        }
    }
}