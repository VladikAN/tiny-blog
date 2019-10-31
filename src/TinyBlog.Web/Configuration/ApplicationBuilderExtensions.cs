using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace TinyBlog.Web.Configuration
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCustomErrorHandling(this IApplicationBuilder app, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseStatusCodePages(context =>
                {
                    var headers = context.HttpContext.Request.Headers;
                    if (headers.ContainsKey("X-Requested-With")
                        && headers["X-Requested-With"].ToString().Equals("XMLHttpRequest", StringComparison.OrdinalIgnoreCase))
                    {
                        return Task.CompletedTask;
                    }

                    var statusCode = context.HttpContext.Response.StatusCode;
                    context.HttpContext.Response.Redirect($"/Error/{statusCode}");
                    return Task.CompletedTask;
                });
                app.UseHsts();
            }

            return app;
        }

        public static IApplicationBuilder UseMvcWithRoutes(this IApplicationBuilder app)
        {
            app
                .UseMvc(routes =>
                {
                    routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}");
                });

            return app;
        }
    }
}
