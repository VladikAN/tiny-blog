using MongoDB.Bson.Serialization.Attributes;
using System;

namespace BlogNullReference.DataServices.Entities
{
    public class Post : BaseEntity
    {
        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("linkText")]
        public string LinkText { get; set; }

        [BsonElement("previewText")]
        public string PreviewText { get; set; }

        [BsonElement("fullText")]
        public string FullText { get; set; }

        [BsonElement("publishedAt")]
        public DateTime PublishedAt { get; set; }

        [BsonElement("publishAt")]
        public DateTime? PublishAt { get; set; }

        [BsonElement("tags")]
        public Tag[] Tags { get; set; }
    }
}
