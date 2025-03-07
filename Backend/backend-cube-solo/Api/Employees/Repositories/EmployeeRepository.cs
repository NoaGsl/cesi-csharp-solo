using backend_cube_solo.Api.Employees.DTOs;
using backend_cube_solo.Api.Employees.Filters;
using backend_cube_solo.Api.Employees.Models;
using backend_cube_solo.Shared.Data;
using backend_cube_solo.Shared.Pagination;
using backend_cube_solo.Shared.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace backend_cube_solo.Api.Employees.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Employee> GetByEmailAsync(string email)
        {
            Employee employee = await _context.Employees.FirstOrDefaultAsync(e => e.Email == email) ?? throw new KeyNotFoundException("Employee not found");
            return employee;
        }

        public async Task<PagedResult<ResponseEmployeeDto>> ListAsync(EmployeeQueryParams queryParams, CancellationToken cancellationToken = default)
        {
            IQueryable<ResponseEmployeeDto> query = _context.Employees
                .Select(e => new ResponseEmployeeDto
                {
                    Id = e.EmployeeId,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    LandlinePhoneNumber = e.LandlinePhoneNumber,
                    MobilePhoneNumber = e.MobilePhoneNumber,
                    Email = e.Email,
                    IsAdmin = e.IsAdmin,
                    JoinDate = e.JoinDate,
                    LeaveDate = e.LeaveDate,
                    LocationId = e.LocationId,
                    DepartmentId = e.DepartmentId
                });

            // Filter by a general search term across several fields
            if (!string.IsNullOrWhiteSpace(queryParams.search_term))
            {
                string term = queryParams.search_term.ToLower();
                query = query.Where(e =>
                    e.FirstName.ToLower().StartsWith(term) ||
                    e.LastName.ToLower().StartsWith(term) ||
                    e.LandlinePhoneNumber.ToLower().StartsWith(term) ||
                    e.MobilePhoneNumber.ToLower().StartsWith(term) ||
                    e.Email.ToLower().StartsWith(term) ||
                    e.IsAdmin.ToString().StartsWith(term)
                );
            }

            // Filter by Location if provided
            if (queryParams.location_id.HasValue)
            {
                query = query.Where(e => e.LocationId == queryParams.location_id.Value);
            }

            // Filter by Department if provided
            if (queryParams.department_id.HasValue)
            {
                query = query.Where(e => e.DepartmentId == queryParams.department_id.Value);
            }

            var totalCount = await query.CountAsync(cancellationToken);

            var employees = await query
                .Skip((queryParams.page - 1) * queryParams.size)
                .Take(queryParams.size)
                .ToListAsync(cancellationToken);

            return new PagedResult<ResponseEmployeeDto>
            {
                Items = employees,
                CurrentPage = queryParams.page,
                PageSize = queryParams.size,
                TotalCount = totalCount
            };
        }
    }
}
