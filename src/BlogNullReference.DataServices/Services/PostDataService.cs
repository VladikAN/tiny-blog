using BlogNullReference.DataServices.Entities;
using BlogNullReference.DataServices.Settings;

namespace BlogNullReference.DataServices.Services
{
    public class PostDataService : BaseDataService<Post>
    {
        public PostDataService(IDatabaseSettings databaseSettings) : base(databaseSettings)
        {
        }
    }
}