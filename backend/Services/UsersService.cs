using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BCrypt.Net;

namespace backend.Services
{
    public class UsersService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UsersService(IOptions<ChessUsersDatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(options.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<User>(options.Value.ChessCollectionName);
        }

        public async Task CreateUserAsync(User newUser)
        {
            await _usersCollection.InsertOneAsync(newUser);
        }

        public async Task<List<User>> VerifyUserAsync(User user)
        {
            var filter = Builders<User>.Filter.Eq("Name", user.Name);
            
            var foundUser = await _usersCollection.Find(filter).ToListAsync();

            return foundUser;
        }

        public async Task<Boolean> LoginUserAsync(User user)
        {
            var userExists =  await VerifyUserAsync(user);

            if(userExists.Count > 0) { return true; }
            return false;
        }

        public async Task<List<User>> GetUsersAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();
    }
}
