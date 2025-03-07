using DotNetEnv;
using backend_cube_solo.API.Middleware;
using backend_cube_solo.Shared.Extensions;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.InjectDependencies();

builder.WebHost.UseUrls("http://0.0.0.0:7213");

var app = builder.Build();

app.UseCustomExceptionHandler();

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