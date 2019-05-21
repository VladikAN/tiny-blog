﻿using MongoDB.Bson.Serialization.Attributes;

namespace TinyBlog.DataServices.Entities
{
    public class User : BaseEntity
    {
        [BsonElement("userName")]
        public string UserName { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; }

        [BsonElement("passwordSalt")]
        public string PasswordSalt { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; }
    }
}