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
            GoogleTagsCode = section.GetValue<string>(nameof(GoogleTagsCode));
        }

        public string Title { get; }
        public string GoogleTagsCode { get; }
    }
}
