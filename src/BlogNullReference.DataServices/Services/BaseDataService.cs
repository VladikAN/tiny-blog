using BlogNullReference.DataServices.Entities;
using BlogNullReference.DataServices.Settings;
using MongoDB.Driver;

namespace BlogNullReference.DataServices.Services
{
    public abstract class BaseDataService<TEntity> where TEntity : BaseEntity
    {
        private const string DatabaseName = "blog";
        protected IMongoClient Client;
        protected IMongoDatabase Database;

        protected BaseDataService(IDatabaseSettings settings)
        {
            Client = new MongoClient(settings.ConnectionString);
            Database = Client.GetDatabase(DatabaseName);
        }
    }
}