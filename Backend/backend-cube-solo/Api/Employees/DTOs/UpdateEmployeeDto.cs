using System.ComponentModel.DataAnnotations;
using backend_cube_solo.Shared.Validators;

namespace backend_cube_solo.Api.Employees.DTOs
{
    public class UpdateEmployeeDto
    {
        [StringLength(50)] [Required] public required string FirstName { get; set; }
        [StringLength(50)] [Required] public required string LastName { get; set; }
        [StringLength(20)][PhoneValidator] [Required] public required string LandlinePhoneNumber { get; set; }
        [StringLength(20)][PhoneValidator] [Required] public required string MobilePhoneNumber { get; set; }
        [StringLength(150)] [Required] public required string Email { get; set; }
        public bool? IsAdmin { get; set; }
        public DateOnly? LeaveDate { get; set; }
        [Required] public int LocationId { get; set; }
        [Required] public int DepartmentId { get; set; }
    }
}
