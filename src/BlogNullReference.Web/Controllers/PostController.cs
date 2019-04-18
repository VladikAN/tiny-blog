using System.Threading.Tasks;
using BlogNullReference.DataServices.Services;
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
            return View(posts);
        }
    }
}
