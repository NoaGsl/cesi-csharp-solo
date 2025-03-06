using System.ComponentModel.DataAnnotations;

namespace backend_cube_solo.Api.Employees.DTOs
{
    public class UpdateEmployeeDto
    {
        [StringLength(50)] public string? FirstName { get; set; }
        [StringLength(50)] public string? LastName { get; set; }
        [StringLength(20)] public string? LandlinePhoneNumber { get; set; }
        [StringLength(20)] public string? MobilePhoneNumber { get; set; }
        [StringLength(150)] public string? Email { get; set; }
        public bool? IsAdmin { get; set; }
        public DateOnly? LeaveDate { get; set; }
        public int? LocationId { get; set; }
        public int? DepartmentId { get; set; }
    }
}
