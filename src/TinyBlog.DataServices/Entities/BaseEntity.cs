using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace TinyBlog.DataServices.Entities
{
    [BsonIgnoreExtraElements]
    public abstract class BaseEntity
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        public ObjectId EntityId { get; set; }
    }
}
