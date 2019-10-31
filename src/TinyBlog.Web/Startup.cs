using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TinyBlog.Web.Configuration;

namespace TinyBlog.Web
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddAppHeathCheck(_configuration)
                .AddServices(_configuration)
                .AddApplicationInsights(_configuration)
                .AddDataProtection(_configuration)
                .AddResponseCompression(options => options.EnableForHttps = true)
                .AddJwtAuthentication(_configuration)
                .AddMvcWithFilters(_configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app
                .UseForwardedHeaders()
                .UseHealthChecks("/health")
                .UseResponseCompression()
                .UseCustomErrorHandling(env)
                .UseStaticFiles()
                .UseAtomFeed()
                .UseAuthentication()
                .UseMvcWithRoutes();
        }
    }
}
