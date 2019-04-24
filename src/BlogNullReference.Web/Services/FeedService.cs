using BlogNullReference.DataServices.Services;
using BlogNullReference.Web.Configuration.Settings;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;

namespace BlogNullReference.Web.Services
{
    // https://docs.microsoft.com/en-us/dotnet/framework/wcf/feature-details/how-to-create-a-basic-atom-feed
    public class FeedService : IFeedService
    {
        private IPostDataService _postDataService;
        private ISiteSettings _siteSettings;

        public FeedService(IPostDataService postDataService)
        {
            _postDataService = postDataService;
        }

        public async Task<string> BuildFeed()
        {
            var posts = await _postDataService.GetAll();

            var feed = new SyndicationFeed();

            return null;
        }
    }
}
