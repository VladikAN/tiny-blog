using Microsoft.Extensions.Configuration;

namespace BlogNullReference.Web.Configuration.Settings
{
    public class SiteSettings : ISiteSettings
    {
        private const string SectionName = "SiteSettings";

        public SiteSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection(SectionName);
            Title = section.GetValue<string>(nameof(Title));
        }

        public string Title { get; }
    }
}
