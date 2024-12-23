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
    using System.IdentityModel.Tokens.Jwt;
    using System.Net.Http;
    using System.Security.Claims;

    public class UsersService
    {
        private readonly IMongoCollection<User> _usersCollection;

        private readonly JwtService _jwtService;

        private readonly IHttpContextAccessor _httpcontextAccessor;

        public UsersService(IOptions<ChessUsersDatabaseSettings> options, JwtService jwtService, IHttpContextAccessor httpcontextAccessor)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(options.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<User>(options.Value.ChessCollectionName);

            _jwtService = jwtService;

            _httpcontextAccessor = httpcontextAccessor;
        }

        private async Task<List<User>> VerifyUserAsync(User user)
        {
            var filter = Builders<User>.Filter.Eq("Name", user.Name);
            
            var foundUser = await _usersCollection.Find(filter).ToListAsync();

            return foundUser;
        }

        public async Task<Boolean> CreateUserAsync(User newUser)
        {
            var userExists = await VerifyUserAsync(newUser);
            if(userExists.Count  > 0)
            {
                return false;
            }
            newUser.Password = BCrypt.HashPassword(newUser.Password);
            await _usersCollection.InsertOneAsync(newUser);
            return true;
        }


        public async Task<int> LoginUserAsync(User user)
        {
            var userExists =  await VerifyUserAsync(user);

            if (_httpcontextAccessor.HttpContext == null)
            {
                throw new InvalidOperationException("HttpContext is not available. Ensure this method is called within an HTTP request.");
            }

            var httpContext = _httpcontextAccessor.HttpContext;

            if(userExists.Count > 0) {
                var existentUser = userExists.First();
                if(BCrypt.Verify(user.Password, existentUser.Password))
                {
                    httpContext.Response.Cookies.Append("token", _jwtService.GenerateJwtToken(user.Name), new CookieOptions
                    {
                        Expires = DateTimeOffset.UtcNow.AddDays(30), 
                        Path = "/", 
                        HttpOnly = true,
                        Secure = true,
                    });

                    return 200;
                }
                return 400;
            }
            return 404;
        }
        
        public Boolean DeleteCookie(string key)
        {
            if(_httpcontextAccessor.HttpContext == null)
            {
                throw new Exception("The HttpContext is null");
            }

           try {
                _httpcontextAccessor.HttpContext.Response.Cookies.Delete(key);
            } catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            } 
            return true;
        }

        public String GetLoggedUsername()
        {
            if(_httpcontextAccessor.HttpContext == null)
            {
                throw new Exception("The HttpContext is null");
            }

            try
            {
                var jwt = _httpcontextAccessor.HttpContext.Request.Cookies["token"];
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(jwt);

                var username = token.Claims
                                        .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                                         ?.Value;

                if (string.IsNullOrEmpty(username))
                {
                    throw new Exception("Username not found in token claims.");
                }

                return username;
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }

        public async Task<List<User>> GetUsersAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();
    }
}
