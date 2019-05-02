using System.ServiceModel.Syndication;
using System.Threading.Tasks;

namespace TinyBlog.Web.Services
{
    public interface IFeedService
    {
        Task<Atom10FeedFormatter> BuildFeed();
    }
}
