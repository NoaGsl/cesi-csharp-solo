using backend_cube_solo.Api.Admins.DTOs;
using backend_cube_solo.Api.Admins.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_cube_solo.Api.Admins.Controllers
{
    [ApiController]
    [Route("admins")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            await _adminService.Register(registerDto);
            return Created();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            string token = await _adminService.Login(loginDto);
            return Ok(new {token});
        }

        [Authorize]
        [HttpDelete("{employee_id}")]
        public async Task<IActionResult> Delete(int employee_id)
        {
            await _adminService.Delete(employee_id);
            return NoContent();
        }

    }
}
