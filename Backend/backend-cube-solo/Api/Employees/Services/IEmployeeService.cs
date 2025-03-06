
using backend_cube_solo.Api.Employees.DTOs;
using backend_cube_solo.Api.Employees.Filters;
using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Employees.Services
{
    public interface IEmployeeService
    {
        Task<ResponseEmployeeDto> CreateEmployee(CreateEmployeeDto createEmployeeDto);
        Task<PagedResult<ResponseEmployeeDto>> GetEmployees(EmployeeQueryParams queryParams);
        Task<ResponseEmployeeDto> GetEmployee(int id);
        Task<ResponseEmployeeDto> UpdateEmployee(int id, UpdateEmployeeDto updateEmployeeDto);
        Task DeleteEmployee(int id);
    }
}
