using backend_cube_solo.Api.Departments.DTOs;
using backend_cube_solo.Api.Departments.Models;

namespace backend_cube_solo.Api.Departments.Extensions
{
    public static class DepartmentExtensions
    {
        public static Department ToModel(this CreateDepartmentDto createDepartmentDto)
        {
            return new Department
            {
                Name = createDepartmentDto.Name,
            };
        }

        public static ResponseDepartmentDto ToResponseDto(this Department department)
        {
            return new ResponseDepartmentDto
            {
                Id = department.DepartmentId,
                Name = department.Name,
            };
        }
    }
}
