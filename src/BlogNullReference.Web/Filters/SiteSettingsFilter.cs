using BlogNullReference.Web.Configuration.Settings;
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
        }
    }
}
