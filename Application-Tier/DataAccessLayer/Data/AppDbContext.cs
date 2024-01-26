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
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Candidate> Candidates { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employer>()
            .HasOne(e => e.User)
            .WithOne()
            .HasForeignKey<Employer>(e => e.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Candidate>()
            .HasOne(e => e.User)
            .WithOne()
            .HasForeignKey<Candidate>(e => e.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

            // 1 user ka shume notifikime
            modelBuilder.Entity<User>()
                .HasMany(u => u.Notifications)
                .WithOne(n => n.User)
                .OnDelete(DeleteBehavior.Cascade);

            //1 user ka shume aplikime
            modelBuilder.Entity<Candidate>()
                .HasMany(u => u.JobApplications)
                .WithOne(ja => ja.Candidate)
                .OnDelete(DeleteBehavior.Cascade);

            // 1 user qe eshte company ka shume postime
            modelBuilder.Entity<Employer>()
                .HasMany(u => u.JobsPosted)
                .WithOne(j => j.Company)
                .OnDelete(DeleteBehavior.Cascade);


            //Shume me shume per job application
            modelBuilder.Entity<JobApplication>()
                .HasKey(up => new { up.Id,up.CandidateId, up.JobId});
            modelBuilder.Entity<JobApplication>()
                .HasOne(u => u.Candidate)
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
