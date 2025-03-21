﻿using backend_cube_solo.Api.Departments.Repositories;
using backend_cube_solo.Api.Employees.DTOs;
using backend_cube_solo.Api.Employees.Extensions;
using backend_cube_solo.Api.Employees.Filters;
using backend_cube_solo.Api.Employees.Models;
using backend_cube_solo.Api.Employees.Repositories;
using backend_cube_solo.Api.Locations.Repositories;
using backend_cube_solo.Shared.Pagination;

namespace backend_cube_solo.Api.Employees.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ILocationRepository _locationRepository;
        private readonly IDepartmentRepository _departmentRepository;

        public EmployeeService(IEmployeeRepository employeeRepository, ILocationRepository locationRepository, IDepartmentRepository departmentRepository)
        {
            _employeeRepository = employeeRepository;
            _locationRepository = locationRepository;
            _departmentRepository = departmentRepository;
        }

        public async Task<ResponseEmployeeDto> CreateEmployee(CreateEmployeeDto createEmployeeDto)
        {
            _ = await _locationRepository.FindAsync(createEmployeeDto.LocationId) ?? throw new KeyNotFoundException("Location not found");
            _ = await _departmentRepository.FindAsync(createEmployeeDto.DepartmentId) ?? throw new KeyNotFoundException("Department not found");

            var foundEmployee = await _employeeRepository.FirstOrDefaultAsync(e => e.Email == createEmployeeDto.Email);

            if (foundEmployee != null)
            {
                throw new Exception("Employee with this email already exists");
            }

            Employee employee = createEmployeeDto.ToModel();

            Employee addedEmployee = await _employeeRepository.AddAsync(employee);

            return addedEmployee.ToResponseEmployeeDto();
        }

        public async Task<PagedResult<ResponseEmployeeDto>> GetEmployees(EmployeeQueryParams queryParams)
        {
            return await _employeeRepository.ListAsync(queryParams);
        }

        public async Task<ResponseEmployeeDto> GetEmployee(int id)
        {
            return await _employeeRepository.GetById(id);
        }

        public async Task<ResponseEmployeeDto> UpdateEmployee(int id, UpdateEmployeeDto updateEmployeeDto)
        {
            Employee employee = await _employeeRepository.FindAsync(id) ?? throw new KeyNotFoundException("Employee not found");

            _ = await _locationRepository.FindAsync(updateEmployeeDto.LocationId) ?? throw new KeyNotFoundException("Location not found");

            _ = await _departmentRepository.FindAsync(updateEmployeeDto.DepartmentId) ?? throw new KeyNotFoundException("Department not found");

            if (updateEmployeeDto.Email != employee.Email)
            {
                var foundEmployee = await _employeeRepository.FirstOrDefaultAsync(e => e.Email == updateEmployeeDto.Email);

                if (foundEmployee != null)
                {
                    throw new Exception("Employee with this email already exists");
                }
            }

            if (updateEmployeeDto.LeaveDate.HasValue && updateEmployeeDto.LeaveDate.Value < employee.JoinDate)
            {
                throw new Exception("Leave date cannot be before join date");
            }

            if (updateEmployeeDto.LeaveDate.HasValue)
            {
                updateEmployeeDto.IsAdmin = false;
            }

            if (updateEmployeeDto.IsAdmin == true && employee.LeaveDate.HasValue)
            {
                throw new Exception("Admin status cannot be set for a former employee");
            }

            employee.UpdateFromDto(updateEmployeeDto);

            await _employeeRepository.UpdateAsync(employee);

            return employee.ToResponseEmployeeDto();
        }

        public async Task DeleteEmployee(int id)
        {
            Employee employee = await _employeeRepository.FindAsync(id) ?? throw new KeyNotFoundException("Employee not found");

            await _employeeRepository.DeleteAsync(employee);
        }
    }
}
