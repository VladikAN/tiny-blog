﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;
using Markdig;
using TinyBlog.DataServices.Services;

namespace TinyBlog.Web.Services
{
    public class FeedService : IFeedService
    {
        private readonly IPostDataService _postDataService;
        private readonly ILayoutDataService _layoutDataService;
        private readonly MarkdownPipeline _pipeline;

        public FeedService(
            IPostDataService postDataService,
            ILayoutDataService siteSettings)
        {
            _postDataService = postDataService;
            _layoutDataService = siteSettings;
            
            _pipeline = new MarkdownPipelineBuilder()
                .UseAdvancedExtensions()
                .Build();
        }

        public async Task<Atom10FeedFormatter> BuildFeed()
        {
            var postsTask = _postDataService.GetAll(true);
            var layoutTask = _layoutDataService.Get();
            await Task.WhenAll(postsTask, layoutTask);
            var posts = await postsTask;
            var layout = await layoutTask;

            var baseUri = new Uri(layout.Uri, UriKind.Absolute);
            var feed = new SyndicationFeed(layout.Title, layout.Description, baseUri);
            feed.Language = layout.Language;
            feed.Authors.Add(new SyndicationPerson(layout.Author));

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
                item.PublishDate = post.PublishedAt;
                items.Add(item);
            }

            feed.Items = items;
            return new Atom10FeedFormatter(feed);
        }

        private string RenderText(string markdown)
        {
            return Markdown.ToHtml(markdown, _pipeline);
        }
    }
}
