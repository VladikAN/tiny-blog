using TinyBlog.Web.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TinyBlog.Web
{
    public class Startup
    {
        private IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddServices(_configuration)
                .AddApplicationInsights(_configuration)
                .AddResponseCompression(options => options.EnableForHttps = true)
                .AddJwtAuthentication(_configuration)
                .AddMvcWithFilters();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app
                .UseForwardedHeaders()
                .UseResponseCompression()
                .UseCustomErrorHandling(env)
                .UseStaticFiles()
                .UseAtomFeed()
                .UseAuthentication()
                .UseMvcWithRoutes();
        }
    }
}
