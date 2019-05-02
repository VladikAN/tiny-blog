using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TinyBlog.Web.Controllers
{
    [AllowAnonymous]
    public abstract class BaseController : Controller
    {
    }
}
