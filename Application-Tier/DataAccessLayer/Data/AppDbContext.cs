using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<UserExperience> UserExperiences { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuration for cascade delete on User's related entities

            // 1 user ka shume notifikime
            modelBuilder.Entity<User>()
                .HasMany(u => u.Notifications)
                .WithOne(n => n.User)
                .OnDelete(DeleteBehavior.Cascade);

            //1 user ka shume aplikime
            modelBuilder.Entity<User>()
                .HasMany(u => u.JobApplications)
                .WithOne(ja => ja.User)
                .OnDelete(DeleteBehavior.Cascade);

            // 1 user qe eshte company ka shume postime
            modelBuilder.Entity<User>()
                .HasMany(u => u.JobsPosted)
                .WithOne(j => j.Company)
                .OnDelete(DeleteBehavior.Cascade);


            //Shume me shume per job application
            modelBuilder.Entity<JobApplication>()
                .HasKey(up => new { up.CandidateId, up.JobId});
            modelBuilder.Entity<JobApplication>()
                .HasOne(u => u.User)
                .WithMany(p => p.JobApplications)
                .HasForeignKey(u => u.CandidateId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<JobApplication>()
                .HasOne(u => u.Job)
                .WithMany(p => p.Applications)
                .HasForeignKey(u => u.JobId)
                .OnDelete(DeleteBehavior.Cascade);






            // Ensure cascading delete for Identity-related entities
            modelBuilder.Entity<User>()
                .HasMany(u => u.Claims)
                .WithOne()
                .HasForeignKey(c => c.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Roles)
                .WithOne()
                .HasForeignKey(r => r.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }

    }

}
