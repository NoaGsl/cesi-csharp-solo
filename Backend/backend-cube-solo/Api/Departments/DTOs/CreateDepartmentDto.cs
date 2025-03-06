using System.ComponentModel.DataAnnotations;

namespace backend_cube_solo.Api.Departments.DTOs
{
    public class CreateDepartmentDto
    {
        [Required]
        [StringLength(100)]
        public required string Name { get; set; }
    }
}
