﻿using System;
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
        public virtual DbSet<Request> Requests { get; set; }
        public virtual DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=OnlineSchool;Username=postgres;Password=1234");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Russian_Russia.1251");

            modelBuilder.Entity<Account>(entity =>
            {

                entity.ToTable("account");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("email");

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("firstname");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Lastname)
                    .HasColumnType("character varying")
                    .HasColumnName("lastname");

                entity.Property(e => e.Password)
                    .HasColumnType("character varying")
                    .HasColumnName("password");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Communication>(entity =>
            {

                entity.ToTable("communication");

                entity.Property(e => e.CommunicationId).HasDefaultValueSql("nextval('communication_id_seq'::regclass)");

                entity.Property(e => e.CommunicationName)
                    .IsRequired()
                    .HasColumnType("character varying");
            });

            modelBuilder.Entity<Course>(entity =>
            {

                entity.ToTable("course");

                entity.Property(e => e.GroupNumber)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("group_number");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Request>(entity =>
            {

                entity.ToTable("request");

                entity.Property(e => e.Communicationname)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("communicationname");

                entity.Property(e => e.Coursename)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("coursename");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Mobilephone)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("mobilephone");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("character varying");
            });

            modelBuilder.Entity<Role>(entity =>
            {

                entity.ToTable("role");

                entity.Property(e => e.RoleId).HasDefaultValueSql("nextval('role_id_seq'::regclass)");

                entity.Property(e => e.RoleName).HasColumnType("character varying");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
