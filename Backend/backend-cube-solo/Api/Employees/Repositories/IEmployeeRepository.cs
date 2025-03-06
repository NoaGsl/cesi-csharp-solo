using backend_cube_solo.Api.Employees.DTOs;
using backend_cube_solo.Api.Employees.Filters;
using backend_cube_solo.Api.Employees.Models;
using backend_cube_solo.Shared.Pagination;
using backend_cube_solo.Shared.Repositories;

namespace backend_cube_solo.Api.Employees.Repositories
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        Task<PagedResult<ResponseEmployeeDto>> ListAsync(EmployeeQueryParams queryParams, CancellationToken cancellationToken = default);
    }
}
