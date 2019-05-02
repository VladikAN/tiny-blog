using TinyBlog.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Xml;

namespace TinyBlog.Web.Configuration
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCustomErrorHandling(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error"); //TODO!!
                app.UseHsts();
            }

            return app;
        }

        public static IApplicationBuilder UseAtomFeed(this IApplicationBuilder app)
        {
            app.Map("/feed.atom", builder =>
            {
                builder.Run(async context =>
                {
                    var service = builder.ApplicationServices.GetService(typeof(IFeedService)) as IFeedService;
                    var feed = await service.BuildFeed();

                    using (var sw = new StringWriter())
                    {
                        using (var xw = XmlWriter.Create(sw))
                        {
                            feed.WriteTo(xw);
                        }

                        context.Response.Headers["content-type"] = "application/atom+xml;charset=utf-8";
                        await context.Response.WriteAsync(sw.ToString());
                    }
                });
            });

            return app;
        }

        public static IApplicationBuilder UseMvcWithRoutes(this IApplicationBuilder app)
        {
            app
                .UseMvc(routes => { routes.MapRoute("default", "{controller=Post}/{action=Index}/{id?}"); });

            return app;
        }
    }
}
