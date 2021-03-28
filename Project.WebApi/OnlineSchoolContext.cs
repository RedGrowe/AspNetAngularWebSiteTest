using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Project.WebApi
{
    public partial class OnlineSchoolContext : DbContext
    {
        public OnlineSchoolContext()
        {
        }

        public OnlineSchoolContext(DbContextOptions<OnlineSchoolContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Communication> Communications { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<CTLink> Ctlinks { get; set; }
        public virtual DbSet<Price> Prices { get; set; }
        public virtual DbSet<ProfileInfo> ProfileInfos { get; set; }
        public virtual DbSet<Request> Requests { get; set; }
        public virtual DbSet<RequestVacancy> RequestVacancies { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<SchoolInfo> SchoolInfos { get; set; }
        public virtual DbSet<Times> Times { get; set; }
        public virtual DbSet<Vacancy> Vacancies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=192.168.0.220;Port=5432;Database=OnlineSchool;Username=postgres;Password=1234");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Russian_Russia.1251");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("account");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasColumnType("character varying")
                    .HasColumnName("email ");

                entity.Property(e => e.Firstname)
                    .HasColumnType("character varying")
                    .HasColumnName("firstname");

                entity.Property(e => e.Lastname)
                    .HasColumnType("character varying")
                    .HasColumnName("lastname ");

                entity.Property(e => e.Password)
                    .HasColumnType("character varying")
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .HasColumnType("character varying")
                    .HasColumnName("role");

                entity.Property(e => e.Username)
                    .HasColumnType("character varying")
                    .HasColumnName("username ");
            });

            modelBuilder.Entity<Communication>(entity =>
            {
                entity.ToTable("communication");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.CommunicationName).HasColumnType("character varying");
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("course");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.GroupNumber)
                    .HasColumnType("character varying")
                    .HasColumnName("group_number");

                entity.Property(e => e.Name)
                    .HasColumnType("character varying")
                    .HasColumnName("name");
            });

            modelBuilder.Entity<CTLink>(entity =>
            {
                entity.ToTable("ctlink");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.IdCourse).HasColumnName("idcourse");

                entity.Property(e => e.IdUser).HasColumnName("iduser");
            });

            modelBuilder.Entity<Price>(entity =>
            {
                entity.ToTable("price");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Course)
                    .HasColumnType("character varying")
                    .HasColumnName("course");

                entity.Property(e => e.EighthPrice)
                    .HasColumnType("character varying")
                    .HasColumnName("eighth_price");

                entity.Property(e => e.FifthPrice)
                    .HasColumnType("character varying")
                    .HasColumnName("fifth_price");

                entity.Property(e => e.FirstPrice)
                    .HasColumnType("character varying")
                    .HasColumnName("first_price");

                entity.Property(e => e.FourthPrice)
                    .HasColumnType("character varying")
                    .HasColumnName("fourth_price");

                entity.Property(e => e.SecondPrice)
                    .HasColumnType("character varying")
                    .HasColumnName("second_price");

                entity.Property(e => e.SeventhPrice)
                    .HasColumnType("character varying")
                    .HasColumnName("seventh_price");

                entity.Property(e => e.SixthPrice)
                    .HasColumnType("character varying")
                    .HasColumnName("sixth_price");

                entity.Property(e => e.Subjetct)
                    .HasColumnType("character varying")
                    .HasColumnName("subjetct");

                entity.Property(e => e.ThirdPrice)
                    .HasColumnType("character varying")
                    .HasColumnName("third_price");
            });

            modelBuilder.Entity<ProfileInfo>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("profile_info_pkey");

                entity.ToTable("profile_info");

                entity.Property(e => e.Username)
                    .HasColumnType("character varying")
                    .HasColumnName("username");

                entity.Property(e => e.AboutMe)
                    .HasColumnType("character varying")
                    .HasColumnName("about_me");

                entity.Property(e => e.Course)
                    .HasColumnType("character varying")
                    .HasColumnName("course");

                entity.Property(e => e.FirstConfirmed).HasColumnName("first_confirmed");

                entity.Property(e => e.FirstDoc)
                    .HasColumnType("character varying")
                    .HasColumnName("first_doc");

                entity.Property(e => e.FourthConfirmed).HasColumnName("fourth_confirmed");

                entity.Property(e => e.FourthDoc)
                    .HasColumnType("character varying")
                    .HasColumnName("fourth_doc");

                entity.Property(e => e.Grade)
                    .HasColumnType("character varying")
                    .HasColumnName("grade");

                entity.Property(e => e.MainPhoto)
                    .HasColumnType("character varying")
                    .HasColumnName("main_photo");

                entity.Property(e => e.MainPhotoConfirmed).HasColumnName("main_photo_confirmed");

                entity.Property(e => e.SecondConfirmed).HasColumnName("second_confirmed");

                entity.Property(e => e.SecondDoc)
                    .HasColumnType("character varying")
                    .HasColumnName("second_doc");

                entity.Property(e => e.ThirdConfirmed).HasColumnName("third_confirmed");

                entity.Property(e => e.ThirdDoc)
                    .HasColumnType("character varying")
                    .HasColumnName("third_doc");
            });

            modelBuilder.Entity<Request>(entity =>
            {
                entity.ToTable("request");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Communicationname)
                    .HasColumnType("character varying")
                    .HasColumnName("communicationname");

                entity.Property(e => e.Coursename)
                    .HasColumnType("character varying")
                    .HasColumnName("coursename");

                entity.Property(e => e.Email)
                    .HasColumnType("character varying")
                    .HasColumnName("email");

                entity.Property(e => e.Mobilephone)
                    .HasColumnType("character varying")
                    .HasColumnName("mobilephone");

                entity.Property(e => e.Name).HasColumnType("character varying");
            });

            modelBuilder.Entity<RequestVacancy>(entity =>
            {
                entity.ToTable("RequestVacancy");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Communication)
                    .HasColumnType("character varying")
                    .HasColumnName("communication");

                entity.Property(e => e.Email)
                    .HasColumnType("character varying")
                    .HasColumnName("email");

                entity.Property(e => e.Mobile)
                    .HasColumnType("character varying")
                    .HasColumnName("mobile");

                entity.Property(e => e.Name)
                    .HasColumnType("character varying")
                    .HasColumnName("name");

                entity.Property(e => e.Vacancy)
                    .HasColumnType("character varying")
                    .HasColumnName("vacancy");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Name).HasColumnType("character varying");
            });

            modelBuilder.Entity<SchoolInfo>(entity =>
            {
                entity.ToTable("school_info");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.ContactAbout)
                    .HasColumnType("character varying")
                    .HasColumnName("contact_about");

                entity.Property(e => e.SchoolAbout)
                    .HasColumnType("character varying")
                    .HasColumnName("school_about");
            });

            modelBuilder.Entity<Times>(entity =>
            {

                entity.ToTable("time");

                entity.Property(e => e.Date)
                    .HasColumnType("timestamp(0) without time zone")
                    .HasColumnName("date");

                entity.Property(e => e.FactValue).HasColumnName("factvalue");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdUser).HasColumnName("iduser");

                entity.Property(e => e.Value).HasColumnName("value");
            });

            modelBuilder.Entity<Vacancy>(entity =>
            {
                entity.ToTable("vacancy");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.VacancyName)
                    .HasColumnType("character varying")
                    .HasColumnName("vacancy_name");

                entity.Property(e => e.Visibility).HasColumnName("visibility");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
