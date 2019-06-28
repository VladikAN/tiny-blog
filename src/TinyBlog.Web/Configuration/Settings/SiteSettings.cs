using Microsoft.Extensions.Configuration;

namespace TinyBlog.Web.Configuration.Settings
{
    public class SiteSettings : ISiteSettings
    {
        private const string SectionName = "SiteSettings";

        public SiteSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection(SectionName);
            DefaultCacheDuration = section.GetValue<int>(nameof(DefaultCacheDuration));
        }

        public int DefaultCacheDuration { get; }
    }
}