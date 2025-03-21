﻿using System;
using System.Collections.Generic;
using backend_cube_solo.Api.Admins.Models;
using backend_cube_solo.Api.Departments.Models;
using backend_cube_solo.Api.Employees.Models;
using backend_cube_solo.Api.Locations.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_cube_solo.Shared.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING") ?? throw new Exception("DATABASE_CONNECTION_STRING is null");

        optionsBuilder.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("admins_pkey");

            entity.ToTable("admins");

            entity.HasIndex(e => e.EmployeeId, "admins_employee_id_key").IsUnique();

            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.Salt).HasColumnName("salt");

            entity.HasOne(d => d.Employee).WithOne(p => p.Admin)
                .HasForeignKey<Admin>(d => d.EmployeeId)
                .HasConstraintName("fk_admins_employee");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("departments_pkey");

            entity.ToTable("departments");

            entity.Property(e => e.DepartmentId).HasColumnName("department_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("employees_pkey");

            entity.ToTable("employees");

            entity.HasIndex(e => e.Email, "employees_email_key").IsUnique();

            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.DepartmentId).HasColumnName("department_id");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("first_name");
            entity.Property(e => e.IsAdmin)
                .HasDefaultValue(false)
                .HasColumnName("is_admin");
            entity.Property(e => e.JoinDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("join_date");
            entity.Property(e => e.LandlinePhoneNumber)
                .HasMaxLength(20)
                .HasColumnName("landline_phone_number");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.LeaveDate).HasColumnName("leave_date");
            entity.Property(e => e.LocationId).HasColumnName("location_id");
            entity.Property(e => e.MobilePhoneNumber)
                .HasMaxLength(20)
                .HasColumnName("mobile_phone_number");

            entity.HasOne(d => d.Department).WithMany(p => p.Employees)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("fk_employees_department");

            entity.HasOne(d => d.Location).WithMany(p => p.Employees)
                .HasForeignKey(d => d.LocationId)
                .HasConstraintName("fk_employees_location");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.LocationId).HasName("locations_pkey");

            entity.ToTable("locations");

            entity.Property(e => e.LocationId).HasColumnName("location_id");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
        });

        AddDefaultData(modelBuilder);
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    public void AddDefaultData(ModelBuilder modelBuilder)
    {
        AddDefaultDepartmentsData(modelBuilder);
        AddDefaultLocationsData(modelBuilder);
        AddDefaultEmployeesData(modelBuilder);
    }

    public void AddDefaultDepartmentsData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Department>().HasData(
            new Department
            {
                DepartmentId = 1,
                Name = "IT"
            },
            new Department
            {
                DepartmentId = 2,
                Name = "HR"
            },
            new Department
            {
                DepartmentId = 3,
                Name = "Finance"
            },
            new Department
            {
                DepartmentId = 4,
                Name = "Marketing"
            },
            new Department
            {
                DepartmentId = 5,
                Name = "Sales"
            }
        );
    }

    public void AddDefaultLocationsData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Location>().HasData(
            new Location
            {
                LocationId = 1,
                City = "Paris"
            },
            new Location
            {
                LocationId = 2,
                City = "Nantes"
            },
            new Location
            {
                LocationId = 3,
                City = "Toulouse"
            },
            new Location
            {
                LocationId = 4,
                City = "Nice"
            },
            new Location
            {
                LocationId = 5,
                City = "Lille"
            }
        );
    }

    public void AddDefaultEmployeesData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>().HasData(
            new Employee
            {
                EmployeeId = 1,
                FirstName = "Super",
                LastName = "Admin",
                LandlinePhoneNumber = "0123456789",
                MobilePhoneNumber = "0123456789",
                Email = "super.admin@gmail.com",
                IsAdmin = true,
                JoinDate = new DateOnly(2021, 1, 1),
                LocationId = 1,
                DepartmentId = 1
            },
            new Employee
            {
                EmployeeId = 2,
                FirstName = "John",
                LastName = "Doe",
                LandlinePhoneNumber = "0123456789",
                MobilePhoneNumber = "0123456789",
                Email = "jhon.doe@gmail.com",
                IsAdmin = false,
                JoinDate = new DateOnly(2021, 1, 1),
                LocationId = 1,
                DepartmentId = 2
            },
            new Employee
            {
                EmployeeId = 3,
                FirstName = "Pierre",
                LastName = "Dupont",
                LandlinePhoneNumber = "0123456789",
                MobilePhoneNumber = "0123456789",
                Email = "pierre.dupont@gmail.com",
                IsAdmin = false,
                JoinDate = new DateOnly(2021, 1, 1),
                LocationId = 2,
                DepartmentId = 3
            }
        );
    }
}
