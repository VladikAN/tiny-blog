using TinyBlog.DataServices.Repositories;
using TinyBlog.DataServices.Settings;

namespace TinyBlog.DataServices.Services
{
    public abstract class BaseDataService
    {
        protected BaseDataService(IDatabaseSettings settings)
        {
            Repository = new MongoRepository(settings);
        }

        protected MongoRepository Repository { get; }
    }
}
