using MarkdownSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;

namespace TinyBlog.Web.Services
{
    public class FeedService : IFeedService
    {
        private static Markdown MarkdownTransformer = new Markdown();

        private IPostDataService _postDataService;
        private ILayoutDataService _layoutDataService;

        public FeedService(
            IPostDataService postDataService,
            ILayoutDataService siteSettings)
        {
            _postDataService = postDataService;
            _layoutDataService = siteSettings;
        }

        public async Task<Atom10FeedFormatter> BuildFeed()
        {
            var postsTask = _postDataService.GetAll();
            var layoutTask = _layoutDataService.Get();
            await Task.WhenAll(postsTask, layoutTask);
            var posts = await postsTask;
            var layout = await layoutTask;

            var baseUri = new Uri(layout.Uri, UriKind.Absolute);
            var feed = new SyndicationFeed(layout.Title, layout.Description, baseUri);
            feed.Language = layout.Language;
            feed.Authors.Add(new SyndicationPerson(layout.Author));
            feed.Description = new TextSyndicationContent(layout.Description);

            // Tags
            var tags = posts
                .SelectMany(pst => pst.Tags)
                .Where(tg => !string.IsNullOrWhiteSpace(tg))
                .Distinct();
            foreach (var tag in tags)
            {
                feed.Categories.Add(new SyndicationCategory(tag));
            }

            // Posts
            var items = new List<SyndicationItem>();
            foreach (var post in posts)
            {
                var item = new SyndicationItem(
                    post.Title,
                    RenderText(post.PreviewText),
                    new Uri(baseUri, $"post/{post.LinkText}"),
                    post.LinkText,
                    post.PublishedAt);
                items.Add(item);
            }

            feed.Items = items;
            return new Atom10FeedFormatter(feed);
        }

        private string RenderText(string markdown)
        {
            var html = MarkdownTransformer.Transform(markdown);
            return html;
        }
    }
}
