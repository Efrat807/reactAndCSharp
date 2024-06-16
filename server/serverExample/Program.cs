using Microsoft.Extensions.Options;
using Repository;
using serverExample.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<MongoDatabaseSettings>(
             builder.Configuration.GetSection(nameof(MongoDatabaseSettings)));
builder.Services.AddSingleton<IDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<MongoDatabaseSettings>>().Value);
builder.Services.AddSingleton<MongoRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy
    (
       "CorsPolicy",
    policy =>
    {
        policy.SetIsOriginAllowed(_ => true);
        policy.AllowAnyHeader().WithMethods("OPTIONS", "HEAD", "CONNECT", "GET", "POST", "PUT", "DELETE", "PATCH")
             .AllowCredentials();
    }
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("CorsPolicy");
await FetchApiData.GetAsync(new HttpClient());

app.Run();
