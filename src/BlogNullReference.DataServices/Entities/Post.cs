using MongoDB.Bson.Serialization.Attributes;
using System;

namespace BlogNullReference.DataServices.Entities
{
    public class Post : BaseEntity
    {
        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("preview_text")]
        public string PreviewText { get; set; }

        [BsonElement("full_text")]
        public string FullText { get; set; }

        [BsonElement("published_at")]
        public DateTime PublishedAt { get; set; }

        [BsonElement("publish_at")]
        public DateTime? PublishAt { get; set; }

        [BsonElement("tags")]
        public Tag[] Tags { get; set; }
    }
}
