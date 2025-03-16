using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Departments.Filters
{
    public class DepartmentQueryParams : PagedQueryParameters
    {
        public string? name { get; set; }
    }
}
