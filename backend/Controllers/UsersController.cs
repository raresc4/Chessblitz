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
            var res = await _usersService.CreateUserAsync(newUser);

            return Ok(res);
        }

        [HttpPost]
        [Route("loginUser")]
        public async Task<IActionResult> LoginUser(User user)
        {
            var res = await _usersService.LoginUserAsync(user);

            return Ok(res.ToString());
        }

        [HttpDelete]
        [Route("deleteCookie")]
        public IActionResult DeleteCookie(
            [FromQuery(Name = "key")] string key
            )
        {
            var res = _usersService.DeleteCookie(key);

            return Ok(res);
        }

        [HttpGet]
        [Route("getLoggedUsername")]
        public IActionResult GetLoggedUsername()
        {
            var res = _usersService.GetLoggedUsername();

            if(res == null)
            {
                return Ok(false);
            }

            return Ok(new { res });
        }
    }
}
