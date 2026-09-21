window.sessionDetails = {
  1: {
    theory: [
      { title: ".NET platformu ve çalışma modeli", description: ".NET yalnızca bir dil değil; uygulama modeli, standart kütüphaneler ve çalışma zamanından oluşan bir platformdur. C# kodu önce IL'e, ardından CLR tarafından makine koduna çevrilir.", points: ["CLR; JIT, garbage collection ve exception yönetimini üstlenir.", "CTS, C#, F# ve VB.NET arasında ortak tip kurallarını sağlar.", ".NET 8 LTS; macOS, Linux ve Windows üzerinde aynı uygulamayı çalıştırır."] },
      { title: "HTTP ve REST sözleşmesi", description: "Web API, istemci ile sunucu arasındaki davranışı HTTP üzerinden tanımlar. URL kaynağı, HTTP metodu yapılacak işi, status code ise sonucu ifade eder.", points: ["GET okur, POST oluşturur, PUT günceller, DELETE siler.", "200, 201, 204, 400, 404 ve 500 kodları doğru bağlamda kullanılmalıdır.", "REST stateless'tir; her istek ihtiyaç duyduğu bağlamı taşır."] },
      { title: "Controller ve routing", description: "Controller HTTP giriş kapısıdır. Route template ve action attribute'ları bir isteğin hangi metoda ulaşacağını belirler.", points: ["[ApiController] otomatik binding ve API davranışları sağlar.", "[FromRoute] URL parçasını, [FromQuery] query string'i bağlar.", "Controller iş mantığı yerine HTTP koordinasyonuna odaklanır."] },
      { title: "Model ve JSON", description: "C# modeli API'nin taşıdığı verinin şeklini tanımlar. ASP.NET Core nesneleri varsayılan olarak JSON'a serialize eder ve request body'lerini tekrar nesneye dönüştürür.", points: ["Property adları API response şemasını oluşturur.", "Nullable ve varsayılan değerler sözleşmenin güvenliğini etkiler.", "İç model ile dış sözleşme sonraki session'da DTO ile ayrılacaktır."] },
      { title: "OpenAPI ve Swagger", description: "OpenAPI endpoint sözleşmesini makine tarafından okunabilir hale getirir; Swagger UI bu sözleşmeyi interaktif bir test ekranına dönüştürür.", points: ["Endpoint, parametre ve response tipleri otomatik keşfedilir.", "XML comment'leri açıklamaları zenginleştirir.", "Hands-on sonunda tüm endpoint'ler Swagger'dan doğrulanır."] }
    ],
    checklist: [".NET 8 SDK'yı doğrula ve controller tabanlı Web API oluştur.", "Solution oluşturup API projesini solution'a ekle.", "Product modelini tanımla.", "HelloController ile basit, route ve query örneklerini ekle.", "ProductsController içinde in-memory CRUD akışını kur.", "WeatherController ile JSON response örneği ekle.", "Swagger/OpenAPI kaydını yap ve XML comment'lerini bağla.", "GET, POST, PUT ve DELETE senaryolarını Swagger'dan doğrula."],
    code: [
      { title: "Projeyi ve solution'ı oluştur", why: "Controller tabanlı şablon ve tüm session'larda büyüyecek solution iskeleti hazırlanır.", file: "Terminal", language: "bash", code: String.raw`dotnet new webapi --use-controllers -n ECommerceApi
dotnet new sln -n ECommerceSolution
dotnet sln add ECommerceApi/ECommerceApi.csproj
cd ECommerceApi
dotnet run` },
      { title: "Product modelini ekle", why: "CRUD endpoint'lerinin alıp döndüreceği ilk domain modelidir.", file: "ECommerceApi/Models/Product.cs", language: "csharp", code: String.raw`namespace ECommerceApi.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}` },
      { title: "Route ve query parametrelerini göster", why: "Aynı controller üzerinde sabit route, route parametresi ve query string binding karşılaştırılır.", file: "ECommerceApi/Controllers/HelloController.cs", language: "csharp", code: String.raw`using Microsoft.AspNetCore.Mvc;

namespace ECommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HelloController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { message = "Hello from .NET!" });

    [HttpGet("{name}")]
    public IActionResult GetByName(string name) =>
        Ok(new { message = $"Hello, {name}!" });

    [HttpGet("greet")]
    public IActionResult Greet([FromQuery] string name, [FromQuery] string greeting = "Hello") =>
        Ok(new { message = $"{greeting}, {name}!" });
}` },
      { title: "İlk CRUD controller'ını kur", why: "HTTP metotları ve status code'lar in-memory liste üzerinde uçtan uca uygulanır.", file: "ECommerceApi/Controllers/ProductsController.cs", language: "csharp", code: String.raw`using ECommerceApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> Products = new();

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAll() => Ok(Products);

    [HttpGet("{id}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> Create(Product product)
    {
        product.Id = Products.Count == 0 ? 1 : Products.Max(p => p.Id) + 1;
        product.CreatedAt = DateTime.UtcNow;
        Products.Add(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Product input)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        if (product is null) return NotFound();
        product.Name = input.Name;
        product.Description = input.Description;
        product.Price = input.Price;
        product.Stock = input.Stock;
        return Ok(product);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        if (product is null) return NotFound();
        Products.Remove(product);
        return NoContent();
    }
}` },
      { title: "Swagger pipeline'ını bağla", why: "Endpoint'ler tarayıcıdan keşfedilebilir ve çalıştırılabilir hale gelir.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();` }
    ]
  },
  2: {
    theory: [
      { title: "Request-response yaşam döngüsü", description: "İstek Kestrel'e gelir, middleware zincirinden geçer, controller ve service tarafından işlenir; response ters yönde aynı pipeline'dan döner.", points: ["Middleware sırası uygulama davranışını değiştirir.", "Cross-cutting concern'ler controller'a dağılmamalıdır.", "Exception handler pipeline'ın başında olmalıdır."] },
      { title: "Dependency Injection", description: "Sınıf ihtiyaç duyduğu bağımlılığı oluşturmak yerine constructor üzerinden alır. Böylece somut sınıflar birbirine sıkı bağlanmaz.", points: ["Transient her çözümlemede yeni instance üretir.", "Scoped HTTP isteği boyunca aynı instance'ı kullanır.", "Singleton uygulama ömrü boyunca tek instance'tır."] },
      { title: "Service katmanı", description: "Controller HTTP detaylarını, service ise iş kurallarını yönetir. Interface sözleşmesi implementasyonu değiştirilebilir ve mock'lanabilir hale getirir.", points: ["Controller ince kalır.", "İş mantığı farklı giriş noktalarından tekrar kullanılabilir.", "Unit test yazmak kolaylaşır."] },
      { title: "DTO ve validation", description: "DTO, API'nin dış sözleşmesini iç modelden ayırır. Create, update ve response ihtiyaçları farklı sınıflarla ifade edilir.", points: ["Data annotation'lar temel doğrulamayı tanımlar.", "İstemci yalnız izin verilen alanları gönderir.", "Entity veya domain modeli doğrudan dışarı açılmaz."] },
      { title: "Configuration ve Options Pattern", description: "Ayarlar kod içine gömülmez; appsettings, environment ve environment variable katmanlarından okunur. Options Pattern bu veriyi strongly typed sınıflara bağlar.", points: ["Development ve Production ayarları ayrılır.", "Secret değerler source control'e yazılmaz.", "IOptions<T> ile typo riski azalır."] },
      { title: "Merkezi middleware'ler", description: "Request logging ve exception handling gibi her isteği ilgilendiren davranışlar tek noktada uygulanır.", points: ["Tutarlı JSON hata cevabı üretilir.", "İstek süresi ve sonucu loglanır.", "Controller'larda tekrar eden try/catch kaldırılır."] }
    ],
    checklist: ["Swagger ve validation paketlerini ekle.", "Product request/response DTO'larını oluştur.", "AppSettings, ApiSettings ve LoggingSettings sınıflarını tanımla.", "IProductService sözleşmesini ve ProductService implementasyonunu ekle.", "ProductsController'ı service kullanacak şekilde refactor et.", "ExceptionHandlingMiddleware oluştur.", "RequestLoggingMiddleware oluştur.", "DI ve Options kayıtlarını Program.cs'e ekle.", "Middleware sırasını kurup validation ve hata senaryolarını test et."],
    code: [
      { title: "Product DTO'larını ve kuralları tanımla", why: "Create ve update sözleşmeleri birbirinden ayrılır, geçersiz veri API sınırında reddedilir.", file: "ECommerceApi/DTOs/ProductDtos.cs", language: "csharp", code: String.raw`using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateProductDto
{
    [Required(ErrorMessage = "Ürün adı zorunludur")]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    [Range(0.01, 1_000_000)]
    public decimal Price { get; set; }

    [Range(0, 10_000)]
    public int Stock { get; set; }
}

public class UpdateProductDto
{
    [StringLength(100, MinimumLength = 2)] public string? Name { get; set; }
    [StringLength(500)] public string? Description { get; set; }
    [Range(0.01, 1_000_000)] public decimal? Price { get; set; }
    [Range(0, 10_000)] public int? Stock { get; set; }
}` },
      { title: "Service sözleşmesini oluştur", why: "Controller iş mantığının nasıl çalıştığını değil, hangi operasyonların bulunduğunu bilir.", file: "ECommerceApi/Services/IProductService.cs", language: "csharp", code: String.raw`using ECommerceApi.DTOs;

namespace ECommerceApi.Services;

public interface IProductService
{
    IEnumerable<ProductDto> GetAll();
    ProductDto? GetById(int id);
    ProductDto Create(CreateProductDto dto);
    ProductDto? Update(int id, UpdateProductDto dto);
    bool Delete(int id);
}` },
      { title: "Global exception middleware'i ekle", why: "Beklenmeyen hatalar tek formatta loglanır ve istemciye kontrollü cevap döner.", file: "ECommerceApi/Middleware/ExceptionHandlingMiddleware.cs", language: "csharp", code: String.raw`using System.Net;
using System.Text.Json;

namespace ECommerceApi.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        => (_next, _logger) = (next, logger);

    public async Task InvokeAsync(HttpContext context)
    {
        try { await _next(context); }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Unhandled exception");
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(new
            {
                statusCode = context.Response.StatusCode,
                message = "An internal server error occurred",
                timestamp = DateTime.UtcNow
            }));
        }
    }
}

public static class ExceptionHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseExceptionHandling(this IApplicationBuilder app) =>
        app.UseMiddleware<ExceptionHandlingMiddleware>();
}` },
      { title: "Servis ve options kayıtlarını bağla", why: "DI container interface'leri çözer, konfigürasyon sınıfları ilgili section'lara bağlanır.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.Configure<AppSettings>(
    builder.Configuration.GetSection(AppSettings.SectionName));
builder.Services.Configure<ApiSettings>(
    builder.Configuration.GetSection(ApiSettings.SectionName));
builder.Services.Configure<LoggingSettings>(
    builder.Configuration.GetSection(LoggingSettings.SectionName));

var app = builder.Build();
app.UseExceptionHandling();
app.UseRequestLogging();
app.UseHttpsRedirection();
app.MapControllers();` }
    ]
  },
  3: {
    theory: [
      { title: "Model binding kaynakları", description: "ASP.NET Core request verisini action parametrelerine bağlar. Kaynağı açıkça belirtmek API sözleşmesini okunur ve tahmin edilebilir yapar.", points: ["[FromRoute] kaynak kimliği için kullanılır.", "[FromQuery] filtre, sıralama ve sayfalama içindir.", "[FromBody] create/update payload'ını taşır."] },
      { title: "Route constraint'leri", description: "Constraint geçersiz URL'yi action çalışmadan reddeder. Böylece controller yalnız geçerli tip ve aralıkla uğraşır.", points: ["{id:int:min(1)} yalnız pozitif integer kabul eder.", "Named route CreatedAtAction akışını destekler.", "Route eşleşmezse framework 404 üretir."] },
      { title: "Sayfalama sözleşmesi", description: "Büyüyen listelerde tüm kayıtları döndürmek yerine veri küçük sayfalara ayrılır. Response yalnız item'ları değil gezinme metadatasını da taşır.", points: ["Page ve PageSize istemci girdisidir.", "TotalCount sayfalamadan önce hesaplanır.", "HasNext ve TotalPages istemcinin gezinmesini sağlar."] },
      { title: "Filtreleme ve sıralama", description: "Tek query modeli arama ve sıralama seçeneklerini toplar. İşlem sırası sonuç doğruluğu için önemlidir.", points: ["Önce filtrele, sonra sırala.", "Filtrelenmiş toplamı hesapla.", "Son olarak Skip/Take uygula."] },
      { title: "Problem Details", description: "RFC 7807 uyumlu hata gövdesi tüm endpoint'lerde ortak bir sözleşme sağlar.", points: ["title insan tarafından okunur özettir.", "status HTTP kodunu tekrarlar.", "detail ve traceId hata araştırmasını kolaylaştırır."] },
      { title: "Swagger sözleşmesi", description: "XML comments ve ProducesResponseType, endpoint'in başarılı ve hatalı sonuçlarını Swagger üzerinde görünür hale getirir.", points: ["GenerateDocumentationFile etkinleştirilir.", "Response tipi ve kodu action üzerinde belirtilir.", "Dokümantasyon kodla birlikte versiyonlanır."] }
    ],
    checklist: ["ProductQueryParameters modelini oluştur.", "PageSize için güvenli üst sınır belirle.", "PagedResult<T> response zarfını ekle.", "IProductService'e GetPaged metodunu ekle.", "Filtrele → sırala → say → sayfala akışını uygula.", "Controller'da [FromQuery] binding kullan.", "ID endpoint'ine route constraint ve named route ekle.", "Problem Details servisini kaydet ve 404 yanıtını standartlaştır.", "XML documentation üretimini ve Swagger response tanımlarını ekle.", "Arama, sıralama, sayfalama ve hatalı route senaryolarını test et."],
    code: [
      { title: "Query ve paged result modellerini ekle", why: "Liste endpoint'inin tüm giriş ve çıkış metadatası tek sözleşmede toplanır.", file: "ECommerceApi/DTOs/QueryDtos.cs", language: "csharp", code: String.raw`using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.DTOs;

public class ProductQueryParameters
{
    private const int MaxPageSize = 50;
    private int _pageSize = 10;

    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value <= 0 ? 10 : Math.Min(value, MaxPageSize);
    }

    public string? Search { get; set; }
    public string? SortBy { get; set; }
    public bool Desc { get; set; }
}

public class PagedResult<T>
{
    public IEnumerable<T> Items { get; set; } = Array.Empty<T>();
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages => PageSize == 0 ? 0 : (int)Math.Ceiling(TotalCount / (double)PageSize);
    public bool HasPrevious => Page > 1;
    public bool HasNext => Page < TotalPages;
}` },
      { title: "Sayfalama algoritmasını uygula", why: "TotalCount doğru kalırken istemciye yalnız istediği pencere döndürülür.", file: "ECommerceApi/Services/ProductService.cs", language: "csharp", code: String.raw`public PagedResult<ProductDto> GetPaged(ProductQueryParameters query)
{
    IEnumerable<Product> items = _products;

    if (!string.IsNullOrWhiteSpace(query.Search))
        items = items.Where(p => p.Name.Contains(query.Search, StringComparison.OrdinalIgnoreCase));

    items = query.SortBy?.ToLowerInvariant() switch
    {
        "price" => query.Desc ? items.OrderByDescending(p => p.Price) : items.OrderBy(p => p.Price),
        "stock" => query.Desc ? items.OrderByDescending(p => p.Stock) : items.OrderBy(p => p.Stock),
        "name" => query.Desc ? items.OrderByDescending(p => p.Name) : items.OrderBy(p => p.Name),
        _ => items.OrderBy(p => p.Id)
    };

    var total = items.Count();
    var page = items.Skip((query.Page - 1) * query.PageSize)
        .Take(query.PageSize).Select(MapToDto).ToList();

    return new PagedResult<ProductDto>
    {
        Items = page, Page = query.Page,
        PageSize = query.PageSize, TotalCount = total
    };
}` },
      { title: "Query binding ve route constraint ekle", why: "Liste parametreleri query string'den bağlanır; geçersiz ID action'a ulaşmaz.", file: "ECommerceApi/Controllers/ProductsController.cs", language: "csharp", code: String.raw`[HttpGet]
[ProducesResponseType(typeof(PagedResult<ProductDto>), StatusCodes.Status200OK)]
public ActionResult<PagedResult<ProductDto>> GetAll(
    [FromQuery] ProductQueryParameters query)
{
    return Ok(_productService.GetPaged(query));
}

[HttpGet("{id:int:min(1)}", Name = nameof(GetById))]
[ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public ActionResult<ProductDto> GetById(int id)
{
    var product = _productService.GetById(id);
    if (product is null)
        return Problem(
            title: "Ürün bulunamadı",
            detail: $"{id} numaralı ürün mevcut değil.",
            statusCode: StatusCodes.Status404NotFound);

    return Ok(product);
}` },
      { title: "Problem Details ve XML docs'u bağla", why: "Hata gövdeleri standartlaşır, XML açıklamaları Swagger dokümanına girer.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`using System.Reflection;

builder.Services.AddProblemDetails();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFile));
});` }
    ]
  },
  4: {
    theory: [
      { title: "Veri erişim seçenekleri", description: "ADO.NET tam kontrol, Dapper hafif eşleme, EF Core ise üretkenlik ve güçlü modelleme sunar. Bu projede Code First EF Core ve SQLite kullanılır.", points: ["İhtiyaç teknoloji seçimini belirler.", "ORM SQL bilgisini gereksiz yapmaz.", "Üretilen sorgu ve index'ler izlenmelidir."] },
      { title: "Entity ve DbContext", description: "Entity tablo satırını, DbSet tabloyu, DbContext ise veritabanı oturumunu ve change tracker'ı temsil eder.", points: ["Entity ile API DTO'su farklı sorumluluklara sahiptir.", "Scoped DbContext istek başına bir unit sağlar.", "SaveChanges değişiklikleri kalıcılaştırır."] },
      { title: "Code First ve migration", description: "Şema C# modeli üzerinden tanımlanır ve migration dosyalarıyla versiyonlanır.", points: ["Fluent API index ve precision tanımlar.", "Migration ekipte aynı şemanın kurulmasını sağlar.", "Seed data başlangıç verisini tekrar üretilebilir yapar."] },
      { title: "LINQ ve loading", description: "LINQ expression'ları provider tarafından SQL'e çevrilir. İlişkili verinin ne zaman yükleneceği sorgu sayısını ve performansı etkiler.", points: ["IQueryable deferred execution sağlar.", "Include eager loading yapar.", "N+1 problemi gereksiz sorgu üretir."] },
      { title: "Repository Pattern", description: "Repository EF Core detayını service katmanından ayırır; ortak CRUD generic, ürüne özel sorgular specialized repository'de tutulur.", points: ["Interface test doubles için sınır oluşturur.", "Query metodu zincirlenebilir sorgu sağlar.", "Her abstraction gerçek bir ihtiyaca dayanmalıdır."] },
      { title: "Soft delete", description: "Kayıt fiziksel olarak silinmez, IsDeleted ile görünmez yapılır. Global query filter bu kuralı her sorguya otomatik uygular.", points: ["Audit ve geri alma imkanı korunur.", "Find gibi bazı erişim yolları dikkat ister.", "UpdatedAt silme zamanını izler."] }
    ],
    checklist: ["EF Core SQLite ve Design paketlerini ekle.", "ProductEntity ve CategoryEntity sınıflarını oluştur.", "BootcampDbContext ve DbSet'leri ekle.", "Fluent API ile index, precision ve soft-delete filter tanımla.", "Seed data ekle.", "Generic IRepository<T> ve Repository<T> oluştur.", "IProductRepository ve ProductRepository özel sorgularını ekle.", "ProductService'i repository üzerinden async çalışacak şekilde değiştir.", "DbContext ve repository DI kayıtlarını yap.", "Connection string ekle.", "Migration oluşturup veritabanını güncelle.", "CRUD ve soft-delete davranışını doğrula."],
    code: [
      { title: "EF Core paketlerini ekle", why: "SQLite provider runtime erişimini, Design paketi migration araçlarını sağlar.", file: "Terminal", language: "bash", code: String.raw`dotnet add ECommerceApi package Microsoft.EntityFrameworkCore.Sqlite --version 8.0.0
dotnet add ECommerceApi package Microsoft.EntityFrameworkCore.Design --version 8.0.0
dotnet tool install --global dotnet-ef` },
      { title: "Product entity'sini oluştur", why: "Kalıcı model; key, uzunluk, precision ve soft-delete alanlarını taşır.", file: "ECommerceApi/Entities/ProductEntity.cs", language: "csharp", code: String.raw`using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceApi.Entities;

[Table("Products")]
public class ProductEntity
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required, MaxLength(100)] public string Name { get; set; } = string.Empty;
    [MaxLength(500)] public string? Description { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
}` },
      { title: "DbContext ve model kurallarını ekle", why: "Tablolar, index'ler, decimal hassasiyeti ve global soft-delete kuralı merkezi tanımlanır.", file: "ECommerceApi/Data/BootcampDbContext.cs", language: "csharp", code: String.raw`using ECommerceApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApi.Data;

public class BootcampDbContext : DbContext
{
    public BootcampDbContext(DbContextOptions<BootcampDbContext> options) : base(options) { }

    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<CategoryEntity> Categories => Set<CategoryEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<ProductEntity>(entity =>
        {
            entity.HasIndex(e => e.Name);
            entity.Property(e => e.Price).HasPrecision(18, 2);
            entity.HasQueryFilter(e => !e.IsDeleted);
        });
        modelBuilder.Entity<CategoryEntity>()
            .HasIndex(e => e.Name).IsUnique();
    }
}` },
      { title: "Generic repository sözleşmesini kur", why: "Ortak veri erişim işlemleri tüm entity'ler için aynı interface ile sunulur.", file: "ECommerceApi/Repositories/IRepository.cs", language: "csharp", code: String.raw`using System.Linq.Expressions;

namespace ECommerceApi.Repositories;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    IQueryable<T> Query();
}` },
      { title: "Veritabanı ve repository'leri kaydet", why: "Scoped DbContext ve repository'ler request boyunca aynı veri oturumunu paylaşır.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`builder.Services.AddDbContext<BootcampDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();` },
      { title: "Migration'ı üret ve uygula", why: "C# modeli SQLite şemasına dönüştürülür ve versiyonlanır.", file: "Terminal", language: "bash", code: String.raw`cd ECommerceApi
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run` }
    ]
  },
  5: {
    theory: [
      { title: "Authentication ve authorization", description: "Authentication kullanıcının kimliğini, authorization ise doğrulanmış kullanıcının erişim yetkisini belirler.", points: ["401 kimlik doğrulanamadığında döner.", "403 kimlik var fakat yetki yoksa döner.", "[Authorize] endpoint sınırında uygulanır."] },
      { title: "JWT yapısı", description: "JWT header, payload ve signature bölümlerinden oluşan imzalı bir token'dır. Payload şifreli değildir; hassas veri taşımamalıdır.", points: ["Claim'ler kullanıcı kimliği ve rolü taşır.", "Signature token'ın değiştirilmediğini kanıtlar.", "Expiration kısa tutulmalı ve doğrulanmalıdır."] },
      { title: "Token doğrulama", description: "API gelen token'ın imzasını, issuer'ını, audience'ını ve ömrünü kontrol eder.", points: ["Secret en az 32 karakter ve source control dışında olmalıdır.", "ClockSkew sıfırlandığında süre kesin uygulanır.", "HTTPS token'ın ağ üzerinde korunması için zorunludur."] },
      { title: "Şifre güvenliği", description: "Parola geri döndürülebilir biçimde saklanmaz. BCrypt her parola için salt üretir ve maliyetli hash hesaplar.", points: ["Register sırasında HashPassword kullanılır.", "Login sırasında Verify ile karşılaştırılır.", "Loglara parola veya token yazılmaz."] },
      { title: "Kullanıcı ve rol modeli", description: "UserEntity kimlik verisini, UserRoles ise izin gruplarını tanımlar. Varsayılan yeni kullanıcı en düşük yetkiyle oluşturulur.", points: ["Username ve e-mail benzersiz olmalıdır.", "IsActive devre dışı hesapları engeller.", "Role claim authorization kararında kullanılır."] },
      { title: "Swagger ile güvenli API testi", description: "Bearer security definition Swagger'a eklenerek token ile korumalı endpoint'ler aynı arayüzden test edilir.", points: ["Önce login ile token alınır.", "Authorize alanına Bearer token girilir.", "401 ve 403 senaryoları ayrı doğrulanır."] }
    ],
    checklist: ["JWT Bearer ve BCrypt paketlerini ekle.", "UserEntity ve UserRoles sınıflarını oluştur.", "Users DbSet'ini ve seed admin kaydını ekle.", "Register/Login/User DTO'larını tanımla.", "JwtSettings section'ını appsettings'e ekle.", "IJwtService ve JwtService ile token üret/doğrula akışını kur.", "IAuthService ve AuthService ile register/login işlemlerini yaz.", "Authentication ve authorization servislerini kaydet.", "UseAuthentication ve UseAuthorization sırasını kur.", "Swagger Bearer security definition ekle.", "Hash, token, 401 ve role senaryolarını doğrula."],
    code: [
      { title: "JWT ayar modelini oluştur", why: "Token üretme ve doğrulama parametreleri Options Pattern ile tek yerde yönetilir.", file: "ECommerceApi/Auth/JwtSettings.cs", language: "csharp", code: String.raw`namespace ECommerceApi.Auth;

public class JwtSettings
{
    public const string SectionName = "JwtSettings";
    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int ExpirationInMinutes { get; set; } = 60;
}` },
      { title: "JWT üretimini uygula", why: "Kullanıcı kimliği ve rolü imzalı claim'ler olarak token'a eklenir.", file: "ECommerceApi/Auth/JwtService.cs", language: "csharp", code: String.raw`public string GenerateToken(UserEntity user)
{
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

    var token = new JwtSecurityToken(
        issuer: _jwtSettings.Issuer,
        audience: _jwtSettings.Audience,
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationInMinutes),
        signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(token);
}` },
      { title: "Şifreyi hashleyerek kullanıcı oluştur", why: "Veritabanına hiçbir zaman düz metin parola yazılmaz.", file: "ECommerceApi/Services/AuthService.cs", language: "csharp", code: String.raw`public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
{
    if (await _context.Users.AnyAsync(u => u.Username == request.Username))
        return new AuthResponseDto { Success = false, Message = "Bu kullanıcı adı zaten kullanılıyor" };

    var user = new UserEntity
    {
        Username = request.Username,
        Email = request.Email,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
        FirstName = request.FirstName,
        LastName = request.LastName,
        Role = UserRoles.User,
        IsActive = true
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return new AuthResponseDto
    {
        Success = true,
        Token = _jwtService.GenerateToken(user),
        User = MapToUserDto(user)
    };
}` },
      { title: "JWT doğrulamasını pipeline'a bağla", why: "Bearer handler her request'teki token'ı API action'ından önce doğrular.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection(JwtSettings.SectionName));

var jwt = builder.Configuration.GetSection(JwtSettings.SectionName).Get<JwtSettings>()!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.SecretKey)),
        ValidateIssuer = true,
        ValidIssuer = jwt.Issuer,
        ValidateAudience = true,
        ValidAudience = jwt.Audience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    });
builder.Services.AddAuthorization();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();` }
    ]
  },
  6: {
    theory: [
      { title: "Transaction sınırı", description: "Bir iş akışındaki tüm veri değişiklikleri tek başarı birimi olmalıdır. Herhangi bir adım hata verirse önceki değişiklikler rollback edilir.", points: ["Begin transaction sınırı başlatır.", "Commit tüm değişiklikleri kalıcılaştırır.", "Catch bloğu rollback ve rethrow yapar."] },
      { title: "ACID", description: "ACID transaction'ın güvenilirliğini tanımlayan dört özelliktir.", points: ["Atomicity: ya hep ya hiç.", "Consistency: kurallar korunur.", "Isolation: eşzamanlı işler birbirini bozmaz.", "Durability: commit kalıcıdır."] },
      { title: "Isolation seviyeleri", description: "Isolation seviyesi eşzamanlı transaction'ların birbirini ne kadar göreceğini belirler; daha güçlü izolasyon daha düşük concurrency getirebilir.", points: ["Read Committed dirty read'i önler.", "Repeatable Read aynı satırın değişmesini sınırlar.", "Serializable en güçlü fakat en maliyetli seçenektir."] },
      { title: "Unit of Work", description: "Unit of Work transaction ve SaveChanges davranışını tek abstraction altında toplar. Service doğrudan DbContext transaction API'sine bağlanmaz.", points: ["Begin, commit ve rollback açık metotlardır.", "Aynı scoped DbContext repository'lerle paylaşılır.", "Dispose açık transaction'ı temizler."] },
      { title: "Domain exception'ları", description: "Tek bir Exception yerine iş anlamı taşıyan tipler kullanılır. Global handler bu tipleri uygun HTTP koduna çevirir.", points: ["NotFound → 404.", "Validation → 400.", "Conflict ve InsufficientFunds → 409."] },
      { title: "Güvenli hata cevabı", description: "Sunucu stack trace'i loglar fakat istemciye teknik detay sızdırmaz. Aynı hata şeması tüm controller'larda kullanılır.", points: ["Controller try/catch ile kirlenmez.", "Log exception nesnesiyle yazılır.", "Beklenmeyen hatalar 500 olur."] }
    ],
    checklist: ["BankAccountEntity ve TransactionLogEntity oluştur.", "DbContext'e banka tablolarını ve seed hesapları ekle.", "Bank DTO'larını tanımla.", "Custom exception hiyerarşisini oluştur.", "IUnitOfWork ve UnitOfWork implementasyonunu ekle.", "IBankService sözleşmesini oluştur.", "TransferAsync içinde doğrulama, debit, credit ve log adımlarını kur.", "İşlemleri transaction içine al; catch'te rollback ve throw uygula.", "Global middleware'de exception → status code eşlemesini ekle.", "Unit of Work ve Bank service DI kayıtlarını yap.", "Başarılı transfer, yetersiz bakiye ve hesap yok senaryolarını doğrula."],
    code: [
      { title: "Domain exception'larını tanımla", why: "Hata tipi hem iş anlamını hem de üretilecek HTTP yanıtını belirler.", file: "ECommerceApi/Exceptions/CustomExceptions.cs", language: "csharp", code: String.raw`namespace ECommerceApi.Exceptions;

public abstract class AppException : Exception
{
    protected AppException(string message) : base(message) { }
}
public sealed class NotFoundException : AppException
{
    public NotFoundException(string message) : base(message) { }
}
public sealed class ValidationException : AppException
{
    public ValidationException(string message) : base(message) { }
}
public sealed class ConflictException : AppException
{
    public ConflictException(string message) : base(message) { }
}
public sealed class InsufficientFundsException : AppException
{
    public InsufficientFundsException(string message) : base(message) { }
}` },
      { title: "Unit of Work sözleşmesini oluştur", why: "Transaction yaşam döngüsü service kodundan soyutlanır.", file: "ECommerceApi/UnitOfWork/IUnitOfWork.cs", language: "csharp", code: String.raw`namespace ECommerceApi.UnitOfWork;

public interface IUnitOfWork : IDisposable
{
    Task BeginTransactionAsync();
    Task<int> SaveChangesAsync();
    Task CommitAsync();
    Task RollbackAsync();
}` },
      { title: "Para transferini atomik uygula", why: "Gönderen ve alıcı bakiyesi yalnız iki güncelleme de başarılıysa kalıcılaşır.", file: "ECommerceApi/Services/BankService.cs", language: "csharp", code: String.raw`public async Task<TransferResponseDto> TransferAsync(TransferRequestDto request)
{
    if (request.Amount <= 0)
        throw new ValidationException("Transfer tutarı sıfırdan büyük olmalıdır");

    await _unitOfWork.BeginTransactionAsync();
    try
    {
        var from = await _context.BankAccounts
            .FirstOrDefaultAsync(a => a.AccountNumber == request.FromAccountNumber)
            ?? throw new NotFoundException("Gönderen hesap bulunamadı");
        var to = await _context.BankAccounts
            .FirstOrDefaultAsync(a => a.AccountNumber == request.ToAccountNumber)
            ?? throw new NotFoundException("Alıcı hesap bulunamadı");

        if (from.Balance < request.Amount)
            throw new InsufficientFundsException("Yetersiz bakiye");

        from.Balance -= request.Amount;
        to.Balance += request.Amount;
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitAsync();

        return new TransferResponseDto { Success = true, Message = "Transfer başarılı" };
    }
    catch
    {
        await _unitOfWork.RollbackAsync();
        throw;
    }
}` },
      { title: "Exception tiplerini HTTP koduna çevir", why: "Domain hataları controller'lardan bağımsız ve tutarlı response'lara dönüşür.", file: "ECommerceApi/Middleware/ExceptionHandlingMiddleware.cs", language: "csharp", code: String.raw`var statusCode = exception switch
{
    NotFoundException => StatusCodes.Status404NotFound,
    ValidationException => StatusCodes.Status400BadRequest,
    ConflictException => StatusCodes.Status409Conflict,
    InsufficientFundsException => StatusCodes.Status409Conflict,
    UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
    _ => StatusCodes.Status500InternalServerError
};

context.Response.StatusCode = statusCode;
context.Response.ContentType = "application/json";
await context.Response.WriteAsJsonAsync(new
{
    statusCode,
    message = statusCode == 500 ? "Beklenmeyen bir hata oluştu" : exception.Message,
    timestamp = DateTime.UtcNow
});` }
    ]
  },
  7: {
    theory: [
      { title: "Senkron ve asenkron I/O", description: "Senkron kod bekleme boyunca thread'i tutar. await, I/O tamamlanana kadar thread'i havuza geri vererek aynı kaynakla daha fazla isteğe hizmet etmeyi sağlar.", points: ["Async hız değil ölçeklenebilirlik aracıdır.", "CPU-bound ve I/O-bound işler ayrılmalıdır.", "EF ve HTTP çağrılarında async API tercih edilir."] },
      { title: "Task ve Thread", description: "Thread işletim sistemi kaynağı, Task ise tamamlanacak işi temsil eden üst seviye abstraction'dır.", points: ["Her Task yeni thread değildir.", "Thread Pool thread'leri tekrar kullanır.", "Task.Run web I/O kodunda gereksizdir."] },
      { title: "Async all the way", description: "Controller'dan repository'ye kadar zincirin tamamı async olmalıdır. Aradaki .Result veya .Wait çağrısı thread starvation ve deadlock riski oluşturur.", points: ["async void yalnız event handler içindir.", "Task ve Task<T> dönüş tipi kullanılır.", "Exception await noktasında çağırana taşınır."] },
      { title: "Task composition", description: "Bağımsız I/O işleri aynı anda başlatılarak toplam bekleme azaltılır.", points: ["WhenAll tüm sonuçları bekler.", "WhenAny ilk tamamlananı verir.", "Parallel.ForEachAsync concurrency sınırıyla koleksiyon işler."] },
      { title: "Cancellation", description: "İstemci isteği iptal ettiğinde gereksiz iş sürdürülmemelidir. CancellationToken action'dan alt katmanlara taşınır.", points: ["ThrowIfCancellationRequested hızlı çıkış sağlar.", "Task.Delay token kabul eder.", "OperationCanceledException normal iptal akışıdır."] },
      { title: "Async API yüzeyi", description: "Önceki session'larda yazılan Auth ve Bank servisleri async controller'larla HTTP'ye açılır; Products akışı da uçtan uca async olur.", points: ["Action dönüşü Task<ActionResult<T>> olur.", "EF Core async extension'ları kullanılır.", "CancellationToken gerekirse service'e iletilir."] }
    ],
    checklist: ["IAsyncDemoService sözleşmesini oluştur.", "Delay, WhenAll, WhenAny ve cancellation örneklerini uygula.", "Parallel.ForEachAsync örneğini thread-safe koleksiyonla ekle.", "AsyncDemoController endpoint'lerini oluştur.", "AuthController ile register/login/profile endpoint'lerini aç.", "BankController ile hesap ve transfer endpoint'lerini aç.", "ProductsController ve service çağrılarını async hale getir.", "IAsyncDemoService DI kaydını yap.", "Sıralı/paralel süre karşılaştırmasını çalıştır.", "İptal, login-token-profile ve banka transferi akışlarını doğrula."],
    code: [
      { title: "WhenAll ve WhenAny örneklerini ekle", why: "Bağımsız çağrıların paralel yürütülmesi ve en hızlı cevabın seçilmesi karşılaştırılır.", file: "ECommerceApi/Services/AsyncDemoService.cs", language: "csharp", code: String.raw`public async Task<IEnumerable<string>> GetMultipleDataParallelAsync()
{
    var tasks = new[]
    {
        SimulateApiCallAsync("API-1", 1000),
        SimulateApiCallAsync("API-2", 1500),
        SimulateApiCallAsync("API-3", 800)
    };
    return await Task.WhenAll(tasks);
}

public async Task<string> GetFastestResponseAsync()
{
    var tasks = new[]
    {
        SimulateApiCallAsync("Fast-API", 200),
        SimulateApiCallAsync("Medium-API", 500),
        SimulateApiCallAsync("Slow-API", 1000)
    };
    return await await Task.WhenAny(tasks);
}` },
      { title: "CancellationToken'ı işle", why: "İstemci vazgeçtiğinde uzun iş kontrollü biçimde durur.", file: "ECommerceApi/Services/AsyncDemoService.cs", language: "csharp", code: String.raw`public async Task<string> GetDataWithCancellationAsync(
    CancellationToken cancellationToken)
{
    for (var step = 1; step <= 10; step++)
    {
        cancellationToken.ThrowIfCancellationRequested();
        _logger.LogInformation("Processing step {Step}/10", step);
        await Task.Delay(500, cancellationToken);
    }
    return "Operation completed successfully";
}` },
      { title: "Paralel endpoint'i oluştur", why: "WhenAll davranışı ve toplam süre HTTP üzerinden gözlemlenir.", file: "ECommerceApi/Controllers/AsyncDemoController.cs", language: "csharp", code: String.raw`[HttpGet("parallel")]
public async Task<ActionResult> ParallelAsync()
{
    var startedAt = DateTime.UtcNow;
    var results = await _asyncService.GetMultipleDataParallelAsync();
    var elapsed = (DateTime.UtcNow - startedAt).TotalMilliseconds;

    return Ok(new
    {
        results,
        totalTimeMs = elapsed,
        note = "Toplam süre en uzun süren işlem kadardır"
    });
}` },
      { title: "JWT profile endpoint'ini aç", why: "Token claim'i okunur ve kimliği doğrulanmış kullanıcı service üzerinden getirilir.", file: "ECommerceApi/Controllers/AuthController.cs", language: "csharp", code: String.raw`[HttpGet("profile")]
[Authorize]
public async Task<ActionResult<UserDto>> GetProfile()
{
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim is null || !int.TryParse(userIdClaim.Value, out var userId))
        return Unauthorized(new { message = "Invalid token" });

    var user = await _authService.GetUserByIdAsync(userId);
    return user is null ? NotFound() : Ok(user);
}` },
      { title: "Transfer endpoint'ini aç", why: "Session 6'daki transaction service'i HTTP üzerinden kullanılabilir hale gelir.", file: "ECommerceApi/Controllers/BankController.cs", language: "csharp", code: String.raw`[HttpPost("transfer")]
[ProducesResponseType(typeof(TransferResponseDto), StatusCodes.Status200OK)]
public async Task<ActionResult<TransferResponseDto>> Transfer(
    [FromBody] TransferRequestDto request)
{
    if (!ModelState.IsValid) return BadRequest(ModelState);
    var result = await _bankService.TransferAsync(request);
    return Ok(result);
}` }
    ]
  },
  8: {
    theory: [
      { title: "Test stratejisi", description: "Testler davranışı güvenceye alır; her test seviyesi farklı risk ve maliyet taşır. Hızlı unit testler çok, daha kapsamlı integration testler seçici yazılır.", points: ["Test piramidi geri bildirim süresini korur.", "Davranış test edilir, implementasyon detayı değil.", "Regression hataları otomatik yakalanır."] },
      { title: "xUnit yaşam döngüsü", description: "xUnit her test için yeni sınıf instance'ı oluşturur. Fact tek örneği, Theory parametrik senaryoları tanımlar.", points: ["Test adı koşul ve beklenen sonucu anlatır.", "Arrange veriyi hazırlar.", "Act tek davranışı çalıştırır, Assert sonucu doğrular."] },
      { title: "Mocking", description: "Moq gerçek bağımlılık yerine kontrollü cevap veren test double üretir. Böylece yalnız test edilen sınıfın davranışı ölçülür.", points: ["Setup bağımlılık cevabını belirler.", "Verify çağrıyı doğrular.", "Her şeyi mock'lamak yerine sınırlar mock'lanır."] },
      { title: "Service unit testleri", description: "ProductService testinde repository mock'lanır; mapping, not-found, create ve delete davranışları izole doğrulanır.", points: ["Başarılı ve başarısız path ayrı test edilir.", "Async setup ReturnsAsync kullanır.", "FluentAssertions okunabilir sonuç üretir."] },
      { title: "Controller unit testleri", description: "Controller testi HTTP sunucusu açmadan action result tipini doğrular. Service mock'u controller'ı iş mantığından ayırır.", points: ["OkObjectResult ve NotFoundResult ayrılır.", "CreatedAtAction 201 sözleşmesini doğrular.", "Controller'ın service'e delege ettiği gözlenir."] },
      { title: "Integration test", description: "WebApplicationFactory uygulamayı gerçek middleware ve routing pipeline'ıyla bellekte başlatır. Test HttpClient gerçek HTTP isteği yapar.", points: ["Program partial class ile görünür olur.", "Gerçek SQLite kaydı testte InMemory ile değiştirilir.", "Status code ve JSON birlikte doğrulanır."] },
      { title: "AI ve test kalitesi", description: "AI test senaryosu ve boilerplate üretimini hızlandırabilir; fakat assertion'ın gerçekten davranışı kanıtlayıp kanıtlamadığı insan tarafından incelenmelidir.", points: ["Üretilen test mutlaka çalıştırılır.", "False positive riski gözden geçirilir.", "Coverage kalite hedefi değil, eksik alan sinyalidir."] }
    ],
    checklist: ["xUnit test projesi oluştur ve solution'a ekle.", "API projesine project reference ekle.", "Moq, FluentAssertions, MVC Testing ve EF InMemory paketlerini kur.", "Program sınıfını WebApplicationFactory için partial yap.", "ProductService için başarı ve hata unit testleri yaz.", "BankService transaction senaryolarını mock'larla test et.", "ProductsController response tiplerini unit test et.", "WebApplicationFactory fixture'ı oluştur.", "DbContext kaydını InMemory provider ile değiştir.", "GET, POST, invalid request ve not-found integration testlerini yaz.", "dotnet test çalıştır ve tüm testleri yeşil doğrula.", "İsteğe bağlı coverage raporu üret ve test boşluklarını incele."],
    code: [
      { title: "Test projesini ve paketleri kur", why: "Unit ve integration test altyapısı API projesinden ayrı bir assembly'de hazırlanır.", file: "Terminal", language: "bash", code: String.raw`dotnet new xunit -n ECommerceApi.Tests
dotnet sln add ECommerceApi.Tests/ECommerceApi.Tests.csproj
dotnet add ECommerceApi.Tests reference ECommerceApi/ECommerceApi.csproj
dotnet add ECommerceApi.Tests package Moq
dotnet add ECommerceApi.Tests package FluentAssertions
dotnet add ECommerceApi.Tests package Microsoft.AspNetCore.Mvc.Testing --version 8.0.0
dotnet add ECommerceApi.Tests package Microsoft.EntityFrameworkCore.InMemory --version 8.0.0` },
      { title: "ProductService unit testi yaz", why: "Repository izole edilerek service'in mapping ve not-found davranışı doğrulanır.", file: "ECommerceApi.Tests/UnitTests/ProductServiceTests.cs", language: "csharp", code: String.raw`[Fact]
public async Task GetByIdAsync_WhenProductExists_ReturnsProduct()
{
    var entity = new ProductEntity { Id = 1, Name = "Laptop", Price = 25000 };
    _repository.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(entity);

    var result = await _service.GetByIdAsync(1);

    result.Should().NotBeNull();
    result!.Id.Should().Be(1);
    result.Name.Should().Be("Laptop");
}

[Fact]
public async Task GetByIdAsync_WhenProductDoesNotExist_ReturnsNull()
{
    _repository.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((ProductEntity?)null);
    var result = await _service.GetByIdAsync(999);
    result.Should().BeNull();
}` },
      { title: "Controller response tipini test et", why: "Service sonucu HTTP action result sözleşmesine doğru çevriliyor mu kontrol edilir.", file: "ECommerceApi.Tests/UnitTests/ProductsControllerTests.cs", language: "csharp", code: String.raw`[Fact]
public async Task GetById_ShouldReturnNotFound_WhenProductNotExists()
{
    _mockService.Setup(s => s.GetByIdAsync(999))
        .ReturnsAsync((ProductDto?)null);

    var result = await _controller.GetById(999);

    result.Result.Should().BeOfType<NotFoundResult>();
}

[Fact]
public async Task Create_ShouldReturnCreated_WhenValidDto()
{
    var dto = new CreateProductDto { Name = "New Product", Price = 500, Stock = 10 };
    _mockService.Setup(s => s.CreateAsync(dto))
        .ReturnsAsync(new ProductDto { Id = 1, Name = dto.Name, Price = dto.Price });

    var result = await _controller.Create(dto);

    result.Result.Should().BeOfType<CreatedAtActionResult>()
        .Which.StatusCode.Should().Be(201);
}` },
      { title: "Integration test factory'sini hazırla", why: "Gerçek API pipeline'ı çalışırken production veritabanı izole InMemory provider ile değiştirilir.", file: "ECommerceApi.Tests/IntegrationTests/ProductsApiTests.cs", language: "csharp", code: String.raw`public class ProductsApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ProductsApiTests(WebApplicationFactory<Program> factory)
    {
        var testFactory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(d =>
                    d.ServiceType == typeof(DbContextOptions<BootcampDbContext>));
                if (descriptor is not null) services.Remove(descriptor);

                services.AddDbContext<BootcampDbContext>(options =>
                    options.UseInMemoryDatabase("TestDatabase"));
            });
        });
        _client = testFactory.CreateClient();
    }

    [Fact]
    public async Task GetProducts_ShouldReturnOk()
    {
        var response = await _client.GetAsync("/api/products");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}` },
      { title: "Testleri çalıştır", why: "Unit ve integration suite aynı komutla derlenir ve yürütülür.", file: "Terminal", language: "bash", code: String.raw`dotnet test
dotnet test --collect:"XPlat Code Coverage"` }
    ]
  },
  9: {
    theory: [
      { title: "Observability", description: "Observability sistemin dış çıktılarından iç durumunu anlayabilme yeteneğidir. Üretimde debugger yerine telemetry kullanılır.", points: ["Log ne olduğunu anlatır.", "Metric ne kadar olduğunu ölçer.", "Trace nerede zaman harcandığını gösterir."] },
      { title: "Structured logging", description: "Serilog message template içindeki alanları ayrı property olarak saklar; loglar yalnız metin değil sorgulanabilir veri olur.", points: ["String interpolation yerine named property kullanılır.", "Sink logun nereye gideceğini belirler.", "Enricher ortak context ekler."] },
      { title: "Log seviyeleri", description: "Seviye olayın önemini belirtir ve ortama göre filtrelenir.", points: ["Trace/Debug geliştirme ayrıntısıdır.", "Information normal iş akışıdır.", "Warning beklenmeyen durum, Error başarısız işlemdir."] },
      { title: "OpenTelemetry", description: "OpenTelemetry vendor bağımsız metric ve trace standardıdır. Instrumentation framework davranışını otomatik ölçer.", points: ["ASP.NET Core request ölçümleri eklenir.", "Runtime metric'leri toplanır.", "Prometheus `/metrics` endpoint'ini scrape eder."] },
      { title: "Custom telemetry", description: "Teknik metric'lerin yanında ürün oluşturma veya diagnostics ping gibi iş metric'leri Meter ile tanımlanır; özel span'lar ActivitySource ile üretilir.", points: ["Counter toplam olay sayısını tutar.", "Histogram süre dağılımını ölçer.", "Tag trace'e iş bağlamı ekler."] },
      { title: "Correlation ID", description: "Her request benzersiz ID taşır. Bu ID response'a ve tüm loglara eklenerek aynı isteğin çıktıları bir araya getirilir.", points: ["Gelen header varsa korunur.", "Yoksa GUID üretilir.", "Middleware pipeline'ın başında olmalıdır."] },
      { title: "Health ve diagnostics", description: "Health endpoint platformun uygulamayı yöneteceği sinyali; diagnostics endpoint ise sürüm, ortam ve telemetry davranışını gözlemleme aracıdır.", points: ["Load balancer sağlıksız instance'ı çıkarır.", "Diagnostics üretimde yetkilendirilmeli veya sınırlandırılmalıdır.", "Metric ve log aynı çağrıda doğrulanabilir."] }
    ],
    checklist: ["Serilog ASP.NET Core ve sink paketlerini ekle.", "OpenTelemetry hosting, ASP.NET, HTTP, runtime ve Prometheus paketlerini ekle.", "Serilog ayarlarını appsettings'e taşı.", "CorrelationIdMiddleware oluştur.", "AppTelemetry Meter, Counter ve Histogram tanımlarını ekle.", "DiagnosticsController ile ping, log-level ve work endpoint'lerini oluştur.", "UseSerilog ve request logging'i bağla.", "OpenTelemetry metrics/tracing pipeline'ını kaydet.", "Prometheus scraping endpoint'ini aç.", "Correlation middleware'i pipeline'ın başına yerleştir.", "Response header, structured log, `/metrics` ve custom trace'i doğrula."],
    code: [
      { title: "Correlation ID middleware'ini ekle", why: "İstek kimliği HttpContext, response ve Serilog context'inde aynı değeri taşır.", file: "ECommerceApi/Observability/CorrelationIdMiddleware.cs", language: "csharp", code: String.raw`using Serilog.Context;

namespace ECommerceApi.Observability;

public class CorrelationIdMiddleware
{
    public const string HeaderName = "X-Correlation-ID";
    private readonly RequestDelegate _next;
    public CorrelationIdMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        var id = context.Request.Headers.TryGetValue(HeaderName, out var existing)
            && !string.IsNullOrWhiteSpace(existing)
                ? existing.ToString()
                : Guid.NewGuid().ToString();

        context.Items[HeaderName] = id;
        context.TraceIdentifier = id;
        context.Response.OnStarting(() =>
        {
            context.Response.Headers[HeaderName] = id;
            return Task.CompletedTask;
        });

        using (LogContext.PushProperty("CorrelationId", id))
            await _next(context);
    }
}` },
      { title: "Custom metric'leri tanımla", why: "Framework metric'lerine ek olarak bootcamp'e özgü olay ve süreler ölçülür.", file: "ECommerceApi/Observability/AppTelemetry.cs", language: "csharp", code: String.raw`using System.Diagnostics;
using System.Diagnostics.Metrics;

namespace ECommerceApi.Observability;

public class AppTelemetry
{
    public const string MeterName = "ECommerceApi.Metrics";
    public const string ActivitySourceName = "ECommerceApi.Tracing";
    public static readonly ActivitySource ActivitySource = new(ActivitySourceName);

    private readonly Counter<long> _diagnosticsPings;
    private readonly Histogram<double> _workDuration;

    public AppTelemetry(IMeterFactory factory)
    {
        var meter = factory.Create(MeterName);
        _diagnosticsPings = meter.CreateCounter<long>("ecommerce.diagnostics.pings");
        _workDuration = meter.CreateHistogram<double>("ecommerce.diagnostics.work.duration", "ms");
    }

    public void PingHandled() => _diagnosticsPings.Add(1);
    public void RecordWork(double milliseconds) => _workDuration.Record(milliseconds);
}` },
      { title: "Metric ve trace üreten endpoint yaz", why: "Tek çağrıda log, histogram ve custom span davranışı gözlemlenir.", file: "ECommerceApi/Controllers/DiagnosticsController.cs", language: "csharp", code: String.raw`[HttpGet("work")]
public async Task<IActionResult> DoWork([FromQuery] int ms = 250)
{
    using var activity = AppTelemetry.ActivitySource.StartActivity("SimulatedWork");
    activity?.SetTag("work.requested_ms", ms);

    var stopwatch = Stopwatch.StartNew();
    _logger.LogInformation("Simüle iş başladı: {DurationMs}ms", ms);
    await Task.Delay(ms);
    stopwatch.Stop();

    _telemetry.RecordWork(stopwatch.Elapsed.TotalMilliseconds);
    activity?.SetTag("work.actual_ms", stopwatch.ElapsedMilliseconds);
    return Ok(new { elapsedMs = stopwatch.ElapsedMilliseconds, traceId = activity?.TraceId });
}` },
      { title: "Serilog ve OpenTelemetry'yi bağla", why: "Log, metric ve trace sağlayıcıları uygulama başlangıcında merkezi yapılandırılır.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`builder.Host.UseSerilog((context, services, config) => config
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services)
    .Enrich.FromLogContext());

builder.Services.AddSingleton<AppTelemetry>();
builder.Services.AddOpenTelemetry()
    .WithMetrics(metrics => metrics
        .AddMeter(AppTelemetry.MeterName)
        .AddAspNetCoreInstrumentation()
        .AddRuntimeInstrumentation()
        .AddPrometheusExporter())
    .WithTracing(tracing => tracing
        .AddSource(AppTelemetry.ActivitySourceName)
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation());

app.UseCorrelationId();
app.UseSerilogRequestLogging();
app.MapPrometheusScrapingEndpoint();` }
    ]
  },
  10: {
    theory: [
      { title: "Ortam ve configuration", description: "Aynı build development, staging ve production'da farklı external configuration ile çalışır. Image ortamdan bağımsız tutulur.", points: ["Environment variable appsettings değerini override eder.", "Secret image içine yazılmaz.", "Production log ve hata politikası daha sıkıdır."] },
      { title: "Kestrel ve reverse proxy", description: "Kestrel ASP.NET Core uygulamasını çalıştırır; Nginx/IIS gibi reverse proxy TLS termination, routing ve load balancing sağlayabilir.", points: ["Container içinde Kestrel 8080 dinler.", "Dış port mapping ile yayınlanır.", "Forwarded headers gerçek istemci bilgisini korur."] },
      { title: "Docker image", description: "Image uygulamanın immutable paketidir. Multi-stage build SDK'yı yalnız derleme aşamasında tutar ve final image'ı küçültür.", points: ["Önce csproj kopyalamak restore cache'i sağlar.", "Publish Release modunda yapılır.", "Final stage yalnız ASP.NET runtime içerir."] },
      { title: "Docker Compose", description: "Compose API ve Seq gibi bağlı servisleri tek deklaratif dosyayla çalıştırır.", points: ["Service adları dahili DNS ismidir.", "Environment variable nested config'i override eder.", "Named volume container silinse de veriyi korur."] },
      { title: "CI pipeline", description: "Continuous Integration her push'ta temiz ortamda restore, build ve test çalıştırır; bozuk değişikliklerin ilerlemesini engeller.", points: ["--no-restore gereksiz işi önler.", "Release build production davranışına yakındır.", "Image yalnız testler geçince oluşturulur."] },
      { title: "Yayın stratejileri", description: "Blue-green, canary ve rolling deployment yeni sürüm riskini farklı yöntemlerle azaltır.", points: ["Blue-green hızlı switch ve rollback sağlar.", "Canary trafiğin küçük kısmıyla doğrular.", "Rolling instance'ları sırayla günceller."] },
      { title: "Operasyonel doğrulama", description: "Deployment yalnız container'ın başlaması değildir; health, log, metric, persistence ve rollback birlikte doğrulanmalıdır.", points: ["API ve Seq erişimi kontrol edilir.", "Container restart sonrası veri korunmalıdır.", "Pipeline çıktısı release kaydıdır."] }
    ],
    checklist: ["Docker/OrbStack kurulumunu doğrula.", ".dockerignore ile build context'i küçült.", "Multi-stage Dockerfile oluştur.", "Image build et ve API'yi 8080 portunda çalıştır.", "Serilog Seq sink paketini ve konfigürasyonunu ekle.", "Compose içinde API ve Seq servislerini tanımla.", "Connection string ve Seq adresini environment variable ile override et.", "DB, log ve Seq için named volume ekle.", "Compose ortamını build edip ayağa kaldır.", "Bitbucket pipeline'da restore → build → test akışını oluştur.", "Main branch için test sonrası Docker build adımı ekle.", "Swagger, Seq, log persistence ve pipeline sonucunu doğrula."],
    code: [
      { title: "Multi-stage image oluştur", why: "SDK yalnız build aşamasında kalır; final image daha küçük ve saldırı yüzeyi daha düşüktür.", file: "Dockerfile", language: "dockerfile", code: String.raw`FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ECommerceApi/ECommerceApi.csproj ECommerceApi/
RUN dotnet restore ECommerceApi/ECommerceApi.csproj
COPY ECommerceApi/ ECommerceApi/
RUN dotnet publish ECommerceApi/ECommerceApi.csproj \
    -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "ECommerceApi.dll"]` },
      { title: "API ve Seq compose ortamını kur", why: "Uygulama, log sunucusu, network ve kalıcı volume'ler tek komutla yönetilir.", file: "docker-compose.yml", language: "yaml", code: String.raw`services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Data Source=/app/data/bootcamp.db
      - Serilog__WriteTo__2__Args__serverUrl=http://seq:5341
    depends_on:
      - seq
    volumes:
      - api-data:/app/data
      - api-logs:/app/logs

  seq:
    image: datalust/seq:latest
    ports:
      - "5341:80"
    environment:
      - ACCEPT_EULA=Y
    volumes:
      - seq-data:/data

volumes:
  api-data:
  api-logs:
  seq-data:` },
      { title: "Build ve test pipeline'ını ekle", why: "Her push temiz .NET SDK ortamında doğrulanır; main için image üretimi ayrı kalite kapısıdır.", file: "bitbucket-pipelines.yml", language: "yaml", code: String.raw`image: mcr.microsoft.com/dotnet/sdk:8.0

pipelines:
  default:
    - step:
        name: Build & Test
        caches:
          - dotnetcore
        script:
          - dotnet restore
          - dotnet build --no-restore -c Release
          - dotnet test --no-build -c Release
  branches:
    main:
      - step:
          name: Build & Test
          script:
            - dotnet restore
            - dotnet build --no-restore -c Release
            - dotnet test --no-build -c Release
      - step:
          name: Docker Build
          services:
            - docker
          script:
            - docker build -t ecommerceapi:$BITBUCKET_COMMIT .` },
      { title: "Container ortamını doğrula", why: "Image ve çoklu servis akışı yerelde production benzeri biçimde test edilir.", file: "Terminal", language: "bash", code: String.raw`docker build -t ecommerceapi:local .
docker run --rm -p 8080:8080 \
  -e ASPNETCORE_ENVIRONMENT=Development ecommerceapi:local

docker compose up --build
# API: http://localhost:8080/swagger
# Seq: http://localhost:5341` }
    ]
  }
};
