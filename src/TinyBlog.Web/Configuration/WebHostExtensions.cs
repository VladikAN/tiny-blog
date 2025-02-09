using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace TinyBlog.Web.Configuration
{
    public static class WebHostExtensions
    {
        private const string ConfigPrefix = "WEB_";

        public static IWebHostBuilder UseCustomConfiguration(this IWebHostBuilder host)
        {
            host.ConfigureAppConfiguration((hostingContext, config) =>
            {
                config
                    .AddJsonFile("appsettings.json", optional: false)
                    .AddEnvironmentVariables(ConfigPrefix);
            });

            return host;
        }
    }
}
