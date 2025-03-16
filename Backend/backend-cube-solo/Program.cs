using DotNetEnv;
using backend_cube_solo.API.Middleware;
using backend_cube_solo.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using backend_cube_solo.Shared.Data;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.InjectDependencies();

builder.WebHost.UseUrls("http://0.0.0.0:7213");

var app = builder.Build();

app.UseCustomExceptionHandler();

// Apply migrations at runtime
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    int retryCount = 5;
    bool migrationApplied = false;

    while (retryCount > 0 && !migrationApplied)
    {
        try
        {
            var pendingMigrations = dbContext.Database.GetPendingMigrations();
            if (pendingMigrations.Any())
            {
                Console.WriteLine("Applying pending migrations...");
                dbContext.Database.Migrate();
                Console.WriteLine("Migrations applied successfully.");
            }
            else
            {
                Console.WriteLine("No pending migrations found.");
            }
            migrationApplied = true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error applying migrations: {ex.Message}");
            Console.WriteLine("Retrying in 5 seconds...");
            Thread.Sleep(5000);
            retryCount--;
            if (retryCount == 0)
            {
                Console.WriteLine("Could not apply migrations after several attempts. Exiting.");
                throw;
            }
        }
    }
}

// Configurer le pipeline HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Activation de l'authentification et de l'autorisation
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();