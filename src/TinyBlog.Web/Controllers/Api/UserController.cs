using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers.Api
{
    [Authorize]
    [ApiController, Route("api/user")]
    public class UserController : Controller
    {
        private readonly IUserDataService _userDataService;

        public UserController(IUserDataService userDataService)
        {
            _userDataService = userDataService;
        }

        [HttpGet, Route("all")]
        public async Task<IActionResult> Get()
        {
            var dto = await _userDataService.GetAll();
            var model = dto.Select(x => new UserViewModel(x)).ToArray();
            return Json(model);
        }
    }
}