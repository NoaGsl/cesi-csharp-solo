﻿using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Microsoft.AspNetCore.Identity.UI.Services;
using backend_cube_solo.Shared.Utils;
using backend_cube_solo.Shared.Data;
using backend_cube_solo.Api.Locations.Services;
using backend_cube_solo.Api.Locations.Repositories;
using backend_cube_solo.Api.Departments.Services;
using backend_cube_solo.Api.Departments.Repositories;
using backend_cube_solo.Api.Employees.Services;
using backend_cube_solo.Api.Employees.Repositories;
using backend_cube_solo.Api.Admins.Services;
using backend_cube_solo.Api.Admins.Repositories;

namespace backend_cube_solo.Shared.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static void InjectDependencies(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddHttpContextAccessor();
            builder.AddServices();
            builder.AddRepositories();
            builder.AddJWT();
            builder.AddSwagger();
            builder.AddEFCoreConfiguration();
        }

        public static void AddServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<ILocationService, LocationService>();
            builder.Services.AddScoped<IDepartmentService, DepartmentService>();
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();
            builder.Services.AddScoped<IAdminService, AdminService>();
        }

        public static void AddRepositories(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<ILocationRepository, LocationRepository>();
            builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            builder.Services.AddScoped<IAdminRepository, AdminRepository>();
        }

        public static void AddJWT(this WebApplicationBuilder builder)
        {
            var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET") ??
                            throw new InvalidOperationException("JWT secret 'JWT_SECRET' not found.");

            var key = Encoding.ASCII.GetBytes(jwtSecret);

            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false; // Mettre à true en production
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false, // Configurer selon les besoins
                        ValidateAudience = false, // Configurer selon les besoins
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });

            builder.Services.AddAuthorization();
        }

        public static void AddSwagger(this WebApplicationBuilder builder)
        {
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });
        }

        public static void AddEFCoreConfiguration(this WebApplicationBuilder builder)
        {
            var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING")
                                   ?? throw new InvalidOperationException(
                                       "Connection string 'DATABASE_CONNECTION_STRING' not found.");

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString));
        }
    }
}