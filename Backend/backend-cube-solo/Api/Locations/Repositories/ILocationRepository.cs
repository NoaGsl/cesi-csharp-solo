using backend_cube_solo.Api.Locations.DTOs;
using backend_cube_solo.Api.Locations.Filters;
using backend_cube_solo.Api.Locations.Models;
using backend_cube_solo.Shared.Pagination;
using backend_cube_solo.Shared.Repositories;

namespace backend_cube_solo.Api.Locations.Repositories
{
    public interface ILocationRepository : IBaseRepository<Location>
    {
        Task<PagedResult<ResponseLocationDto>> ListAsync(LocationQueryParams queryParams, CancellationToken cancellationToken = default);
    }
}
