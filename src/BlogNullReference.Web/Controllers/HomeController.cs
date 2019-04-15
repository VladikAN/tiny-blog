using Microsoft.AspNetCore.Mvc;

namespace BlogNullReference.Web.Controllers
{
    public class HomeController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
