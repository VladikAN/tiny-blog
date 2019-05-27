using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers
{
    [RequireHttps, Authorize]
    [ApiController]
    public class ApiController : Controller
    {
        private readonly IPostDataService _postDataService;
        private readonly IAuthService _authService;

        public ApiController(
            IPostDataService postDataService,
            IAuthService authService)
        {
            _postDataService = postDataService;
            _authService = authService;
        }

        [HttpPost, Route("api/auth"), AllowAnonymous]
        public async Task<ApiResponseViewModel> Authorize([FromBody] AuthViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var user = await _authService.TryAuthorize(model.Email, model.Password);
                if (user != null)
                {
                    return ApiResponseViewModel.Success(user);
                }
            }

            await Task.Delay(100); // Small timeout to prevent password guess
            return ApiResponseViewModel.Failed();
        }

        [HttpGet, Route("api/posts")]
        public async Task<IActionResult> Posts()
        {
            var posts = await _postDataService.GetAll();
            return Json(new ThreadViewModel(posts));
        }

        [HttpGet, Route("api/post/{id:required}")]
        public async Task<IActionResult> Post(string id)
        {
            var post = await _postDataService.Get(id);
            if (post == null)
            {
                return BadRequest();
            }

            return Json(new PostViewModel(post));
        }

        [HttpPost, Route("api/post/save")]
        public async Task<IActionResult> Save([FromBody] PostViewModel model)
        {
            var dto = model.ToDto();
            var id = await _postDataService.Upsert(dto);

            if (!string.IsNullOrWhiteSpace(id))
            {
                var newDto = await _postDataService.Get(id);
                var result = new PostViewModel(newDto);

                return Json(ApiResponseViewModel.Success(result));
            }
            else
            {
                return Json(ApiResponseViewModel.Failed());
            }
        }

        [HttpPost, Route("api/post/publish")]
        public async Task<IActionResult> Publish([FromBody] PublishPostViewModel model)
        {
            var success = await _postDataService.TogglePublish(model.Id, model.Publish);
            return Json(success ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }

        [HttpPost, Route("api/post/delete/{id:required}")]
        public async Task<IActionResult> Delete(string id)
        {
            var success = await _postDataService.Delete(id);
            return Json(success ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }
    }
}
