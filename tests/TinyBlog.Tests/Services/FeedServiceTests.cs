using Moq;
using System;
using System.Linq;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.Web.Services;
using Xunit;

namespace TinyBlog.Tests.Services
{
    public class FeedServiceTests
    {
        private readonly Mock<IPostDataService> _postDataService;
        private readonly Mock<ILayoutDataService> _layoutDataService;

        private readonly FeedService _target;

        public FeedServiceTests()
        {
            _postDataService = new Mock<IPostDataService>();
            _layoutDataService = new Mock<ILayoutDataService>();
            _target = new FeedService(_postDataService.Object, _layoutDataService.Object);
        }

        [Fact]
        public async Task Build_GeneralInformation_Present()
        {
            // Arrange
            var layout = BuildLayout();
            _layoutDataService
                .Setup(x => x.Get())
                .ReturnsAsync(layout);
            _postDataService
                .Setup(x => x.GetAll(true))
                .ReturnsAsync([]);

            // Act
            var result = await _target.BuildFeed();
            var feed = result?.Feed;

            // Assert
            Assert.NotNull(feed);
            Assert.Single(feed.Links);
            Assert.Equal(layout.Uri, feed.Links.Single().Uri.AbsoluteUri);

            Assert.Equal(layout.Title, feed.Title.Text);
            Assert.Equal(layout.Description, feed.Description.Text);
            Assert.Equal(layout.Language, feed.Language);

            Assert.Single(feed.Authors);
            Assert.Equal(layout.Author, feed.Authors.Single().Email);

            _layoutDataService.Verify(x => x.Get(), Times.Once);
            _postDataService.Verify(x => x.GetAll(true), Times.Once);
        }

        [Fact]
        public async Task Build_Tags_Present()
        {
            // Arrange
            var layout = BuildLayout();
            var posts = new[]
            {
                new PostDto { Tags = new[] { "t1", "t2" }, PreviewText = "preview", FullText = "full", LinkText = "link-1", PublishedAt = DateTime.UtcNow },
                new PostDto { Tags = new[] { "t2", "t3" }, PreviewText = "preview", FullText = "full", LinkText = "link-1", PublishedAt = DateTime.UtcNow }
            };

            _layoutDataService
                .Setup(x => x.Get())
                .ReturnsAsync(layout);
            _postDataService
                .Setup(x => x.GetAll(true))
                .ReturnsAsync(posts);

            // Act
            var result = await _target.BuildFeed();
            var feed = result?.Feed;

            // Assert
            Assert.NotNull(feed);
            Assert.Equal(3, feed.Categories.Count);
            Assert.Contains(feed.Categories, x => x.Name == "t1");
            Assert.Contains(feed.Categories, x => x.Name == "t2");
            Assert.Contains(feed.Categories, x => x.Name == "t3");

            _layoutDataService.Verify(x => x.Get(), Times.Once);
            _postDataService.Verify(x => x.GetAll(true), Times.Once);
        }
        
        [Fact]
        public async Task Build_Posts_Present()
        {
            // Arrange
            var layout = BuildLayout();
            var posts = new[]
            {
                new PostDto {
                    Title = "post-title",
                    LinkText = "post-link",
                    PreviewText = "post-preview",
                    PublishedAt = DateTime.UtcNow,
                    Tags = []
                }

            };

            _layoutDataService
                .Setup(x => x.Get())
                .ReturnsAsync(layout);
            _postDataService
                .Setup(x => x.GetAll(true))
                .ReturnsAsync(posts);

            // Act
            var result = await _target.BuildFeed();
            var feed = result?.Feed;

            // Assert
            Assert.NotNull(feed);
            Assert.Single(feed.Items);
            var item = feed.Items.Single();

            Assert.Equal(posts[0].Title, item.Title.Text);
            Assert.Single(item.Links);
            Assert.EndsWith(posts[0].LinkText, item.Links.Single().Uri.AbsoluteUri);
            Assert.Equal(posts[0].PublishedAt, item.LastUpdatedTime.UtcDateTime);
            Assert.Equal(posts[0].PublishedAt, item.PublishDate.UtcDateTime);

            _layoutDataService.Verify(x => x.Get(), Times.Once);
            _postDataService.Verify(x => x.GetAll(true), Times.Once);
        }

        private LayoutDto BuildLayout()
        {
            return new LayoutDto(
                "title",
                "description",
                "http://localhost/",
                "author",
                "language",
                "tags",
                "header",
                "footer");
        }
    }
}
