﻿using BlogNullReference.Web.Configuration.Settings;
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
                controller.ViewData[nameof(ISiteSettings.Title)] = !string.IsNullOrWhiteSpace(_settings.Title) ? _settings.Title : null;
                controller.ViewData[nameof(ISiteSettings.Description)] = !string.IsNullOrWhiteSpace(_settings.Description) ? _settings.Description : null;
                controller.ViewData[nameof(ISiteSettings.Url)] = !string.IsNullOrWhiteSpace(_settings.Url) ? _settings.Url : null;
                controller.ViewData[nameof(ISiteSettings.Author)] = !string.IsNullOrWhiteSpace(_settings.Author) ? _settings.Author : null;
                controller.ViewData[nameof(ISiteSettings.GoogleTagsCode)] = !string.IsNullOrWhiteSpace(_settings.GoogleTagsCode) ? _settings.GoogleTagsCode: null;
            }

            // Did not expect anything else here
        }
    }
}
