using backend_cube_solo.Api.Employees.DTOs;
using backend_cube_solo.Api.Employees.Filters;
using backend_cube_solo.Api.Employees.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_cube_solo.Api.Employees.Controllers
{
    [ApiController]
    [Route("employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto createEmployeeDto)
        {
            return Ok(await _employeeService.CreateEmployee(createEmployeeDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery] EmployeeQueryParams queryParams)
        {
            return Ok(await _employeeService.GetEmployees(queryParams));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            return Ok(await _employeeService.GetEmployee(id));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] UpdateEmployeeDto updateEmployeeDto)
        {
            return Ok(await _employeeService.UpdateEmployee(id, updateEmployeeDto));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await _employeeService.DeleteEmployee(id);
            return NoContent();
        }
    }
}
