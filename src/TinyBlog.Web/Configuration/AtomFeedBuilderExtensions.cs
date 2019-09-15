using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text;
using System.Xml;
using TinyBlog.Web.Services;

namespace TinyBlog.Web.Configuration
{
    public static class AtomFeedBuilderExtensions
    {
        public static IApplicationBuilder UseAtomFeed(this IApplicationBuilder app)
        {
            app.Map("/feed.atom", builder =>
            {
                builder.Run(async context =>
                {
                    var service = builder.ApplicationServices.GetService(typeof(IFeedService)) as IFeedService;
                    var feed = await service.BuildFeed();

                    using (var sw = new Utf8StringWriter())
                    {
                        var settings = new XmlWriterSettings
                        {
                            Encoding = Encoding.UTF8,
                            OmitXmlDeclaration = false,
                            Indent = true
                        };

                        using (var xw = XmlWriter.Create(sw, settings))
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

        private class Utf8StringWriter : StringWriter
        {
            public override Encoding Encoding => new UTF8Encoding(false);
        }
    }
}
