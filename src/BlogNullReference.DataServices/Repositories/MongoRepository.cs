﻿using BlogNullReference.DataServices.Entities;
using BlogNullReference.DataServices.Settings;
using MongoDB.Driver;

namespace BlogNullReference.DataServices.Repositories
{
    public class MongoRepository
    {
        protected IMongoClient Client;
        protected IMongoDatabase Database;

        public MongoRepository(IDatabaseSettings settings)
        {
            var connection = new MongoUrl(settings.ConnectionString);
            Client = new MongoClient(connection);
            Database = Client.GetDatabase(connection.DatabaseName);
        }

        public IMongoCollection<TEntity> GetCollection<TEntity>(string collection) where TEntity : BaseEntity
        {
            return Database.GetCollection<TEntity>(collection);
        }
    }
}