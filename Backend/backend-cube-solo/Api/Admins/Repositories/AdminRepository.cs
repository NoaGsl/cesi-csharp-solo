using backend_cube_solo.Api.Admins.Models;
using backend_cube_solo.Shared.Data;
using backend_cube_solo.Shared.Repositories;

namespace backend_cube_solo.Api.Admins.Repositories
{
    public class AdminRepository : BaseRepository<Admin>, IAdminRepository
    {
        public AdminRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
