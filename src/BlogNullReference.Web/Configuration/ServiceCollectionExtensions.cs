using BlogNullReference.DataServices.Services;
using BlogNullReference.DataServices.Settings;
using BlogNullReference.Web.Configuration.Settings;
using BlogNullReference.Web.Filters;
using BlogNullReference.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BlogNullReference.Web.Configuration
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureForwardedHeaders(this IServiceCollection services)
        {
            services
                .Configure<ForwardedHeadersOptions>(options =>
                {
                    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                    options.KnownNetworks.Clear();
                    options.KnownProxies.Clear();
                });

            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            /* Common */
            services
                .AddSingleton(configuration)
                .AddSingleton<ISiteSettings, SiteSettings>();

            /* Data Services */
            services.AddSingleton<IDatabaseSettings, DatabaseSettings>();
            services.AddTransient<IPostDataService, PostDataService>();

            /* Web Services */
            services.AddTransient<IFeedService, FeedService>();

            return services;
        }

        public static IServiceCollection AddMvcWithFilters(this IServiceCollection services)
        {
            services
                .AddMvc(options =>
                {
                    options.Filters.Add<SiteSettingsFilter>();
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            return services;
        }
    }
}
