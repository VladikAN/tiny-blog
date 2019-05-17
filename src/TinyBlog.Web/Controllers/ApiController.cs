using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers
{
    public class ApiController : BaseController
    {
        private readonly IPostDataService _postDataService;

        public ApiController(IPostDataService postDataService)
        {
            _postDataService = postDataService;
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
        public async Task<ApiResponseViewModel> Publish([FromBody] string linkText, bool publish)
        {
            var success = await _postDataService.TogglePublish(linkText, publish);
            return success ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed();
        }
    }
}
