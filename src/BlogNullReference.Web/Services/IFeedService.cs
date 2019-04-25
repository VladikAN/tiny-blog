using System.ServiceModel.Syndication;
using System.Threading.Tasks;

namespace BlogNullReference.Web.Services
{
    public interface IFeedService
    {
        Task<Atom10FeedFormatter> BuildFeed();
    }
}
