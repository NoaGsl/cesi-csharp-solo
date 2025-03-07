using System.ComponentModel.DataAnnotations;
using backend_cube_solo.Shared.Validators;

namespace backend_cube_solo.Api.Employees.DTOs
{
    public class CreateEmployeeDto
    {
        [Required]
        [StringLength(50)]
        public required string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public required string LastName { get; set; }

        [Required]
        [StringLength(20)]
        [PhoneValidator]
        public required string LandlinePhoneNumber { get; set; }

        [Required]
        [StringLength(20)]
        [PhoneValidator]
        public required string MobilePhoneNumber { get; set; }

        [Required]
        [StringLength(150)]
        public required string Email { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        public DateOnly? JoinDate { get; set; }

        public int LocationId { get; set; }
        public int DepartmentId { get; set; }

    }
}
