using Moq;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.Web.Services;

namespace TinyBlog.Tests.Services
{
    [TestFixture]
    public class FeedServiceTests
    {
        private Mock<IPostDataService> _postDataService;
        private Mock<ILayoutDataService> _layoutDataService;

        private FeedService _target;

        [SetUp]
        public void Setup()
        {
            _postDataService = new Mock<IPostDataService>();
            _layoutDataService = new Mock<ILayoutDataService>();
            _target = new FeedService(_postDataService.Object, _layoutDataService.Object);
        }

        [Test]
        public async Task Build_GeneralInformation_Present()
        {
            // Arrange
            var layout = BuildLayout();
            _layoutDataService
                .Setup(x => x.Get())
                .ReturnsAsync(layout);
            _postDataService
                .Setup(x => x.GetAll(true))
                .ReturnsAsync(new PostDto[0]);

            // Act
            var result = await _target.BuildFeed();
            var feed = result?.Feed;

            // Assert
            Assert.IsNotNull(feed);
            Assert.AreEqual(1, feed.Links.Count);
            Assert.AreEqual(layout.Uri, feed.Links.Single().Uri.AbsoluteUri);

            Assert.AreEqual(layout.Title, feed.Title.Text);
            Assert.AreEqual(layout.Description, feed.Description.Text);
            Assert.AreEqual(layout.Language, feed.Language);

            Assert.AreEqual(1, feed.Authors.Count);
            Assert.AreEqual(layout.Author, feed.Authors.Single().Email);

            _layoutDataService.Verify(x => x.Get(), Times.Once);
            _postDataService.Verify(x => x.GetAll(true), Times.Once);
        }

        [Test]
        public async Task Build_Tags_Present()
        {
            // Arrange
            var layout = BuildLayout();
            var posts = new[]
            {
                new PostDto { Tags = new[] { "t1", "t2" }, PublishedAt = DateTime.UtcNow },
                new PostDto { Tags = new[] { "t2", "t3" }, PublishedAt = DateTime.UtcNow }
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
            Assert.IsNotNull(feed);
            Assert.AreEqual(3, feed.Categories.Count);
            Assert.IsTrue(feed.Categories.Any(x => x.Name == "t1"));
            Assert.IsTrue(feed.Categories.Any(x => x.Name == "t2"));
            Assert.IsTrue(feed.Categories.Any(x => x.Name == "t3"));

            _layoutDataService.Verify(x => x.Get(), Times.Once);
            _postDataService.Verify(x => x.GetAll(true), Times.Once);
        }
        
        [Test]
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
                    Tags = new string[0]
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
            Assert.IsNotNull(feed);
            Assert.AreEqual(1, feed.Items.Count());
            var item = feed.Items.Single();

            Assert.AreEqual(posts[0].Title, item.Title.Text);
            Assert.AreEqual(1, item.Links.Count);
            Assert.IsTrue(item.Links.Single().Uri.AbsoluteUri.EndsWith(posts[0].LinkText));
            Assert.AreEqual(posts[0].PublishedAt, item.LastUpdatedTime.UtcDateTime);
            Assert.AreEqual(posts[0].PublishedAt, item.PublishDate.UtcDateTime);

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
