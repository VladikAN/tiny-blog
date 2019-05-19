using Microsoft.Extensions.Configuration;

namespace TinyBlog.Web.Configuration.Settings
{
    public class AuthSettings : IAuthSettings
    {
        private const string SectionName = "Auth";

        public AuthSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection(SectionName);
            Issuer = section.GetValue<string>(nameof(Issuer));
            Audience = section.GetValue<string>(nameof(Audience));
            Secret = section.GetValue<string>(nameof(Secret));
        }

        public string Issuer { get; }
        public string Audience { get; }
        public string Secret { get; }
    }
}
