using TinyBlog.DataServices.Services;
using TinyBlog.Web.Configuration.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;

namespace TinyBlog.Web.Services
{
    public class FeedService : IFeedService
    {
        private IPostDataService _postDataService;
        private ISiteSettings _siteSettings;

        public FeedService(
            IPostDataService postDataService,
            ISiteSettings siteSettings)
        {
            _postDataService = postDataService;
            _siteSettings = siteSettings;
        }

        public async Task<Atom10FeedFormatter> BuildFeed()
        {
            var posts = await _postDataService.GetAll();

            var baseUri = new Uri(_siteSettings.Uri, UriKind.Absolute);
            var feed = new SyndicationFeed(_siteSettings.Title, _siteSettings.Description, baseUri);
            feed.Language = _siteSettings.Language;
            feed.Authors.Add(new SyndicationPerson(_siteSettings.Author));
            feed.Description = new TextSyndicationContent(_siteSettings.Description);

            // Tags
            var tags = posts
                .SelectMany(pst => pst.Tags)
                .Where(tg => tg != null)
                .Select(tg => tg.Name)
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
                    post.PreviewText,
                    new Uri(baseUri, post.LinkText),
                    post.LinkText,
                    post.PublishedAt);
                items.Add(item);
            }

            feed.Items = items;
            return new Atom10FeedFormatter(feed);
        }
    }
}
