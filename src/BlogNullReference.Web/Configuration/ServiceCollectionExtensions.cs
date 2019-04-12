using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace BlogNullReference.Web.Configuration
{
    public static class ServiceCollectionExtensions
    {
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
