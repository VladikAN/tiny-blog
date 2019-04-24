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
            Description = section.GetValue<string>(nameof(Description));
            Uri = section.GetValue<string>(nameof(Uri));
            Author = section.GetValue<string>(nameof(Author));
            GoogleTagsCode = section.GetValue<string>(nameof(GoogleTagsCode));
        }

        public string Title { get; }
        public string Description { get; }
        public string Uri { get; }
        public string Author { get; }
        public string GoogleTagsCode { get; }
    }
}
