using backend_cube_solo.Api.Departments.DTOs;
using backend_cube_solo.Api.Departments.Filters;
using backend_cube_solo.Api.Departments.Models;
using backend_cube_solo.Shared.Data;
using backend_cube_solo.Shared.Pagination;
using backend_cube_solo.Shared.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace backend_cube_solo.Api.Departments.Repositories
{
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<PagedResult<ResponseDepartmentDto>> ListAsync(DepartmentQueryParams queryParams, CancellationToken cancellationToken = default)
        {
            IQueryable<ResponseDepartmentDto> query = _context.Departments
                .AsNoTracking()
                .Select(d => new ResponseDepartmentDto
                {
                    Id = d.DepartmentId,
                    Name = d.Name,
                })
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryParams.name))
            {
                query = query.Where(d => d.Name.ToLower().StartsWith(queryParams.name.ToLower()));
            }

            // Get the total count for pagination info
            var totalCount = await query.CountAsync();

            // Apply pagination
            var results = await query
               .Skip((queryParams.page - 1) * queryParams.size)
               .Take(queryParams.size)
               .ToListAsync(cancellationToken);

            return new PagedResult<ResponseDepartmentDto>
            {
                Items = results,
                CurrentPage = queryParams.page,
                PageSize = queryParams.size,
                TotalCount = totalCount
            };

        }
    }
}
