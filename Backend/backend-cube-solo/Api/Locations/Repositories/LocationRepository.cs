using backend_cube_solo.Api.Locations.DTOs;
using backend_cube_solo.Api.Locations.Filters;
using backend_cube_solo.Api.Locations.Models;
using backend_cube_solo.Shared.Data;
using backend_cube_solo.Shared.Pagination;
using backend_cube_solo.Shared.Repositories;
using Microsoft.EntityFrameworkCore;

namespace backend_cube_solo.Api.Locations.Repositories
{
    public class LocationRepository : BaseRepository<Location>, ILocationRepository
    {
        public LocationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<PagedResult<ResponseLocationDto>> ListAsync(LocationQueryParams queryParams, CancellationToken cancellationToken = default)
        {
            IQueryable<ResponseLocationDto> query =
                _context.Locations
                .AsNoTracking()
                .OrderBy(location => location.LocationId)
                .Select(location => new ResponseLocationDto
                {
                    Id = location.LocationId,
                    City = location.City
                }).AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryParams.city))
            {
                query = query.Where(location => location.City.ToLower().StartsWith(queryParams.city.ToLower()));
            }

            // Get the total count for pagination info
            var totalCount = await query.CountAsync();

            // Apply pagination
            var results = await query
               .Skip((queryParams.page - 1) * queryParams.size)
               .Take(queryParams.size)
               .ToListAsync(cancellationToken);

            return new PagedResult<ResponseLocationDto>
            {
                Items = results,
                CurrentPage = queryParams.page,
                PageSize = queryParams.size,
                TotalCount = totalCount
            };
        }
    }
}
