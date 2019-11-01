using System;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TinyBlog.DataServices.Services;
using TinyBlog.DataServices.Settings;
using TinyBlog.Web.Configuration.Settings;
using TinyBlog.Web.Filters;
using TinyBlog.Web.Services;

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

        public static IServiceCollection AddAppHeathCheck(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetValue<string>("ConnectionStrings:Blog");
            var databaseName = connectionString
                ?.Split("/", StringSplitOptions.RemoveEmptyEntries).LastOrDefault()
                ?.Split("?", StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();
            
            return services
                .AddHealthChecks()
                .AddMongoDb(connectionString, databaseName, name: "database-health-check")
                .Services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            /* Common */
            services
                .AddSingleton(configuration)
                .AddSingleton<ISiteSettings, SiteSettings>()
                .AddSingleton<IAuthSettings, AuthSettings>()
                .AddSingleton<ISmtpSettings, SmtpSettings>();

            /* Data Services */
            services
                .AddSingleton<IDatabaseSettings, DatabaseSettings>()
                .AddTransient<IPostDataService, PostDataService>()
                .AddTransient<IUserDataService, UserDataService>()
                .AddTransient<ILayoutDataService, LayoutDataService>();

            /* Web Services */
            services
                .AddTransient<IFeedService, FeedService>()
                .AddTransient<IAuthService, AuthService>()
                .AddTransient<IEmailService, EmailService>();

            return services;
        }

        public static IServiceCollection AddMvcWithFilters(this IServiceCollection services, IConfiguration configuration)
        {
            var siteSettings = new SiteSettings(configuration);
            services
                .AddControllersWithViews(options =>
                {
                    options.Filters.Add<SiteSettingsFilter>();

                    var defaultCacheProfile = new CacheProfile { Location = ResponseCacheLocation.Any, Duration = siteSettings.DefaultCacheDuration, NoStore = siteSettings.DefaultCacheDuration <= 0 };
                    options.CacheProfiles.Add("Default", defaultCacheProfile);
                });

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

        public static IServiceCollection AddDataProtection(this IServiceCollection services, IConfiguration configuration)
        {
            var protectionSettings = new DataProtectionSettings(configuration);
            if (protectionSettings.Enabled)
            {
                var protection = services
                    .AddDataProtection()
                    .PersistKeysToAzureBlobStorage(protectionSettings.BlobUriWithSas);

                var vaultSettings = new KeyVaultSettings(configuration);
                if (vaultSettings.Enabled)
                {
                    protection.ProtectKeysWithAzureKeyVault(
                        protectionSettings.VaultKeyIdentifier,
                        vaultSettings.ClientId,
                        vaultSettings.ClientSecret);
                }

                return protection.Services;
            }

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var authSettings = new AuthSettings(configuration);
            var key = Encoding.UTF8.GetBytes(authSettings.Secret);
            IdentityModelEventSource.ShowPII = true;
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = authSettings.Issuer,
                    ValidateAudience = true,
                    ValidAudience = authSettings.Audience
                };
            });

            return services;
        }
    }
}
