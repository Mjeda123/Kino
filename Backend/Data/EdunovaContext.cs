using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Backend.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> options) : base(options)
        {

        }

        public DbSet<Dvorana> Dvorane { get; set; }

        public DbSet<Film> Filmovi { get; set; }

        public DbSet<Gledatelj> Gledatelji { get; set; }

        public DbSet<Projekcija> Projekcije { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Implementacija veze 1:n
            modelBuilder.Entity<Projekcija>().HasOne(g => g.Film);

            modelBuilder.Entity<Projekcija>().HasOne(g => g.Dvorana);

            // Implementacija veze n:n
            modelBuilder.Entity<Projekcija>()
                .HasMany(g => g.Gledatelji)
                .WithMany(p => p.Projekcije)
                .UsingEntity<Dictionary<string, object>>("karte",
                c => c.HasOne<Gledatelj>().WithMany().HasForeignKey("gledatelj"),
                c => c.HasOne<Projekcija>().WithMany().HasForeignKey("projekcija"),
                c => c.ToTable("karte")
                );
        }

    }
}
