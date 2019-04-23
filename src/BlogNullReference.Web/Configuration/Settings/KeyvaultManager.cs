using Microsoft.Azure.KeyVault.Models;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using System;

namespace BlogNullReference.Web.Configuration.Settings
{
    public class KeyVaultManager : IKeyVaultSecretManager
    {
        public string GetKey(SecretBundle secret)
        {
            throw new NotImplementedException();
        }

        public bool Load(SecretItem secret)
        {
            throw new NotImplementedException();
        }
    }
}
