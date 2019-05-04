using Microsoft.AspNetCore.Mvc;

namespace TinyBlog.Web.Controllers
{
    public class AdminController : BaseController
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
