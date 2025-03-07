using System;
using System.Collections.Generic;
using backend_cube_solo.Api.Admins.Models;
using backend_cube_solo.Api.Departments.Models;
using backend_cube_solo.Api.Locations.Models;

namespace backend_cube_solo.Api.Employees.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string LandlinePhoneNumber { get; set; } = null!;

    public string MobilePhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool IsAdmin { get; set; }

    public DateOnly JoinDate { get; set; }

    public DateOnly? LeaveDate { get; set; }

    public int LocationId { get; set; }

    public int DepartmentId { get; set; }

    public virtual Admin? Admin { get; set; }

    public virtual Department Department { get; set; } = null!;

    public virtual Location Location { get; set; } = null!;
}
