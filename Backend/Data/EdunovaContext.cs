using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> options) : base(options)
        {

        }

        public DbSet<Dvorana> Dvorane { get; set; }

        public DbSet<Film> Filmovi { get; set; }

    }
}
