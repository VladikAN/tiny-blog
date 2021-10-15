using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers.Api
{
    [Authorize]
    [ApiController, Route("api/user")]
    public class UserController : Controller
    {
        private readonly IUserDataService _userDataService;
        private readonly IAuthService _authService;

        public UserController(
            IUserDataService userDataService,
            IAuthService authService)
        {
            _userDataService = userDataService;
            _authService = authService;
        }

        [HttpGet, Route("all")]
        public async Task<IActionResult> Get()
        {
            var dto = await _userDataService.GetAll();
            var model = dto.Select(x => new UserViewModel(x)).ToArray();
            return Json(model);
        }

        [HttpPost, Route("activate")]
        public async Task<IActionResult> Activate([FromBody] UserViewModel model)
        {
            var result = await _userDataService.SetActivity(model.Username, true);
            return Json(result ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }

        [HttpPost, Route("deactivate")]
        public async Task<IActionResult> Deactivate([FromBody] UserViewModel model)
        {
            var result = await _userDataService.SetActivity(model.Username, false);
            return Json(result ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }

        [HttpPost, Route("delete")]
        public async Task<IActionResult> Delete([FromBody] UserViewModel model)
        {
            var result = await _userDataService.Delete(model.Username);
            return Json(result ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }

        [HttpPost, Route("save")]
        public async Task<IActionResult> Save([FromBody] UserViewModel model)
        {
            var result = await _authService.SaveUser(model);
            return Json(result ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }
    }
}