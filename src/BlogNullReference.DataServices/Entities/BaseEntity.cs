﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace BlogNullReference.DataServices.Entities
{
    public abstract class BaseEntity
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("entityId")]
        public ObjectId EntityId { get; set; }
    }
}
