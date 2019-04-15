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
                });

            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddSingleton<IConfiguration>(configuration);

            return services;
        }

        public static IServiceCollection AddMvcWithFilters(this IServiceCollection services)
        {
            services
                .AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            return services;
        }
    }
}
