using backend_cube_solo.Api.Locations.DTOs;
using backend_cube_solo.Api.Locations.Models;

namespace backend_cube_solo.Api.Locations.Extensions
{
    public static class LocationExtension
    {
        public static Location toModel(this CreateLocationDto createLocationDto)
        {
            return new Location
            {
                City = createLocationDto.City,
            };
        }

        public static ResponseLocationDto toResponseDto(this Location location)
        {
            return new ResponseLocationDto
            {
                Id = location.LocationId,
                City = location.City,
            };
        }
    }
}
