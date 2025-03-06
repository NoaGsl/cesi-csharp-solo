using backend_cube_solo.Api.Departments.DTOs;
using backend_cube_solo.Api.Departments.Filters;
using backend_cube_solo.Api.Departments.Models;
using backend_cube_solo.Shared.Pagination;
using backend_cube_solo.Shared.Repositories;

namespace backend_cube_solo.Api.Departments.Repositories
{
    public interface IDepartmentRepository : IBaseRepository<Department>
    {
        Task<PagedResult<ResponseDepartmentDto>> ListAsync(DepartmentQueryParams queryParams, CancellationToken cancellationToken = default); 
    }
}
