using System.Threading.Tasks;

namespace BlogNullReference.Web.Services
{
    public interface IFeedService
    {
        Task<string> BuildFeed();
    }
}
