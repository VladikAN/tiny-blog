using Microsoft.AspNetCore.Mvc;

namespace BlogNullReference.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
