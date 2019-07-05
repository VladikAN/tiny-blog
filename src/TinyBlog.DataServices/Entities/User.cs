using MongoDB.Bson.Serialization.Attributes;

namespace TinyBlog.DataServices.Entities
{
    public class User : BaseEntity
    {
        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; }

        [BsonElement("passwordSalt")]
        public string PasswordSalt { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; }

        [BsonElement("isSuper"), BsonDefaultValue(false)]
        public bool IsSuper { get; set; }

        [BsonElement("changePassword")]
        public ChangePassword ChangePassword { get; set; }
    }
}
