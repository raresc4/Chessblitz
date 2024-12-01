using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController
    {
        private readonly JwtService _jwtService = null!;

        public TestController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpGet]
        public string test()
        {
            return _jwtService.GenerateJwtToken("rares");
        }

    }
}
