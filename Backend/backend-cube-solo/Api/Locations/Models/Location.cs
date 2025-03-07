using System;
using System.Collections.Generic;
using backend_cube_solo.Api.Employees.Models;

namespace backend_cube_solo.Api.Locations.Models;

public partial class Location
{
    public int LocationId { get; set; }

    public string City { get; set; } = null!;

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
