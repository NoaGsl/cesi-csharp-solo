using System;
using System.Collections.Generic;
using backend_cube_solo.Api.Employees.Models;

namespace backend_cube_solo.Api.Departments.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
