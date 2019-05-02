using BlogNullReference.Web.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BlogNullReference.Web
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
                .UseMvcWithRoutes();
        }
    }
}
