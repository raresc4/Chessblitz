using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController
    {
        [HttpGet]
        public string test()
        {
            return "test";
        }

    }
}
