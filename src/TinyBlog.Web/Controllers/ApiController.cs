using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers
{
    public class ApiController : BaseController
    {
        private readonly IPostDataService _postDataService;
        private readonly AuthService _authService;

        public ApiController(
            IPostDataService postDataService,
            AuthService authService)
        {
            _postDataService = postDataService;
            _authService = authService;
        }

        [HttpPost, Route("api/auth"), AllowAnonymous]
        public async Task<ApiResponseViewModel> Authorize([FromBody] AuthViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var success = await _authService.TryAuthorize(model.Email, model.Password);
                if (success)
                {
                    return ApiResponseViewModel.Success();
                }
            }

            await Task.Delay(100); // Small timeout to prevent password guess
            return ApiResponseViewModel.Failed();
        }

        [HttpGet, Route("api/posts")]
        public async Task<ThreadViewModel> Posts()
        {
            var posts = await _postDataService.GetAll();
            return new ThreadViewModel(posts);
        }

        [HttpGet, Route("api/post/{linkText:required}")]
        public async Task<PostViewModel> Post(string linkText)
        {
            var post = await _postDataService.GetByLinkText(linkText);
            return post != null ? new PostViewModel(post) : null;
        }

        [HttpPost, Route("api/post/update")]
        public async Task<ApiResponseViewModel> Update([FromBody] PostViewModel model)
        {
            var dto = model.ToDto();
            var success = await _postDataService.Update(dto);

            if (success)
            {
                var newDto = await _postDataService.GetByLinkText(dto.LinkText);
                var result = new PostViewModel(newDto);

                return ApiResponseViewModel.Success(result);
            }
            else
            {
                return ApiResponseViewModel.Failed();
            }
        }

        [HttpPost, Route("api/post/create")]
        public async Task<ApiResponseViewModel> Create([FromBody] PostViewModel model)
        {
            var dto = model.ToDto();
            var success = await _postDataService.Create(dto);

            if (success)
            {
                var newDto = await _postDataService.GetByLinkText(dto.LinkText);
                var result = new PostViewModel(newDto);

                return ApiResponseViewModel.Success(result);
            }
            else
            {
                return ApiResponseViewModel.Failed();
            }
        }

        [HttpPost, Route("api/post/publish")]
        public async Task<ApiResponseViewModel> Publish([FromBody] PublishPostViewModel model)
        {
            var success = await _postDataService.TogglePublish(model.LinkText, model.Publish);
            return success ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed();
        }
    }
}
