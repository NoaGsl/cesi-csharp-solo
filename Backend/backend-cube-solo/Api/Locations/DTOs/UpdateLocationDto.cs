using System.ComponentModel.DataAnnotations;

namespace backend_cube_solo.Api.Locations.DTOs
{
    public class UpdateLocationDto
    {
        [Required]
        [StringLength(100)]
        public required string City { get; set; }
    }
}
