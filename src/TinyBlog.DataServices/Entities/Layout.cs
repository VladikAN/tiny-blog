using MongoDB.Bson.Serialization.Attributes;

namespace TinyBlog.DataServices.Entities
{
    public class Layout : BaseEntity
    {
        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("uri")]
        public string Uri { get; set; }

        [BsonElement("author")]
        public string Author { get; set; }

        [BsonElement("language")]
        public string Language { get; set; }

        [BsonElement("googleTagsCode")]
        public string GoogleTagsCode { get; set; }

        [BsonElement("footerContent")]
        public string FooterContent { get; set; }
    }
}