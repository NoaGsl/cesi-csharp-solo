using backend_cube_solo.Api.Departments.DTOs;
using backend_cube_solo.Api.Departments.Extensions;
using backend_cube_solo.Api.Departments.Filters;
using backend_cube_solo.Api.Departments.Models;
using backend_cube_solo.Api.Departments.Repositories;
using backend_cube_solo.Api.Employees.Models;
using backend_cube_solo.Api.Employees.Repositories;
using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Departments.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public DepartmentService(IDepartmentRepository departmentRepository, IEmployeeRepository employeeRepository)
        {
            _departmentRepository = departmentRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<ResponseDepartmentDto> CreateDepartment(CreateDepartmentDto createDepartmentDto)
        {
            Department department = createDepartmentDto.ToModel();
            
            Department addedDepartment = await _departmentRepository.AddAsync(department);

            return addedDepartment.ToResponseDto();
        }

        public async Task<PagedResult<ResponseDepartmentDto>> ListDepartments(DepartmentQueryParams queryParams)
        {
            return await _departmentRepository.ListAsync(queryParams);
        }

        public async Task<ResponseDepartmentDto> GetDepartment(int id)
        {
            Department department = await _departmentRepository.FindAsync(id) ?? throw new KeyNotFoundException("Department not found");

            return department.ToResponseDto();
        }

        public async Task<ResponseDepartmentDto> UpdateDepartment(int id, UpdateDepartmentDto updateDepartmentDto)
        {
            Department department = await _departmentRepository.FindAsync(id) ?? throw new KeyNotFoundException("Department not found");

            department.Name = updateDepartmentDto.Name;

            await _departmentRepository.UpdateAsync(department);
            return department.ToResponseDto();
        }

        public async Task DeleteDepartment(int id)
        {
            Employee employee = await _employeeRepository.FirstOrDefaultAsync(e => e.DepartmentId == id);

            if (employee != null) {
                throw new Exception("Department still has employees");
            }

            Department department = await _departmentRepository.FindAsync(id) ?? throw new KeyNotFoundException("Department not found");
            await _departmentRepository.DeleteAsync(department);
        }
    }
}
