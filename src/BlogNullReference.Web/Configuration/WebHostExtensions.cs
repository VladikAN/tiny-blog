using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace BlogNullReference.Web.Configuration
{
    public static class WebHostExtensions
    {
        public static IWebHostBuilder UseCustomConfiguration(this IWebHostBuilder host)
        {
            host.ConfigureAppConfiguration((hostingContext, config) =>
            {
                config
                    .AddJsonFile("appsettings.json", optional: false)
                    .AddEnvironmentVariables("BNR_WEB_");
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
