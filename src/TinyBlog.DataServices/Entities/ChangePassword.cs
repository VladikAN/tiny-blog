using MongoDB.Bson.Serialization.Attributes;

namespace TinyBlog.DataServices.Entities
{
    [BsonIgnoreExtraElements]
    public class ChangePassword
    {
        [BsonElement("token")]
        public string Token { get; set; }
    }
}