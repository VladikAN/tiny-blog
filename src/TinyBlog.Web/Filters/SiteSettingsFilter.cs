using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Filters
{
    public class SiteSettingsFilter : IAsyncActionFilter
    {
        private readonly ILayoutDataService _layoutDataService;

        public SiteSettingsFilter(LayoutDataService layoutDataService)
        {
            _layoutDataService = layoutDataService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var controller = context.Controller as Controller;
            if (controller != null)
            {
                var layout = await _layoutDataService.Get();
                var model = new LayoutViewModel(layout);

                controller.ViewData[nameof(LayoutViewModel.Title)] = model.Title;
                controller.ViewData[nameof(LayoutViewModel.Description)] = model.Description;
                controller.ViewData[nameof(LayoutViewModel.Uri)] = model.Uri;
                controller.ViewData[nameof(LayoutViewModel.Author)] = model.Author;
                controller.ViewData[nameof(LayoutViewModel.Language)] = model.Language;
                controller.ViewData[nameof(LayoutViewModel.GoogleTagsCode)] = model.GoogleTagsCode;
                controller.ViewData[nameof(LayoutViewModel.HeaderContent)] = model.HeaderContent;
                controller.ViewData[nameof(LayoutViewModel.FooterContent)] = model.FooterContent;
            }

            // Did not expect anything else here
        }
    }
}