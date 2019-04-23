using Microsoft.Azure.KeyVault.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;

namespace BlogNullReference.Web.Configuration.Settings
{
    public class KeyVaultManager : IKeyVaultSecretManager
    {
        private readonly string _prefix;

        public KeyVaultManager(string prefix)
        {
            _prefix = prefix;
        }

        public string GetKey(SecretBundle secret)
        {
            var key = secret.SecretIdentifier.Name
                .Replace("--", ConfigurationPath.KeyDelimiter)
                .Substring(_prefix.Length);

            return key;
        }

        public bool Load(SecretItem secret)
        {
            var identity = secret.Identifier.Name
                .Replace("--", ConfigurationPath.KeyDelimiter)
                .Replace("-", "_");

            return identity.StartsWith(_prefix);
        }
    }
}
