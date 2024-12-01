using backend.Services;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService) {
            _usersService = usersService;
        } 

        [HttpGet]
        [Route("getUsers")]
        public async Task<List<User>> Get() =>
            await _usersService.GetUsersAsync();

        [HttpPost]
        [Route("registerUser")]
        public async Task<IActionResult> RegisterUser(User newUser)
        {
            await _usersService.CreateUserAsync(newUser);

            return CreatedAtAction(nameof(Get), new { id =  newUser.Id }, newUser);
        }

        [HttpPost]
        [Route("loginUser")]
        public async Task<IActionResult> LoginUser(User user)
        {
            var res = await _usersService.LoginUserAsync(user, HttpContext);

            if (res)
            {
                return Ok(new { message = "Login Successful"});
            }
            return Unauthorized(new { message = "Invalid Credentials" });
        }
    }
}
