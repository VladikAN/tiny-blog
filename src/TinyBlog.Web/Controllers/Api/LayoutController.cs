using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Controllers.Api
{
    [Authorize]
    [ApiController, Route("api/layout")]
    public class LayoutController : Controller
    {
        private readonly ILayoutDataService _layoutDataService;

        public LayoutController(ILayoutDataService layoutDataService)
        {
            _layoutDataService = layoutDataService;
        }

        [HttpGet]
        public async Task<IActionResult> Layout()
        {
            var dto = await _layoutDataService.Get();
            return Json(new LayoutViewModel(dto));
        }

        [HttpPost, Route("save")]
        public async Task<IActionResult> SaveLayout([FromBody] LayoutViewModel model)
        {
            var result = await _layoutDataService.Save(model.BuildDto());
            return Json(result ? ApiResponseViewModel.Success() : ApiResponseViewModel.Failed());
        }
    }
}