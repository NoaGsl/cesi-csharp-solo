using backend_cube_solo.Api.Locations.DTOs;
using backend_cube_solo.Api.Locations.Filters;
using backend_cube_solo.Api.Locations.Services;
using backend_cube_solo.Shared.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace backend_cube_solo.Api.Locations.Controllers
{
    [ApiController]
    [Route("locations")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLocation([FromBody] CreateLocationDto createLocationDto)
        {
            return Ok(await _locationService.CreateLocation(createLocationDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations([FromQuery] LocationQueryParams queryParams)
        {
            return Ok(await _locationService.ListLocations(queryParams));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocation(int id)
        {
            return Ok(await _locationService.GetLocation(id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLocation(int id, [FromBody] UpdateLocationDto updateLocationDto)
        {
            return Ok(await _locationService.UpdateLocation(id, updateLocationDto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            await _locationService.DeleteLocation(id);
            return NoContent();
        }

        [HttpGet("{locationId}/employees")]
        public async Task<IActionResult> GetEmployeesByLocation(int locationId, [FromQuery] PagedQueryParameters queryParams)
        {
            return Ok();
        }
    }
}
