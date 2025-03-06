using System;
using System.Collections.Generic;
using backend_cube_solo.Api.Employees.Models;

namespace backend_cube_solo.Api.Admins.Models;

public partial class Admin
{
    public int AdminId { get; set; }

    public string PasswordHash { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public int EmployeeId { get; set; }

    public virtual Employee Employee { get; set; } = null!;
}
