using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Locations.Filters
{
    public class LocationQueryParams : PagedQueryParameters
    {
        public string? city { get; set; }
    }
}
