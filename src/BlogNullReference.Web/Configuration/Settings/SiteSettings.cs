using Microsoft.Extensions.Configuration;

namespace BlogNullReference.Web.Configuration.Settings
{
    public class SiteSettings : ISiteSettings
    {
        public SiteSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection(nameof(SiteSettings));
            Title = section.GetValue<string>(nameof(Title));
        }

        public string Title { get; }
    }
}
