using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers.Api
{
    [Authorize]
    [ApiController, Route("api/post")]
    public class PostController : Controller
    {
        private readonly IPostDataService _postDataService;

        public PostController(IPostDataService postDataService)
        {
            _postDataService = postDataService;
        }

        [HttpGet, Route("all")]
        public async Task<IActionResult> Posts()
        {
            var posts = await _postDataService.GetAll();
            return Json(new ThreadViewModel(posts));
        }

        [HttpGet, Route("{id:required}")]
        public async Task<IActionResult> Post(string id)
        {
            var post = await _postDataService.Get(id);
            if (post == null)
            {
                return BadRequest();
            }

            return Json(new PostViewModel(post));
        }

        [HttpPost, Route("save")]
        public async Task<IActionResult> SavePost([FromBody] PostViewModel model)
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

        [HttpPost, Route("publish")]
        public async Task<IActionResult> PublishPost([FromBody] PublishPostViewModel model)
        {
            var success = await _postDataService.TogglePublish(model.Id, model.Publish);
            return Json(success ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }

        [HttpPost, Route("delete/{id:required}")]
        public async Task<IActionResult> DeletePost(string id)
        {
            var success = await _postDataService.Delete(id);
            return Json(success ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }
    }
}