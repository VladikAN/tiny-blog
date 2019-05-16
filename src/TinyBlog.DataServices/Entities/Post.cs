using MongoDB.Bson.Serialization.Attributes;
using System;

namespace TinyBlog.DataServices.Entities
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

        [BsonElement("tags")]
        public Tag[] Tags { get; set; }

        [BsonElement("isPublished")]
        public bool IsPublished { get; set; }
    }
}
