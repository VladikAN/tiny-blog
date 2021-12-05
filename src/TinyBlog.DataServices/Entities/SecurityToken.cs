using MongoDB.Bson.Serialization.Attributes;
using System;

namespace TinyBlog.DataServices.Entities
{
    [BsonIgnoreExtraElements]
    public class SecurityToken
    {
        [BsonElement("token")]
        public string Token { get; set; }

        [BsonElement("expires")]
        public DateTime Expires { get; set; }
    }
}
