using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogNullReference.Web.Controllers
{
    [AllowAnonymous, RequireHttps]
    public abstract class BaseController : Controller
    {
    }
}
