using BlogNullReference.Web.Configuration.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BlogNullReference.Web.Filters
{
    public class SiteSettingsFilter : IActionFilter
    {
        private readonly ISiteSettings _settings;

        public SiteSettingsFilter(ISiteSettings settings)
        {
            _settings = settings;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var controller = context.Controller as Controller;
            if (controller != null)
            {
                controller.ViewData[nameof(ISiteSettings.Title)] = _settings.Title;
            }

            // Did not expect anything else here
        }
    }
}
