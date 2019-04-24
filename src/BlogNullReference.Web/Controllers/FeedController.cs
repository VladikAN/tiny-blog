using BlogNullReference.Web.Services;
using System.Threading.Tasks;

namespace BlogNullReference.Web.Controllers
{
    public class FeedController : BaseController
    {
        private readonly IFeedService _feedService;

        public FeedController(IFeedService feedService)
        {
            _feedService = feedService;
        }

        public Task<string> Index()
        {
            return _feedService.BuildFeed();
        }
    }
}
