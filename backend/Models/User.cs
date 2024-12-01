using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System.Text.Json.Serialization;

namespace backend.Models
{
    using BCrypt.Net;

    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Name")]
        [JsonPropertyName("Name")]
        public string Name { get; set; } = null!;

        private string _password = null!;
        public string Password { get => _password;
            set => _password = BCrypt.HashPassword(value, BCrypt.GenerateSalt()); }

        public string? Token { get; set; }
    }
}
