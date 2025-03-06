using Backend.Data;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EdunovaContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("EdunovaContext"));
});

builder.Services.AddCors(o => {

    o.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });

});

builder.Services.AddAutoMapper(typeof(EdunovaMappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(o => {
    o.EnableTryItOutByDefault();
    o.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
});

app.UseCors("CorsPolicy");

app.MapControllers();

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.Run();
