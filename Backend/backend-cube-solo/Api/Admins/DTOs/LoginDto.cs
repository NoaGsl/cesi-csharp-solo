using System.ComponentModel.DataAnnotations;
using backend_cube_solo.Shared.Validators;

namespace backend_cube_solo.Api.Admins.DTOs
{
    public class LoginDto
    {
        [Required]
        [StringLength(150)]
        public required string Email { get; set; }

        [Required]
        [PasswordValidator]
        public required string Password { get; set; }
    }
}
