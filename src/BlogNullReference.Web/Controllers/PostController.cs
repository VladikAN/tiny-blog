using System.Threading.Tasks;
using BlogNullReference.DataServices.Services;
using BlogNullReference.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BlogNullReference.Web.Controllers
{
    public class PostController : BaseController
    {
        private readonly IPostDataService _postDataService;

        public PostController(IPostDataService postDataService)
        {
            _postDataService = postDataService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var posts = await _postDataService.GetAll();
            var model = new ThreadViewModel(posts);
            return View(model);
        }

        [HttpGet, Route("/{linkText:required}")]
        public async Task<IActionResult> Post(string linkText)
        {
            var post = await _postDataService.GetByLinkText(linkText);
            if (post == null)
            {
                return RedirectToAction(nameof(Index));
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

            var posts = await _postDataService.GetByTag(name);
            var model = new ThreadViewModel(posts);
            return View(nameof(Index), model);
        }
    }
}
