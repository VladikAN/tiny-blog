using Microsoft.Extensions.Configuration;

namespace BlogNullReference.Web.Configuration.Settings
{
    public class KeyVaultSettings : IKeyVaultSettings
    {
        private const string SectionName = "KeyVault";

        public KeyVaultSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection(SectionName);
            Enabled = section.GetValue<bool>(nameof(Enabled));
            Vault = section.GetValue<string>(nameof(Vault));
            ClientId = section.GetValue<string>(nameof(ClientId));
            ClientSecret = section.GetValue<string>(nameof(ClientSecret));
        }

        public bool Enabled { get; }
        public string Vault { get; }
        public string ClientId { get; }
        public string ClientSecret { get; }
    }
}