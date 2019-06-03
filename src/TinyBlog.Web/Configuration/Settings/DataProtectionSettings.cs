using Microsoft.Extensions.Configuration;
using System;

namespace TinyBlog.Web.Configuration.Settings
{
    public class DataProtectionSettings : IDataProtectionSettings
    {
        private const string SectionName = "DataProtection";

        public DataProtectionSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection(SectionName);
            Enabled = section.GetValue<bool>(nameof(Enabled));
            if (Enabled)
            {
                BlobUriWithSas = new Uri(
                    section.GetValue<string>(nameof(BlobUriWithSas)),
                    UriKind.Absolute);
            }
        }

        public bool Enabled { get; }
        public Uri BlobUriWithSas { get; }
    }
}