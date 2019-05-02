using MongoDB.Bson.Serialization.Attributes;

namespace TinyBlog.DataServices.Entities
{
    public class Tag : BaseEntity
    {
        [BsonElement("name")]
        public string Name { get; set; }
    }
}
