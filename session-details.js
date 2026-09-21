window.sessionDetails = {
  1: {
    theory: [
            { title: ".NET Platformu", description: "Projeye başlamadan önce kodun hangi platform üzerinde çalışacağını netleştiriyoruz. .NET 8; çalışma zamanı, standart kütüphaneler ve araç zinciriyle sonraki tüm session'ların temelini oluşturacak.", points: [".NET'in açık kaynaklı ve çok platformlu yapısı", "C#, F# ve VB.NET'in ortak çalışma zamanı", "Web, masaüstü, mobil, bulut, IoT ve oyun kullanım alanları"] },
            { title: "Modern .NET Ekosistemi", description: "Yeni API'yi eski .NET Framework yerine modern ve çok platformlu .NET 8 üzerinde kuruyoruz. LTS seçimi, eğitim boyunca aynı kararlı çalışma tabanını korumamızı sağlayacak.", points: [".NET Framework ile modern .NET arasındaki farklar", ".NET Core'dan .NET 8'e geçiş", "Yeni projelerde LTS sürüm tercihinin önemi"] },
            { title: "CLR ve CTS", description: "İlk C# kodunu yazmadan önce bu kodun nasıl çalıştırılacağını anlamlandırıyoruz. CLR yürütme ve belleği, CTS ise projedeki tiplerin ortak kurallarını yönetecek.", points: ["CLR: kodun çalışması, JIT ve bellek yönetimi", "CTS: .NET dilleri arasındaki ortak tip sistemi", "Garbage Collector'ın temel sorumluluğu"] },
            { title: "Web API ve REST", description: "Boş projeye dış dünyayla konuşacağı HTTP yüzeyini ekliyoruz. Product kaynağını GET, POST, PUT ve DELETE üzerinden yöneterek ilk REST sözleşmesini kuracağız.", points: ["İstemci ile sunucu arasındaki HTTP iletişimi", "Kaynak odaklı ve stateless REST yaklaşımı", "GET, POST, PUT ve DELETE metotlarının CRUD karşılıkları"] },
            { title: "HTTP Yanıtları ve Veri Formatları", description: "Endpoint'lerin yalnız çalışması yetmez; istemcinin sonucu doğru yorumlaması gerekir. Bu nedenle her işlem için uygun status code ve ortak JSON yanıt biçimi ekliyoruz.", points: ["200, 201, 204, 400, 404 ve 500 durum kodları", "Modern API standardı olarak JSON", "XML'in legacy ve SOAP sistemlerindeki yeri"] },
            { title: "ASP.NET Core Proje Yapısı", description: "Solution iskeletini Program.cs, model ve controller sorumluluklarıyla kuruyoruz. Route/query örnekleri ve Swagger, sonraki session'larda büyüteceğimiz ilk çalışan API yüzeyini oluşturacak.", points: ["Controller, model ve `Program.cs` sorumlulukları", "Route ve query string parametreleri", "Swagger üzerinden API keşfi ve testi"] }
    ],
        checklist: [".NET 8 ortamını doğrula ve controller tabanlı Web API oluştur.", "HelloController ile basit, route ve query parametreli endpoint'ler yaz.", "Product modelini tanımla.", "Bellekte çalışan ProductsController CRUD endpoint'lerini oluştur.", "WeatherController ile JSON yanıt örneği ekle.", "Tüm endpoint'leri Swagger veya HTTP istemcisiyle doğrula."],
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
            { title: "ASP.NET Core Mimarisi", description: "S1'de istek doğrudan controller içindeki iş mantığına ulaşıyordu. Şimdi request'in Kestrel, middleware, controller ve yeni service katmanından geçeceği açık bir akış kuruyoruz.", points: ["Kestrel ve çok platformlu çalışma modeli", "`Program.cs` ve `appsettings.json` sorumlulukları", "Request → middleware → controller → service → response akışı"] },
            { title: "Dependency Injection", description: "Controller'ın ihtiyaç duyduğu service'i kendisinin üretmesi yerine DI container'dan almasını sağlıyoruz. Böylece implementasyon değişebilir, yaşam süresi yönetilebilir ve sınıflar daha sonra kolayca test edilebilir.", points: ["Bağımlılıkların constructor üzerinden verilmesi", "Gevşek bağlı ve test edilebilir tasarım", "Transient, scoped ve singleton yaşam süreleri"] },
            { title: "Katmanlı Mimari", description: "S1'de ProductsController hem HTTP'yi hem CRUD kurallarını yönetiyordu. Bu session'da iş mantığını ProductService'e taşıyıp controller'ı yalnız request ve response koordinasyonuna indiriyoruz.", points: ["Controller'ın yalnızca HTTP akışını yönetmesi", "İş kurallarının service katmanına taşınması", "Interface kullanarak uygulama detaylarının soyutlanması"] },
            { title: "DTO ve Validation", description: "Product modelini doğrudan dışarı açmak yerine create, update ve response için ayrı DTO'lar ekliyoruz. Validation kuralları geçersiz veriyi service'e ulaşmadan API sınırında durduracak.", points: ["API sözleşmesini iç modelden ayırma", "Create, update ve response DTO'ları", "`Required`, `StringLength` ve `Range` doğrulamaları"] },
            { title: "Middleware Pipeline", description: "Her action'a ayrı try/catch ve süre ölçümü eklemek yerine bu davranışları pipeline'a taşıyoruz. Exception handling ve request logging tüm mevcut ve gelecek endpoint'lere tek noktadan uygulanacak.", points: ["Middleware zincirinde sıranın önemi", "Merkezi exception handling", "İstek ve işlem süresi loglama"] },
            { title: "Configuration ve Logging", description: "Kod içine gömülebilecek ayarları appsettings bölümlerine, ardından strongly typed options sınıflarına taşıyoruz. ILogger kayıtları da yeni katmanlarda ne olduğunu izlememizi sağlayacak.", points: ["Ortama göre `appsettings` katmanları", "Options Pattern ile strongly typed ayarlar", "Log seviyeleri ve `ILogger` kullanımı"] },
            { title: "Routing ve API Dokümantasyonu", description: "S1'deki temel route'ları korurken yeni DTO ve validation sözleşmesini Swagger'da görünür kılıyoruz. Binding kaynaklarını açık kullanmak, S3'te genişleyecek API sözleşmesine hazırlık olacak.", points: ["Attribute routing ve model binding", "Route, query ve body kaynakları", "Swagger ile etkileşimli dokümantasyon"] }
    ],
        checklist: ["Swagger paketini ve servis kayıtlarını ekle.", "Options sınıflarını ve yapılandırma bölümlerini oluştur.", "Product request/response DTO'larını validation kurallarıyla tanımla.", "IProductService ve ProductService katmanını oluştur.", "Exception handling ve request logging middleware'lerini ekle.", "ProductsController içindeki iş mantığını service'e taşı.", "Geçerli ve geçersiz istekleri Swagger üzerinden doğrula."],
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
            { title: "API Sözleşmesi", description: "S2 katmanları düzenledi ama istemcinin gördüğü liste ve hata sözleşmesini değiştirmedi. Şimdi endpoint'lerin girdilerini, başarılı yanıtlarını ve hata biçimlerini öngörülebilir hale getiriyoruz.", points: ["Kaynak odaklı endpoint tasarımı", "HTTP metodu ve durum kodu uyumu", "İstemcinin öngörebileceği tutarlı yanıt yapısı"] },
            { title: "Model Binding Kaynakları", description: "Tekil ID, liste seçenekleri ve request body artık farklı amaçlar taşıyor. Her girdiyi route, query, body veya header kaynağıyla açıkça işaretleyerek yeni query sözleşmesini okunur kılıyoruz.", points: ["`[FromRoute]` ile kaynak kimliği", "`[FromQuery]` ile arama ve listeleme seçenekleri", "`[FromBody]` ve `[FromHeader]` kullanım alanları"] },
            { title: "Routing Kuralları", description: "S2'de herhangi bir integer ID action'a ulaşabiliyordu. Pozitif ID constraint'i ve named route ekleyerek geçersiz URL'yi controller çalışmadan reddediyor, CreatedAtAction akışını belirginleştiriyoruz.", points: ["Attribute routing ve adlandırılmış route'lar", "`{id:int:min(1)}` gibi route constraint'leri", "Geçersiz URL'nin controller'a ulaşmadan reddedilmesi"] },
            { title: "Filtreleme, Sıralama ve Sayfalama", description: "GetAll artık tüm koleksiyonu sınırsız döndürmeyecek. ProductQueryParameters girdisini service'te filtreleyip sıralayacak, PagedResult ile yalnız istenen pencereyi ve gezinme bilgisini sunacağız.", points: ["`ProductQueryParameters` ile sorgu sözleşmesi", "Filtrele → sırala → say → sayfala işlem sırası", "`PagedResult<T>` ile veri ve sayfalama metadatası", "İstemci kaynak tüketimini sınırlayan maksimum sayfa boyutu"] },
            { title: "Standart Hata Yanıtları", description: "S2 middleware'i beklenmeyen hataları yakalıyor fakat kaynak bulunamadığında standart ayrıntı üretmiyor. Problem Details ekleyerek 404 dahil tüm istemciler için aynı hata alanlarını kullanıyoruz.", points: ["Problem Details yaklaşımı", "`title`, `status`, `detail` ve `traceId` alanları", "Tüm istemciler için tek hata formatı"] },
            { title: "Swagger ve XML Dokümantasyonu", description: "Yeni query parametreleri ve yanıt türleri kodda kalmamalı. XML yorumlarını ve ProducesResponseType tanımlarını Swagger'a bağlayarak genişleyen sözleşmeyi istemciye eksiksiz gösteriyoruz.", points: ["XML yorumlarından endpoint açıklaması üretme", "`ProducesResponseType` ile olası yanıtları belirtme", "API davranışını kodla birlikte güncel tutma"] }
    ],
        checklist: ["ProductQueryParameters ve PagedResult<T> DTO'larını oluştur.", "Product service'e filtreleme, sıralama ve sayfalama ekle.", "Query modelini controller'a [FromQuery] ile bağla.", "Product ID route'una tip ve minimum değer constraint'i ekle.", "Bulunamayan kaynakları Problem Details formatında döndür.", "XML açıklamalarını Swagger'a dahil et.", "Sayfalama, hatalı route ve 404 senaryolarını doğrula."],
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
            { title: "Veri Erişim Yaklaşımları", description: "S3'te service bir List<Product> üzerinde çalışıyor ve restart tüm veriyi siliyor. ADO.NET, Dapper ve EF Core seçeneklerini karşılaştırıp bu projeye Code First EF Core eklemeyi seçiyoruz.", points: ["Düşük seviyeli ADO.NET yaklaşımı", "ORM olarak Entity Framework Core", "Hafif ORM alternatifi Dapper"] },
            { title: "ORM ve Entity Tasarımı", description: "API DTO'larından bağımsız kalıcı Product ve Category entity'leri ekliyoruz. Navigation property'leriyle kategori-ürün ilişkisini veritabanı modeline dahil ediyoruz.", points: ["Tabloların C# sınıflarıyla eşlenmesi", "Product ve Category entity'leri", "Bir-çok ilişki ve navigation property'leri"] },
            { title: "DbContext ve DbSet", description: "Bellekteki koleksiyonun yerini BootcampDbContext ve DbSet'ler alacak. EF Core change tracker değişiklikleri izleyecek, SaveChanges ise bunları SQLite'a kalıcı yazacak.", points: ["DbContext'in veritabanı oturumu olarak rolü", "DbSet ile tablo erişimi", "Change tracking ve `SaveChanges` akışı"] },
            { title: "Code First ve Migrations", description: "Entity sınıflarını yalnız runtime modeli olarak bırakmıyoruz; Fluent API ile kuralları, migration ile fiziksel şemayı ekliyoruz. Böylece her geliştirici aynı veritabanını tekrar oluşturabilecek.", points: ["Entity sınıflarından şema üretimi", "Migration ile şema değişikliklerini versiyonlama", "Fluent API ile index, precision ve seed data"] },
            { title: "LINQ ve Veri Yükleme", description: "S3'teki filtreleme ve sayfalama artık IEnumerable yerine SQL'e çevrilen IQueryable üzerinde çalışacak. İlişkili Category verisini kontrollü yükleyerek gereksiz sorguları önlüyoruz.", points: ["Filtreleme, sıralama ve sayfalama sorguları", "Eager, lazy ve explicit loading farkları", "`Include` ile N+1 problemini önleme"] },
            { title: "Repository Pattern", description: "ProductService'in doğrudan DbContext ayrıntılarına bağlanmasını engellemek için repository sınırı ekliyoruz. Ortak CRUD generic repository'de, ürüne özel sorgular ProductRepository'de kalacak.", points: ["Generic repository ile ortak CRUD işlemleri", "Product repository ile özel sorgular", "Service katmanını veri erişim detayından ayırma"] },
            { title: "Soft Delete", description: "S3'te silme koleksiyondan fiziksel kaldırmaydı. IsDeleted ve global query filter ekleyerek kayıt geçmişini koruyor, mevcut sorgulara silinmiş veriyi otomatik gizliyoruz.", points: ["Veriyi fiziksel olarak silmeden işaretleme", "Global query filter ile silinen kayıtları gizleme", "Veri geçmişini koruma yaklaşımı"] }
    ],
        checklist: ["EF Core SQLite ve Design paketlerini ekle.", "Product ve Category entity'lerini oluştur.", "BootcampDbContext ve Fluent API kurallarını tanımla.", "Generic ve product repository katmanlarını ekle.", "Product service'i asenkron repository metotlarına bağla.", "Connection string ve DI kayıtlarını yapılandır.", "Migration oluşturup veritabanını hazırla.", "CRUD ve soft delete davranışını doğrula."],
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
            { title: "API Güvenliğinin Temelleri", description: "S4'ün kalıcı endpoint'leri kimlik sormadan herkese açık çalışıyor. Önce kullanıcıyı doğrulayacak authentication ile doğrulanmış kullanıcının yetkisini sınayacak authorization katmanlarını ayırıyoruz.", points: ["Yetkisiz erişimin veri ve iş süreçlerine etkisi", "Authentication: kullanıcının kim olduğunu doğrulama", "Authorization: kullanıcının ne yapabileceğini belirleme"] },
            { title: "JWT Yapısı", description: "Başarılı login sonrasında istemciye sunucuda session tutmadan kimlik taşıyacak JWT ekliyoruz. User ID, kullanıcı adı ve rolü claim olarak imzalayıp kısa ömürlü token'a dönüştürüyoruz.", points: ["Header, payload ve signature bölümleri", "User ID, kullanıcı adı, rol ve süre claim'leri", "Stateless kimlik doğrulama modeli"] },
            { title: "Token Doğrulama", description: "Üretilen token'ı kabul etmek tek başına güvenli değil. Bearer handler'a imza, issuer, audience ve expiration kontrollerini ekleyerek değiştirilmiş veya süresi geçmiş token'ları pipeline'da reddediyoruz.", points: ["İmza ve süre kontrolü", "Issuer ve audience doğrulaması", "HTTPS ve secret yönetiminin önemi"] },
            { title: "Kullanıcı Yönetimi", description: "S4'teki DbContext'e UserEntity ve roller ekleniyor. AuthService kayıt sırasında benzersiz kullanıcı/e-posta kontrolü yapacak, login sırasında kalıcı kullanıcıyı doğrulayacak.", points: ["`UserEntity` ve kullanıcı rolleri", "Kayıt ve giriş iş akışı", "Benzersiz kullanıcı adı ve e-posta kontrolü"] },
            { title: "Şifre Güvenliği", description: "Yeni User tablosuna düz parola yazmıyoruz. Register akışında BCrypt hash ve salt üretiyor, login akışında gelen parolayı geri döndürülemez hash üzerinden doğruluyoruz.", points: ["Şifrelerin düz metin saklanmaması", "BCrypt ile hash ve salt", "Giriş sırasında güvenli parola doğrulama"] },
            { title: "Yetkilendirme", description: "Kimliği doğrulama tamamlandıktan sonra mevcut endpoint'lere Authorize ve rol kuralları eklenebilir. Swagger'a Bearer desteği ekleyerek korumalı akışı login'den endpoint'e kadar test ediyoruz.", points: ["`[Authorize]` ile korumalı kaynaklar", "Role-based authorization", "Swagger'dan Bearer token ile test"] },
            { title: "Güvenlik Tehditleri", description: "Yeni kimlik katmanı saldırı yüzeyini de büyütüyor. EF Core'un parametreli sorgularını, HTTPS'i ve secret'ların konfigürasyon dışında tutulmasını bütünsel savunmanın parçaları olarak konumluyoruz.", points: ["SQL injection'a karşı ORM ve parametreli sorgular", "XSS ve CSRF kavramları", "Secret'ların kaynak kod dışında tutulması"] }
    ],
        checklist: ["JWT bearer ve BCrypt paketlerini ekle.", "Kullanıcı entity'sini, rolleri ve seed admin hesabını tanımla.", "JWT ayarlarını konfigürasyona taşı.", "Claim içeren token üreten JwtService katmanını oluştur.", "BCrypt kullanan register/login akışını AuthService içinde kur.", "Authentication ve authorization middleware'lerini bağla.", "Token üretme ve geçersiz token senaryolarını doğrula."],
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
            { title: "Transaction Temelleri", description: "S5'te her EF Core işlemi kendi başına tamamlanabiliyor; transfer gibi iki hesabı değiştiren akış yarıda kalabilir. Debit, credit ve işlem kaydını tek transaction içinde ya hep ya hiç çalışacak şekilde ekliyoruz.", points: ["Bir grup işlemin hep birlikte başarılı olması", "Commit ve rollback davranışı", "Banka transferi üzerinden all-or-nothing yaklaşımı"] },
            { title: "ACID Prensipleri", description: "Yeni transfer akışının yalnız kod sırasına değil veritabanı garantilerine de ihtiyacı var. ACID özellikleri bakiyelerin kurallı, eşzamanlı işlemlere dayanıklı ve commit sonrasında kalıcı kalmasını açıklayacak.", points: ["Atomicity ve consistency", "Isolation ve eşzamanlı işlemler", "Durability ve kalıcı sonuç"] },
            { title: "Isolation Seviyeleri", description: "Birden fazla transfer aynı hesaplara eriştiğinde ara bakiyelerin nasıl görüleceğini belirlememiz gerekir. Isolation seçeneklerini tutarlılık ve throughput maliyetleriyle değerlendiriyoruz.", points: ["Read Uncommitted ve dirty read", "Read Committed ve Repeatable Read", "Serializable ve tutarlılık-performans dengesi"] },
            { title: "Unit of Work Pattern", description: "BankService'i doğrudan DbContext transaction API'sine bağlamıyoruz. Begin, SaveChanges, Commit ve Rollback davranışlarını Unit of Work arkasına ekleyerek iş akışını veri erişim ayrıntısından ayırıyoruz.", points: ["Birden çok repository işlemini tek iş biriminde toplama", "Tek `SaveChanges` ve transaction sınırı", "Transaction yönetimini service katmanından soyutlama"] },
            { title: "Custom Exception Tasarımı", description: "S5'e kadar hatalar çoğunlukla null veya genel Exception ile ifade ediliyordu. Hesap bulunamadı, geçersiz istek ve yetersiz bakiye durumlarına ayrı domain exception tipleri ekliyoruz.", points: ["Not found ve validation hataları", "Conflict ve business rule hataları", "Yetersiz bakiye gibi anlamlı domain hataları"] },
            { title: "Global Exception Handling", description: "S2'de eklenen exception middleware'ini yeni domain tiplerini anlayacak şekilde genişletiyoruz. Her hata uygun HTTP koduna dönüşürken stack trace yalnız sunucu logunda kalacak.", points: ["Exception tiplerini HTTP durum kodlarına eşleme", "Tutarlı JSON hata sözleşmesi", "Teknik ayrıntıyı loglayıp istemciden gizleme"] },
            { title: "Async Hata ve İptal Yönetimi", description: "Transaction akışı asenkron EF çağrıları kullandığı için hata ve iptal de await zincirinde doğru taşınmalı. Rollback sonrasında throw ile özgün stack trace'i koruyup uzun işlemlere cancellation hazırlığı ekliyoruz.", points: ["`await` edilen task'tan hata yayılımı", "`throw;` ile stack trace'i koruma", "`CancellationToken` ile uzun işlemi iptal etme"] }
    ],
        checklist: ["Banka hesabı ve işlem kaydı entity'lerini oluştur.", "Domain'i ifade eden custom exception sınıflarını ekle.", "Transaction metotlarını sunan Unit of Work katmanını kur.", "Para transferini transaction içinde gerçekleştiren Bank service'i yaz.", "Hata durumunda rollback yap ve exception'ı üst katmana ilet.", "Global middleware'de exception → HTTP kodu eşlemesini yap.", "Başarılı, yetersiz bakiye ve bulunamayan hesap senaryolarını doğrula."],
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
            { title: "Senkron ve Asenkron Çalışma", description: "S6'nın veritabanı işlemleri I/O beklerken request thread'ini gereksiz yere tutmamalı. Mevcut akışı bloklamayan await zincirine dönüştürerek aynı kaynakla daha fazla isteğe hizmet vermeyi hedefliyoruz.", points: ["Bloklayan ve bloklamayan bekleme farkı", "I/O işlemlerinde thread'in serbest bırakılması", "Asenkron tasarımın ölçeklenebilirliğe etkisi"] },
            { title: "Task ve Thread", description: "Her async operation için yeni thread açmak yerine mevcut Task tabanlı .NET modelini kullanıyoruz. Thread Pool yürütme kaynağını, Task ise tamamlanmasını beklediğimiz işi temsil edecek.", points: ["Thread'in işletim sistemi kaynağı olması", "Task'ın bir iş soyutlaması olması", "Thread Pool ile kaynakların yeniden kullanılması"] },
            { title: "async ve await", description: "Controller action'larından service ve EF Core çağrılarına kadar Task/Task<T> dönüşlerini yayıyoruz. Böylece S6'daki transaction ve S5'teki auth işlemleri bloklamadan HTTP'ye açılabilecek.", points: ["`Task` ve `Task<T>` dönüş tipleri", "Sonucu bloklamadan bekleme", "Async all the way yaklaşımı"] },
            { title: "Kaçınılması Gereken Hatalar", description: "Yeni async zincirin arasına .Result veya Wait koymak kazandığımız ölçeklenebilirliği geri alır. Controller ve service yüzeylerinde async void kullanmayıp zinciri kesintisiz sürdürüyoruz.", points: ["`.Result` ve `.Wait()` ile bloklama", "Event handler dışındaki `async void` kullanımı", "Asenkron zinciri yarıda senkrona çevirmek"] },
            { title: "Paralel İş Akışları", description: "AsyncDemoService'e bağımsız çağrıların sıralı yerine birlikte başlatıldığı örnekler ekliyoruz. WhenAll toplam süreyi azaltırken WhenAny en hızlı sonucu seçmenin davranışını gösterecek.", points: ["`Task.WhenAll` ile tüm işleri bekleme", "`Task.WhenAny` ile ilk sonucu kullanma", "`Parallel.ForEachAsync` ile kontrollü paralellik"] },
            { title: "CancellationToken", description: "İstemci bağlantıyı kapattığında uzun demo veya veri işleminin sürmesini istemiyoruz. Request token'ını alt katmanlara taşıyıp beklemeleri ve döngüleri iptal edilebilir hale getiriyoruz.", points: ["İstemci bağlantısı kapandığında işi durdurma", "İptal sinyalini katmanlar boyunca taşıma", "`OperationCanceledException` davranışı"] },
            { title: "Web API'de Asenkronluk", description: "S5 AuthService ve S6 BankService artık AuthController ve BankController üzerinden erişilebilir olacak. ProductsController'ı da async service yüzeyine geçirerek API'nin tüm önemli akışlarını aynı modele getiriyoruz.", points: ["Async controller action'ları", "EF Core'un async sorgu ve kayıt metotları", "Controller → service → repository boyunca async akış"] }
    ],
        checklist: ["Gecikme, WhenAll, WhenAny ve cancellation örnekleri sunan AsyncDemo service'i oluştur.", "Örnekleri HTTP üzerinden sunan AsyncDemo controller'ını ekle.", "Önceki session'lardaki Auth ve Bank servislerini controller'larla dışarı aç.", "Products controller'ını tamamen async service kullanımına geçir.", "AsyncDemo service'ini DI container'a kaydet.", "Sıralı/paralel süreleri ve iptal davranışını doğrula.", "Login → token → korumalı banka işlemi akışını test et."],
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
            { title: "Neden Test Yazarız?", description: "S7 sonunda birçok katman ve endpoint birlikte çalışıyor; artık elle kontrol etmek güvenilir ve hızlı değil. Test projesi ekleyerek mevcut davranışı sonraki değişikliklere karşı otomatik güvenceye alıyoruz.", points: ["Hataları erken yakalama", "Refactoring sırasında hızlı geri bildirim", "Davranışı açıklayan yaşayan dokümantasyon"] },
            { title: "Test Seviyeleri", description: "Her riski aynı tür testle çözmeye çalışmıyoruz. Service kurallarını hızlı unit testlerle, routing ve middleware entegrasyonunu daha kapsamlı HTTP testleriyle doğrulayacağız.", points: ["Tek sınıfı izole eden unit test", "Birden çok bileşeni doğrulayan integration test", "Hız, kapsam ve güven dengesi"] },
            { title: "xUnit Temelleri", description: "Solution'a ECommerceApi.Tests projesini ekleyip tek senaryoları Fact, veri varyasyonlarını Theory olarak yazıyoruz. Arrange-Act-Assert düzeni yeni test takımının ortak okuma biçimi olacak.", points: ["`[Fact]` ile tek senaryo", "`[Theory]` ve `[InlineData]` ile parametrik test", "Arrange → Act → Assert düzeni"] },
            { title: "Mocking", description: "ProductService testinde gerçek SQLite'a, controller testinde gerçek service'e ihtiyaç duymuyoruz. Moq ile sınır bağımlılıklarına kontrollü cevaplar vererek yalnız hedef davranışı ölçüyoruz.", points: ["Moq ile bağımlılıkları izole etme", "`Setup` ile beklenen davranışı hazırlama", "`Verify` ile etkileşimi doğrulama"] },
            { title: "Service ve Controller Testleri", description: "S4'ten gelen repository sınırı ProductService'i, S2'den gelen service sınırı ProductsController'ı izole test etmeyi mümkün kılıyor. Başarı ve hata yollarını ayrı örneklerle kapsıyoruz.", points: ["Repository mock'u ile Product service testi", "Service mock'u ile controller sonucu testi", "Başarılı ve hata senaryolarını ayrı ele alma"] },
            { title: "Integration Testing", description: "Unit testlerin görmediği gerçek route, binding ve middleware akışı için WebApplicationFactory ekliyoruz. Production SQLite kaydını testte InMemory provider ile değiştirip gerçek HTTP çağrıları yapıyoruz.", points: ["`WebApplicationFactory<Program>` ile test sunucusu", "EF Core InMemory ile izole veri ortamı", "Gerçek HTTP isteği ve middleware pipeline'ı"] },
            { title: "Test Araçları ve AI", description: "FluentAssertions yeni testleri okunabilir, coverage eksik alanları görünür yapacak. AI önerilerini doğrudan kabul etmek yerine mevcut davranışı gerçekten kanıtlayıp kanıtlamadığını çalıştırarak denetliyoruz.", points: ["FluentAssertions ile okunabilir doğrulamalar", "Code coverage ile test edilmeyen alanları görme", "AI üretimi testleri inceleme ve çalıştırarak doğrulama"] }
    ],
        checklist: ["xUnit test projesini solution'a ekle.", "Moq, FluentAssertions, MVC Testing ve EF InMemory paketlerini kur.", "Program sınıfını WebApplicationFactory için erişilebilir yap.", "Product service ve Bank service unit testlerini yaz.", "Products controller'ın HTTP sonuçlarını izole test et.", "Products API için gerçek HTTP integration testleri oluştur.", "Tüm testleri ve isteğe bağlı coverage raporunu çalıştır."],
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
            { title: "Observability İhtiyacı", description: "S8 testleri geliştirme anında güven veriyor fakat production'da debugger ve test runner yok. Çalışan sistemin dış çıktılarından iç durumunu anlayacağımız telemetry katmanını ekliyoruz.", points: ["Üretimde neyin, nerede ve ne zaman bozulduğunu anlama", "Ölçülebilir sistem davranışı", "Sorun tespit ve çözüm süresini azaltma"] },
            { title: "Observability'nin Üç Ayağı", description: "Tek bir log satırı bütün resmi anlatamaz. Olayın bağlamını log, miktar ve gecikmesini metric, request boyunca izlediği yolu trace ile tamamlayacağız.", points: ["Logs: ne olduğunu açıklayan olay kayıtları", "Metrics: oran, adet ve gecikme ölçümleri", "Traces: isteğin bileşenler arasındaki yolculuğu"] },
            { title: "Structured Logging", description: "Mevcut ILogger mesajlarını Serilog üzerinden alan bazlı ve sorgulanabilir kayıtlara dönüştürüyoruz. Console/file sink'leri ile environment ve correlation zenginleştirmesi ekliyoruz.", points: ["Serilog ile alan bazlı log üretimi", "Console ve file sink'leri", "Environment ve correlation bilgisiyle enrichment"] },
            { title: "Log Seviyeleri", description: "Yeni log akışının üretimde gürültüye dönüşmemesi için olay önemini seviyelerle ayırıyoruz. Development ayrıntısını ve production hatalarını ortam ayarlarıyla farklı filtreleyeceğiz.", points: ["Trace ve Debug ile geliştirme detayı", "Information ve Warning ile operasyonel görünürlük", "Error ve Fatal ile kritik olaylar"] },
            { title: "OpenTelemetry", description: "ASP.NET request, runtime ve HTTP davranışlarına otomatik instrumentation ekliyoruz. Prometheus exporter metric'leri /metrics üzerinden, ActivitySource ise özel iş span'larını sunacak.", points: ["Vendor bağımsız telemetry standardı", "ASP.NET Core, runtime ve HTTP instrumentation", "Prometheus exporter ve `/metrics` endpoint'i"] },
            { title: "Correlation ID", description: "S8'de test edilen tek request üretimde çok sayıda log satırına dönüşebilir. Pipeline'ın başına correlation middleware ekleyip aynı kimliği HttpContext, response header ve Serilog context'inde taşıyoruz.", points: ["Her isteğe benzersiz kimlik verme", "Aynı kimliği response header ve loglarda taşıma", "Bir isteği servisler boyunca uçtan uca izleme"] },
            { title: "Health ve Diagnostics", description: "Yeni telemetry'yi gözlemlemek ve uygulamanın yaşadığını bildirmek için health/diagnostics endpoint'leri ekliyoruz. Bunlar S10'da container platformunun kullanacağı operasyonel sinyallere dönüşecek.", points: ["Uygulama sağlığını kontrol eden endpoint'ler", "Sürüm, ortam ve uptime bilgisi", "Load balancer ve container platformlarının sağlık kontrolü"] }
    ],
        checklist: ["Serilog ve OpenTelemetry paketlerini ekle.", "Structured logging ayarlarını konfigürasyonda tanımla.", "Correlation ID middleware'ini oluştur ve pipeline'ın başına ekle.", "Uygulamaya özel metric tanımlayan AppTelemetry sınıfını oluştur.", "Diagnostics endpoint'ini ekle.", "Prometheus metrics ve tracing instrumentation'ını bağla.", "Log, correlation header, /metrics ve diagnostics çıktısını doğrula."],
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
            { title: "Deployment Ortamları", description: "S9 API'si geliştirici ayarlarıyla çalışıyor; aynı binary'yi staging ve production'a taşımak için konfigürasyonu uygulamadan ayırıyoruz. Build değişmeden environment variable'larla ortam davranışı değişecek.", points: ["Development, test/staging ve production ayrımı", "Aynı kodu farklı konfigürasyonlarla çalıştırma", "Yayın öncesi kalite ve code review kapıları"] },
            { title: "Web Sunucuları ve Hosting", description: "Container içinde uygulamayı Kestrel çalıştıracak ve 8080 portunu dinleyecek. Dış ortamda reverse proxy'nin TLS, routing ve load balancing sorumluluklarını nasıl tamamlayacağını konumluyoruz.", points: ["ASP.NET Core sunucusu olarak Kestrel", "Nginx veya Apache ile reverse proxy", "Windows ortamlarında IIS seçeneği"] },
            { title: "Performans ve Güvenilirlik", description: "S9'da eklenen health ve telemetry sinyalleri deployment kararlarının girdisi oluyor. Instance'ları izleme, yük dengeleme ve yatay ölçekleme için uygulamanın hangi sinyalleri sunacağını belirliyoruz.", points: ["Health check ve izleme", "Yük dengeleme ve yüksek erişilebilirlik", "Vertical ve horizontal scaling farkı"] },
            { title: "Docker", description: "Yerel SDK bağımlılığını kaldırmak için projeye multi-stage Dockerfile ve .dockerignore ekliyoruz. SDK yalnız build aşamasında kalacak, final image sadece ASP.NET runtime ve publish çıktısını taşıyacak.", points: ["Uygulama ve bağımlılıkları image olarak paketleme", "Multi-stage build ile küçük runtime image", "`.dockerignore` ile temiz build context"] },
            { title: "Docker Compose", description: "API'nin yanında S9 loglarını toplayacak Seq servisini Compose'a ekliyoruz. Ortak network, production environment variable'ları ve DB/log/Seq volume'leri tek deklaratif dosyada kurulacak.", points: ["API ve Seq servislerini birlikte çalıştırma", "Container ağı ve environment variable'lar", "Volume ile veriyi kalıcı tutma"] },
            { title: "CI/CD", description: "S8 testlerini ve yeni Docker build'ini her push'ta otomatik çalıştıran Bitbucket pipeline ekliyoruz. Image üretimi ancak restore, Release build ve test kalite kapıları geçerse başlayacak.", points: ["Her push'ta restore, build ve test", "Başarılı pipeline sonrasında image üretimi", "Bitbucket Pipelines ile tekrarlanabilir otomasyon"] },
            { title: "Yayın Stratejileri", description: "Tek bir container çalıştırmak teslim sürecini tamamlamaz. Oluşturduğumuz image'ın blue-green, canary veya rolling yöntemleriyle düşük riskli yayınlanıp geri alınabileceğini planlıyoruz.", points: ["Blue-green deployment", "Canary ve rolling update", "Hızlı geri dönüş ve risk azaltma"] },
            { title: "Orchestration ve Cloud", description: "Compose yerel çoklu servis ortamını çözer; daha büyük ölçekte aynı image'ı Kubernetes ve bulut platformları yönetecek. Health sinyalleri otomatik yeniden başlatma ve ölçeklemenin temelini oluşturacak.", points: ["Kubernetes'in container yönetimindeki rolü", "Otomatik yeniden başlatma ve ölçekleme", "Azure, AWS ve GCP üzerinde barındırma seçenekleri"] }
    ],
        checklist: ["Build çıktısını sadeleştiren .dockerignore dosyasını oluştur.", "SDK ve runtime aşamalarını ayıran Dockerfile yaz.", "API image'ını build edip Kestrel üzerinde çalıştır.", "Serilog loglarını Seq'e gönderecek ayarları ekle.", "API ve Seq'i docker-compose.yml ile birlikte ayağa kaldır.", "Kalıcı veri ve loglar için volume tanımla.", "Restore → build → test → image adımlarını pipeline'a ekle.", "API, Swagger, Seq ve pipeline sonuçlarını doğrula."],
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
