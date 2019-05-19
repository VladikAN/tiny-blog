using TinyBlog.DataServices.Services;
using TinyBlog.DataServices.Settings;
using TinyBlog.Web.Configuration.Settings;
using TinyBlog.Web.Filters;
using TinyBlog.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TinyBlog.Web.Configuration
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
            services.AddTransient<IUserDataSerice, UserDataService>();

            /* Web Services */
            services.AddTransient<IFeedService, FeedService>();
            services.AddTransient<IAuthService, AuthService>();

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

        public static IServiceCollection AddApplicationInsights(this IServiceCollection services, IConfiguration configuration)
        {
            var settings = new ApplicationInsightsSettings(configuration);
            if (settings.Enabled)
            {
                services
                    .AddApplicationInsightsTelemetry(settings.Key);
            }

            return services;
        }
    }
}
