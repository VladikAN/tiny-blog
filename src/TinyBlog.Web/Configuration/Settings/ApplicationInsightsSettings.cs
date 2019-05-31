using Microsoft.Extensions.Configuration;

namespace TinyBlog.Web.Configuration.Settings
{
    public class ApplicationInsightsSettings : IApplicationInsightsSettings
    {
        private const string SectionName = "ApplicationInsights";

        public ApplicationInsightsSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection(SectionName);
            Enabled = section.GetValue<bool>(nameof(Enabled));
            Key = section.GetValue<string>(nameof(Key));
        }

        public bool Enabled { get; }
        public string Key { get; }
    }
}
