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
        private const int PenaltyMs = 1000;
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
                    Response.Headers.Authorization = user.Token;
                    return ApiResponseViewModel.Success();
                }
            }

            await Task.Delay(PenaltyMs); // Small timeout to prevent password guess
            return ApiResponseViewModel.Failed();
        }

        [HttpPost, AllowAnonymous, Route("change-password")]
        public async Task<ApiResponseViewModel> ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var success = await _authService.TryChangePassword(model.Username, model.Password, model.Token);
                if (success)
                {
                    return ApiResponseViewModel.Success();
                }
            }

            await Task.Delay(PenaltyMs); // Small timeout to prevent password guess
            return ApiResponseViewModel.Failed();
        }

        [HttpGet, Route("verify")]
        public IActionResult Verify() => Ok();
    }
}