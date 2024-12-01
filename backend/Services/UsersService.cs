using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BCrypt.Net;

namespace backend.Services
{
    using BCrypt.Net;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Net.Http.Headers;
    using System.Net.Http;
    public class UsersService
    {
        private readonly IMongoCollection<User> _usersCollection;

        private readonly JwtService _jwtService;

        public UsersService(IOptions<ChessUsersDatabaseSettings> options, JwtService jwtService)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(options.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<User>(options.Value.ChessCollectionName);

            _jwtService = jwtService;
        }

        public async Task CreateUserAsync(User newUser)
        {
            newUser.Password = BCrypt.HashPassword(newUser.Password);
            await _usersCollection.InsertOneAsync(newUser);
        }

        private async Task<List<User>> VerifyUserAsync(User user)
        {
            var filter = Builders<User>.Filter.Eq("Name", user.Name);
            
            var foundUser = await _usersCollection.Find(filter).ToListAsync();

            return foundUser;
        }

        public async Task<Boolean> LoginUserAsync(User user, HttpContext httpContext)
        {
            var userExists =  await VerifyUserAsync(user);

            if(userExists.Count > 0) {
                var existentUser = userExists.First();
                if(BCrypt.Verify(user.Password, existentUser.Password))
                {
                    httpContext.Response.Cookies.Append("token", _jwtService.GenerateJwtToken(user.Name), new CookieOptions
                    {
                        Expires = DateTimeOffset.UtcNow.AddDays(30), 
                        Path = "/", 
                        HttpOnly = true, 
                        Secure = true 
                    });

                    return true;
                }
                return false;
            }
            return false;
        }

        public async Task<List<User>> GetUsersAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();
    }
}
