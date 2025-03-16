using backend_cube_solo.Api.Locations.DTOs;
using backend_cube_solo.Api.Locations.Filters;
using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Locations.Services
{
    public interface ILocationService
    {
        Task<ResponseLocationDto> CreateLocation(CreateLocationDto createLocationDto);
        Task<ResponseLocationDto> GetLocation(int id);
        Task<PagedResult<ResponseLocationDto>> ListLocations(LocationQueryParams queryParams);
        Task<ResponseLocationDto> UpdateLocation(int id, UpdateLocationDto updateLocationDto);
        Task DeleteLocation(int id);

    }
}
