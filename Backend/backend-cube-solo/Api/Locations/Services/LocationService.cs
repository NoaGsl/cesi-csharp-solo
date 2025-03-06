using backend_cube_solo.Api.Locations.DTOs;
using backend_cube_solo.Api.Locations.Extensions;
using backend_cube_solo.Api.Locations.Filters;
using backend_cube_solo.Api.Locations.Models;
using backend_cube_solo.Api.Locations.Repositories;
using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Locations.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _locationRepository;

        public LocationService(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        public async Task<ResponseLocationDto> CreateLocation(CreateLocationDto createLocationDto)
        {
            Location location = createLocationDto.toModel();
            
            Location addedLocation = await _locationRepository.AddAsync(location);

            return addedLocation.toResponseDto();
        }

        public async Task<PagedResult<ResponseLocationDto>> ListLocations(LocationQueryParams queryParams)
        {
            return await _locationRepository.ListAsync(queryParams);
        }

        public async Task<ResponseLocationDto> GetLocation(int id)
        {
            Location location = await _locationRepository.FindAsync(id) ?? throw new KeyNotFoundException("Location not found");
            return location.toResponseDto();
        }

        public async Task<ResponseLocationDto> UpdateLocation(int id, UpdateLocationDto updateLocationDto)
        {
            Location location = await _locationRepository.FindAsync(id) ?? throw new KeyNotFoundException("Location not found");

            location.City = updateLocationDto.City;

            await _locationRepository.UpdateAsync(location);
            return location.toResponseDto();
        }

        public async Task DeleteLocation(int id)
        {
            Location location = await _locationRepository.FindAsync(id) ?? throw new KeyNotFoundException("Location not found");
            await _locationRepository.DeleteAsync(location);
        }
    }
}
