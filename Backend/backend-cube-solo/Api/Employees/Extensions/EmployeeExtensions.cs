using backend_cube_solo.Api.Departments.Extensions;
using backend_cube_solo.Api.Employees.DTOs;
using backend_cube_solo.Api.Employees.Models;
using backend_cube_solo.Api.Locations.Extensions;

namespace backend_cube_solo.Api.Employees.Extensions
{
    public static class EmployeeExtensions
    {
        public static Employee ToModel(this CreateEmployeeDto createEmployeeDto)
        {
            return new Employee
            {
                FirstName = createEmployeeDto.FirstName,
                LastName = createEmployeeDto.LastName,
                LandlinePhoneNumber = createEmployeeDto.LandlinePhoneNumber,
                MobilePhoneNumber = createEmployeeDto.MobilePhoneNumber,
                Email = createEmployeeDto.Email,
                IsAdmin = createEmployeeDto.IsAdmin,
                JoinDate = createEmployeeDto.JoinDate ?? DateOnly.FromDateTime(DateTime.Now),
                LeaveDate = null,
                LocationId = createEmployeeDto.LocationId,
                DepartmentId = createEmployeeDto.DepartmentId
            };
        }

        public static ResponseEmployeeDto ToResponseEmployeeDto(this Employee employee)
        {
            return new ResponseEmployeeDto
            {
                Id = employee.EmployeeId,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                LandlinePhoneNumber = employee.LandlinePhoneNumber,
                MobilePhoneNumber = employee.MobilePhoneNumber,
                Email = employee.Email,
                IsAdmin = employee.IsAdmin,
                JoinDate = employee.JoinDate,
                LeaveDate = employee.LeaveDate,
                LocationId = employee.LocationId,
                DepartmentId = employee.DepartmentId
            };
        }

        public static void UpdateFromDto(this Employee employee, UpdateEmployeeDto updateEmployeeDto)
        {
            employee.FirstName = updateEmployeeDto.FirstName ?? employee.FirstName;
            employee.LastName = updateEmployeeDto.LastName ?? employee.LastName;
            employee.LandlinePhoneNumber = updateEmployeeDto.LandlinePhoneNumber ?? employee.LandlinePhoneNumber;
            employee.MobilePhoneNumber = updateEmployeeDto.MobilePhoneNumber ?? employee.MobilePhoneNumber;
            employee.Email = updateEmployeeDto.Email ?? employee.Email;
            employee.IsAdmin = updateEmployeeDto.IsAdmin ?? employee.IsAdmin;
            employee.LeaveDate = updateEmployeeDto.LeaveDate;
            employee.LocationId = updateEmployeeDto.LocationId ?? employee.LocationId;
            employee.DepartmentId = updateEmployeeDto.DepartmentId ?? employee.DepartmentId;
        }
    }
}
