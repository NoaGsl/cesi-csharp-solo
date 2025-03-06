using backend_cube_solo.Api.Departments.DTOs;
using backend_cube_solo.Api.Departments.Filters;
using backend_cube_solo.Api.Departments.Services;
using backend_cube_solo.Shared.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace backend_cube_solo.Api.Departments.Controllers
{
    [ApiController]
    [Route("departments")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartmentDto createDepartmentDto)
        {
            return Ok(await _departmentService.CreateDepartment(createDepartmentDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetDepartments([FromQuery] DepartmentQueryParams queryParams)
        {
            return Ok(await _departmentService.ListDepartments(queryParams));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment([FromRoute] int id)
        {
            return Ok(await _departmentService.GetDepartment(id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment([FromRoute] int id, [FromBody] UpdateDepartmentDto updateDepartmentDto)
        {
            return Ok(await _departmentService.UpdateDepartment(id, updateDepartmentDto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        {
            await _departmentService.DeleteDepartment(id);
            return NoContent();
        }

        [HttpGet("{departmentId}/employees")]
        public async Task<IActionResult> GetEmployeesByDepartment(int departmentId, [FromQuery] PagedQueryParameters queryParams)
        {
            return Ok();
        }
    }
}
