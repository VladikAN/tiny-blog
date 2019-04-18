using BlogNullReference.DataServices.Repositories;
using BlogNullReference.DataServices.Settings;

namespace BlogNullReference.DataServices.Services
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
