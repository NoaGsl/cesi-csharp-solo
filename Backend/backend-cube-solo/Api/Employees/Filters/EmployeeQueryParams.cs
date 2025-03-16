using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Employees.Filters
{
    public class EmployeeQueryParams : PagedQueryParameters
    {
        // A general search term that can match across multiple fields
        public string? search_term { get; set; }
        public bool? details { get; set; }

        // Optional filters
        public int? location_id { get; set; }
        public int? department_id { get; set; }
    }
}
