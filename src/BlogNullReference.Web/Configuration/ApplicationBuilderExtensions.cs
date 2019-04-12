using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace BlogNullReference.Web.Configuration
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
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            return app;
        }

        public static IApplicationBuilder UseMvcWithRoutes(this IApplicationBuilder app)
        {
            app
                .UseMvc(routes => { routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}"); });

            return app;
        }
    }
}
