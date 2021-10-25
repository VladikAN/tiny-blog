using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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
        public async Task<IActionResult> Authorize([FromBody] AuthViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var user = await _authService.TryAuthorize(model.Username, model.Password);
                if (user != null)
                {
                    if (!string.IsNullOrEmpty(user.RefreshToken))
                    {
                        Response.Cookies.Append("refreshToken", user.RefreshToken, new CookieOptions { HttpOnly = true, Expires = DateTime.UtcNow.AddDays(1) });
                    }
                    else
                    {
                        Response.Cookies.Delete("refreshToken");
                    }
                    
                    return Ok(ApiResponseViewModel.Success(user));
                }
            }

            return StatusCode(StatusCodes.Status401Unauthorized, ApiResponseViewModel.Failed());
        }

        [HttpPost, Route("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            {
                return BadRequest();
            }

            var user = await _authService.TryRefreshJwt(refreshToken);
            if (user != null)
            {
                Response.Cookies.Append("refreshToken", user.RefreshToken, new CookieOptions { HttpOnly = true, Expires = DateTime.UtcNow.AddDays(1) });
                return Ok(ApiResponseViewModel.Success(user));
            }

            return StatusCode(StatusCodes.Status401Unauthorized, ApiResponseViewModel.Failed());
        }

        [HttpPost, AllowAnonymous, Route("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var success = await _authService.TryChangePassword(model.Username, model.Password, model.Token);
                if (success)
                {
                    return Ok(ApiResponseViewModel.Success());
                }
            }

            return StatusCode(StatusCodes.Status401Unauthorized, ApiResponseViewModel.Failed());
        }

        [HttpGet, Route("verify")]
        public IActionResult Verify() => Ok();
    }
}