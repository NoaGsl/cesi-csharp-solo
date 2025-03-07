using backend_cube_solo.Api.Admins.DTOs;
using backend_cube_solo.Api.Admins.Models;
using backend_cube_solo.Api.Admins.Repositories;
using backend_cube_solo.Api.Employees.DTOs;
using backend_cube_solo.Api.Employees.Models;
using backend_cube_solo.Api.Employees.Repositories;
using backend_cube_solo.Shared.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend_cube_solo.Api.Admins.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public AdminService(IAdminRepository adminRepository, IEmployeeRepository employeeRepository)
        {
            _adminRepository = adminRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task Register(RegisterDto registerDto)
        {
            Employee existingEmployee = await _employeeRepository.GetByEmailAsync(registerDto.Email);

            if (existingEmployee.IsAdmin == false)
            {
                throw new Exception("Employee is not an admin");
            }

            if (await _adminRepository.AnyAsync(a => a.EmployeeId == existingEmployee.EmployeeId))
            {
                throw new Exception("Admin already exists");
            }

            string hashedPassword = PasswordUtils.HashPassword(registerDto.Password, out var salt);

            Admin admin = new()
            {
                PasswordHash = hashedPassword,
                Salt = Convert.ToBase64String(salt),
                EmployeeId = existingEmployee.EmployeeId
            };

            var addedAdmin = await _adminRepository.AddAsync(admin) ?? throw new Exception("Failed to register admin");
        }

        public async Task<string> Login(LoginDto loginDto)
        {
            Admin admin = await _adminRepository.FirstOrDefaultAsync(a => a.Employee.Email == loginDto.Email) ?? throw new Exception("Admin not found");

            var passwordValid = PasswordUtils.VerifyPassword(
                loginDto.Password,
                admin.PasswordHash,
                Convert.FromBase64String(admin.Salt)
            );

            if (!passwordValid)
            {
                throw new Exception("Invalid password");
            }

            // Faire une liste de Claims 
            List<Claim> claims = new List<Claim>
            {
                new(ClaimTypes.Role, "Admin"),
                new("AdminID", admin.AdminId.ToString()),
            };

            // Signer le token de connexion JWT
            var key = Environment.GetEnvironmentVariable("JWT_SECRET")
                      ?? throw new KeyNotFoundException("JWT_SECRET");
            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                SecurityAlgorithms.HmacSha256);

            // On créer un objet de token à partir de la clé de sécurité et l'on y ajoute une expiration, une audience et un issuer de sorte à pouvoir cibler nos clients d'API et éviter les tokens qui trainent trop longtemps dans la nature
            JwtSecurityToken jwt = new JwtSecurityToken(
                claims: claims,
                issuer: "Issuer",
                audience: "Audience",
                signingCredentials: signingCredentials,
                expires: DateTime.UtcNow.AddHours(12));

            // Générer le JWT à partir de l'objet JWT 
            string token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return token;
        }

        public async Task Delete(int employee_id)
        {
            // Remove employee admin status
            Employee employee = await _employeeRepository.FindAsync(employee_id) ?? throw new Exception("Employee not found");
            employee.IsAdmin = false;
            await _employeeRepository.UpdateAsync(employee);

            Admin admin = await _adminRepository.FirstOrDefaultAsync(a => a.EmployeeId == employee_id);

            if (admin != null)
            {
                await _adminRepository.DeleteAsync(admin);
            }
        }
    }
}
