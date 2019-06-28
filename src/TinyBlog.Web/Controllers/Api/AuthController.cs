using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TinyBlog.Web.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers.Api
{
    [Authorize]
    [ApiController, Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost, AllowAnonymous]
        public async Task<ApiResponseViewModel> Authorize([FromBody] AuthViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var user = await _authService.TryAuthorize(model.Username, model.Password);
                if (user != null)
                {
                    return ApiResponseViewModel.Success(user);
                }
            }

            await Task.Delay(100); // Small timeout to prevent password guess
            return ApiResponseViewModel.Failed();
        }

        [HttpGet, Route("verify")]
        public IActionResult Verify() => Ok();
    }
}