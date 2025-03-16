using backend_cube_solo.Api.Departments.DTOs;
using backend_cube_solo.Api.Departments.Filters;
using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Departments.Services
{
    public interface IDepartmentService
    {
        Task<ResponseDepartmentDto> CreateDepartment(CreateDepartmentDto createDepartmentDto);
        Task<PagedResult<ResponseDepartmentDto>> ListDepartments(DepartmentQueryParams queryParams);
        Task<ResponseDepartmentDto> GetDepartment(int id);
        Task<ResponseDepartmentDto> UpdateDepartment(int id, UpdateDepartmentDto updateDepartmentDto);
        Task DeleteDepartment(int id);
    }
}
