using backend_cube_solo.Api.Departments.DTOs;
using backend_cube_solo.Api.Locations.DTOs;

namespace backend_cube_solo.Api.Employees.DTOs
{
    public class ResponseEmployeeDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string LandlinePhoneNumber { get; set; }
        public required string MobilePhoneNumber { get; set; }
        public required string Email { get; set; }
        public bool IsAdmin { get; set; }
        public DateOnly JoinDate { get; set; }
        public DateOnly? LeaveDate { get; set; }
        public int LocationId { get; set; }
        public int DepartmentId { get; set; }
        public ResponseDepartmentDto? Department { get; set; }
        public ResponseLocationDto? Location { get; set; }
    }
}
