using backend_cube_solo.Api.Admins.DTOs;

namespace backend_cube_solo.Api.Admins.Services
{
    public interface IAdminService
    {
        Task Register(RegisterDto registerDto);
        Task<string> Login(LoginDto loginDto);
        Task Delete(int id);
    }
}
