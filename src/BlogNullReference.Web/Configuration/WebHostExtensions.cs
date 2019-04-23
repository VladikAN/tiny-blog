using BlogNullReference.Web.Configuration.Settings;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace BlogNullReference.Web.Configuration
{
    public static class WebHostExtensions
    {
        private const string ConfigPrefix = "BNR_WEB_";

        public static IWebHostBuilder UseCustomConfiguration(this IWebHostBuilder host)
        {
            host.ConfigureAppConfiguration((hostingContext, config) =>
            {
                config
                    .AddJsonFile("appsettings.json", optional: false)
                    .AddEnvironmentVariables(ConfigPrefix);

                var tmpConfig = config.Build();
                var keyVault = new KeyVaultSettings(tmpConfig);
                if (keyVault.Enabled)
                {
                    config
                        .AddAzureKeyVault(
                            keyVault.Vault,
                            keyVault.ClientId,
                            keyVault.ClientSecret,
                            new KeyVaultManager());
                }
            });

            return host;
        }

        public static IWebHostBuilder UseCustomSerilog(this IWebHostBuilder host)
        {
            host.UseSerilog((context, loggerConfiguration) =>
            {
                loggerConfiguration
                    .ReadFrom.Configuration(context.Configuration);
            });

            return host;
        }
    }
}
