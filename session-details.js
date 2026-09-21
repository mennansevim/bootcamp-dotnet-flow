window.sessionDetails = {
  1: {
    theory: [
            { title: ".NET Platformu", description: "Önce kodun hangi platformda ve nasıl çalışacağını netleştiriyoruz. .NET 8; çalışma zamanı, standart kütüphaneleri ve araçlarıyla sonraki tüm oturumların temelini oluşturuyor.", points: [".NET'in açık kaynaklı ve çok platformlu yapısı", "C#, F# ve VB.NET'in ortak çalışma zamanı", "Web, masaüstü, mobil, bulut, IoT ve oyun kullanım alanları"] },
            { title: "Modern .NET Ekosistemi", description: "Yeni API'yi eski .NET Framework yerine modern ve çok platformlu .NET 8 üzerinde kuruyoruz. LTS seçimi, eğitim boyunca aynı kararlı çalışma tabanını korumamızı sağlayacak.", points: [".NET Framework ile modern .NET arasındaki farklar", ".NET Core'dan .NET 8'e geçiş", "Yeni projelerde LTS sürüm tercihinin önemi"] },
            { title: "CLR ve CTS", description: "İlk C# kodunu yazmadan önce kodun nasıl çalıştırıldığını inceliyoruz. CLR yürütmeyi ve belleği yönetirken CTS, projedeki tipler için ortak kuralları tanımlıyor.", points: ["CLR: kodun çalışması, JIT ve bellek yönetimi", "CTS: .NET dilleri arasındaki ortak tip sistemi", "Garbage Collector'ın temel sorumluluğu"] },
            { title: "Web API ve REST", description: "Boş projeye dış dünyayla iletişim kuracağı HTTP yüzeyini ekliyoruz. Product kaynağını GET, POST, PUT ve DELETE endpoint'leriyle yönetip ilk REST sözleşmesini kuruyoruz.", points: ["İstemci ile sunucu arasındaki HTTP iletişimi", "Kaynak odaklı ve durum tutmayan REST yaklaşımı", "GET, POST, PUT ve DELETE metotlarının CRUD karşılıkları"] },
            { title: "HTTP Yanıtları ve Veri Formatları", description: "Endpoint'lerin yalnızca çalışması yetmez; istemcinin sonucu doğru yorumlaması da gerekir. Bu nedenle her işlem için uygun durum kodunu ve ortak bir JSON yanıt biçimini kullanıyoruz.", points: ["200, 201, 204, 400, 404 ve 500 durum kodları", "Modern API standardı olarak JSON", "XML'in eski ve SOAP tabanlı sistemlerdeki yeri"] },
            { title: "ASP.NET Core Proje Yapısı", description: "Çözüm iskeletini Program.cs, model ve controller sorumluluklarını ayırarak kuruyoruz. Route ve sorgu örnekleriyle Swagger, sonraki oturumlarda geliştireceğimiz ilk çalışan API yüzeyini oluşturuyor.", points: ["Controller, model ve `Program.cs` sorumlulukları", "Route ve sorgu parametreleri", "Swagger üzerinden API keşfi ve testi"] }
    ],
        checklist: [".NET 8 ortamını doğrula ve controller tabanlı Web API oluştur.", "HelloController ile basit, route ve query parametreli endpoint'ler yaz.", "Product modelini tanımla.", "Bellekte çalışan ProductsController CRUD endpoint'lerini oluştur.", "WeatherController ile JSON yanıt örneği ekle.", "Tüm endpoint'leri Swagger veya HTTP istemcisiyle doğrula."],
    code: [
    { title: "Projeyi ve çözümü oluştur", why: "Controller tabanlı şablonu ve tüm oturumlarda geliştireceğimiz çözüm iskeletini hazırlarız.", file: "Terminal", language: "bash", code: String.raw`dotnet new webapi --use-controllers -n ECommerceApi
dotnet new sln -n ECommerceSolution
dotnet sln add ECommerceApi/ECommerceApi.csproj
cd ECommerceApi
dotnet run` },
    { title: "Product modelini ekle", why: "CRUD endpoint'lerinin alıp döndüreceği ilk iş alanı modelini tanımlarız.", file: "ECommerceApi/Models/Product.cs", language: "csharp", code: String.raw`namespace ECommerceApi.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}` },
    { title: "Route ve sorgu parametrelerini göster", why: "Aynı controller üzerinde sabit route'u, route parametresini ve sorgu parametresi bağlamayı karşılaştırırız.", file: "ECommerceApi/Controllers/HelloController.cs", language: "csharp", code: String.raw`using Microsoft.AspNetCore.Mvc;

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
    { title: "İlk CRUD controller'ını kur", why: "HTTP metotlarını ve durum kodlarını bellekteki liste üzerinde uçtan uca uygularız.", file: "ECommerceApi/Controllers/ProductsController.cs", language: "csharp", code: String.raw`using ECommerceApi.Models;
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
    { title: "Swagger'ı işlem hattına bağla", why: "Endpoint'leri tarayıcıdan keşfedilebilir ve çalıştırılabilir hale getiririz.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`var builder = WebApplication.CreateBuilder(args);

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
            { title: "ASP.NET Core Mimarisi", description: "S1'de istek doğrudan controller içindeki iş mantığına ulaşıyordu. Şimdi isteğin Kestrel, middleware, controller ve yeni servis katmanından geçtiği açık bir akış kuruyoruz.", points: ["Kestrel ve çok platformlu çalışma modeli", "`Program.cs` ve `appsettings.json` sorumlulukları", "İstek → middleware → controller → servis → yanıt akışı"] },
            { title: "Dependency Injection", description: "Controller'ın ihtiyaç duyduğu servisi kendisinin oluşturması yerine DI container'dan almasını sağlıyoruz. Böylece uygulama ayrıntılarını değiştirebilir, yaşam sürelerini yönetebilir ve sınıfları daha kolay test edebiliriz.", points: ["Bağımlılıkların yapıcı (constructor) aracılığıyla verilmesi", "Gevşek bağlı ve test edilebilir tasarım", "Transient, scoped ve singleton yaşam süreleri"] },
            { title: "Katmanlı Mimari", description: "S1'de ProductsController hem HTTP akışını hem de CRUD kurallarını yönetiyordu. Bu oturumda iş mantığını ProductService'e taşıyor, controller'ı yalnızca istek ve yanıt koordinasyonundan sorumlu tutuyoruz.", points: ["Controller'ın yalnızca HTTP akışını yönetmesi", "İş kurallarının servis katmanına taşınması", "Arayüzlerle uygulama ayrıntılarının soyutlanması"] },
            { title: "DTO ve Doğrulama", description: "Product modelini doğrudan dışarı açmak yerine oluşturma, güncelleme ve yanıt işlemleri için ayrı DTO'lar ekliyoruz. Doğrulama kuralları, geçersiz veriyi servise ulaşmadan API sınırında durduruyor.", points: ["API sözleşmesini iç modelden ayırma", "Oluşturma, güncelleme ve yanıt DTO'ları", "`Required`, `StringLength` ve `Range` doğrulamaları"] },
            { title: "Middleware İşlem Hattı", description: "Her action'a ayrı try/catch ve süre ölçümü eklemek yerine bu ortak davranışları işlem hattına taşıyoruz. Hata yönetimi ve istek günlüğü, mevcut ve gelecekteki tüm endpoint'lere tek noktadan uygulanıyor.", points: ["Middleware zincirinde sıranın önemi", "Merkezi hata yönetimi", "İstekleri ve işlem sürelerini günlüğe kaydetme"] },
            { title: "Konfigürasyon ve Loglama", description: "Kod içine gömülme riski olan ayarları appsettings bölümlerine, ardından türü belirli options sınıflarına taşıyoruz. ILogger kayıtları da yeni katmanlarda neler olduğunu izlememizi sağlıyor.", points: ["Ortama göre `appsettings` katmanları", "Options Pattern ile türü belirli ayarlar", "Log seviyeleri ve `ILogger` kullanımı"] },
            { title: "Routing ve API Dokümantasyonu", description: "S1'deki temel route'ları korurken yeni DTO ve doğrulama sözleşmesini Swagger'da görünür hale getiriyoruz. Bağlama kaynaklarını açıkça belirtmek, S3'te genişleteceğimiz API sözleşmesine hazırlık sağlıyor.", points: ["Attribute routing ve model binding", "Route, sorgu ve gövde kaynakları", "Swagger ile etkileşimli dokümantasyon"] }
    ],
        checklist: ["Swagger paketini ve servis kayıtlarını ekle.", "Options sınıflarını ve yapılandırma bölümlerini oluştur.", "Product istek/yanıt DTO'larını doğrulama kurallarıyla tanımla.", "IProductService ve ProductService katmanını oluştur.", "Merkezi hata ve istek günlüğü middleware'lerini ekle.", "ProductsController içindeki iş mantığını servise taşı.", "Geçerli ve geçersiz istekleri Swagger üzerinden doğrula."],
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
    { title: "Servis sözleşmesini oluştur", why: "Controller, iş mantığının nasıl çalıştığını değil, hangi işlemlerin sunulduğunu bilir.", file: "ECommerceApi/Services/IProductService.cs", language: "csharp", code: String.raw`using ECommerceApi.DTOs;

namespace ECommerceApi.Services;

public interface IProductService
{
    IEnumerable<ProductDto> GetAll();
    ProductDto? GetById(int id);
    ProductDto Create(CreateProductDto dto);
    ProductDto? Update(int id, UpdateProductDto dto);
    bool Delete(int id);
}` },
    { title: "Merkezi hata middleware'ini ekle", why: "Beklenmeyen hataları tek biçimde günlüğe kaydeder, istemciye kontrollü bir yanıt döneriz.", file: "ECommerceApi/Middleware/ExceptionHandlingMiddleware.cs", language: "csharp", code: String.raw`using System.Net;
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
    { title: "Servis ve options kayıtlarını bağla", why: "DI container arayüzleri çözer; konfigürasyon sınıfları ilgili bölümlere bağlanır.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`builder.Services.AddScoped<IProductService, ProductService>();

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
            { title: "Model Binding Kaynakları", description: "Tekil kimlik, liste seçenekleri ve istek gövdesi artık farklı amaçlar taşıyor. Her girdinin route, sorgu, gövde veya başlıktan geldiğini açıkça belirterek yeni sorgu sözleşmesini okunur hale getiriyoruz.", points: ["`[FromRoute]` ile kaynak kimliği", "`[FromQuery]` ile arama ve listeleme seçenekleri", "`[FromBody]` ve `[FromHeader]` kullanım alanları"] },
            { title: "Routing Kuralları", description: "S2'de her tam sayı kimliği action'a ulaşabiliyordu. Pozitif kimlik kısıtı ve adlandırılmış route ekleyerek geçersiz URL'yi controller çalışmadan reddediyor, CreatedAtAction akışını netleştiriyoruz.", points: ["Attribute routing ve adlandırılmış route'lar", "`{id:int:min(1)}` gibi route kısıtları", "Geçersiz URL'nin controller'a ulaşmadan reddedilmesi"] },
            { title: "Filtreleme, Sıralama ve Sayfalama", description: "GetAll artık koleksiyonun tamamını tek seferde döndürmüyor. ProductQueryParameters girdisini serviste filtreleyip sıralıyor; PagedResult ile yalnızca istenen veri aralığını ve sayfalama bilgilerini sunuyoruz.", points: ["`ProductQueryParameters` ile sorgu sözleşmesi", "Filtrele → sırala → say → sayfala işlem sırası", "`PagedResult<T>` ile veri ve sayfalama bilgileri", "İstemci kaynak tüketimini sınırlayan maksimum sayfa boyutu"] },
            { title: "Standart Hata Yanıtları", description: "S2 middleware'i beklenmeyen hataları yakalıyor fakat kaynak bulunamadığında standart ayrıntı üretmiyor. Problem Details ekleyerek 404 dahil tüm istemciler için aynı hata alanlarını kullanıyoruz.", points: ["Problem Details yaklaşımı", "`title`, `status`, `detail` ve `traceId` alanları", "Tüm istemciler için tek hata formatı"] },
            { title: "Swagger ve XML Dokümantasyonu", description: "Yeni sorgu parametreleri ve yanıt türleri yalnızca kodda kalmamalı. XML yorumlarını ve ProducesResponseType tanımlarını Swagger'a bağlayarak genişleyen sözleşmeyi istemciye eksiksiz gösteriyoruz.", points: ["XML yorumlarından endpoint açıklaması üretme", "`ProducesResponseType` ile olası yanıtları belirtme", "API davranışını kodla birlikte güncel tutma"] }
    ],
        checklist: ["ProductQueryParameters ve PagedResult<T> DTO'larını oluştur.", "Product servisine filtreleme, sıralama ve sayfalama ekle.", "Sorgu modelini controller'a [FromQuery] ile bağla.", "Product kimliği route'una tip ve minimum değer kısıtı ekle.", "Bulunamayan kaynakları Problem Details biçiminde döndür.", "XML açıklamalarını Swagger'a dahil et.", "Sayfalama, hatalı route ve 404 senaryolarını doğrula."],
    code: [
    { title: "Sorgu ve sayfalı sonuç modellerini ekle", why: "Liste endpoint'inin tüm girişlerini ve sayfalama bilgilerini tek sözleşmede toplarız.", file: "ECommerceApi/DTOs/QueryDtos.cs", language: "csharp", code: String.raw`using System.ComponentModel.DataAnnotations;

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
    { title: "Sorgu bağlama ve route kısıtı ekle", why: "Liste parametrelerini sorgu dizesinden bağlarız; geçersiz kimlikler action'a ulaşmaz.", file: "ECommerceApi/Controllers/ProductsController.cs", language: "csharp", code: String.raw`[HttpGet]
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
            { title: "Veri Erişim Yaklaşımları", description: "S3'te servis bir List<Product> üzerinde çalışıyor ve uygulama yeniden başladığında tüm veriler siliniyor. ADO.NET, Dapper ve EF Core seçeneklerini karşılaştırıp bu proje için Code First EF Core'u seçiyoruz.", points: ["Düşük seviyeli ADO.NET yaklaşımı", "ORM olarak Entity Framework Core", "Hafif ORM alternatifi Dapper"] },
            { title: "ORM ve Entity Tasarımı", description: "API DTO'larından bağımsız kalıcı Product ve Category entity'leri ekliyoruz. Navigation property'leriyle kategori-ürün ilişkisini veritabanı modeline dahil ediyoruz.", points: ["Tabloların C# sınıflarıyla eşlenmesi", "Product ve Category entity'leri", "Bir-çok ilişki ve navigation property'leri"] },
            { title: "DbContext ve DbSet", description: "Bellekteki koleksiyonun yerini BootcampDbContext ve DbSet'ler alacak. EF Core change tracker değişiklikleri izleyecek, SaveChanges ise bunları SQLite'a kalıcı yazacak.", points: ["DbContext'in veritabanı oturumu olarak rolü", "DbSet ile tablo erişimi", "Change tracking ve `SaveChanges` akışı"] },
            { title: "Code First ve Migration'lar", description: "Entity sınıflarını yalnızca çalışma zamanı modeli olarak bırakmıyoruz; Fluent API ile kuralları, migration ile fiziksel şemayı tanımlıyoruz. Böylece her geliştirici aynı veritabanını yeniden oluşturabiliyor.", points: ["Entity sınıflarından şema üretimi", "Migration ile şema değişikliklerini sürümleme", "Fluent API ile indeks, hassasiyet ve başlangıç verisi"] },
            { title: "LINQ ve Veri Yükleme", description: "S3'teki filtreleme ve sayfalama artık IEnumerable yerine SQL'e çevrilen IQueryable üzerinde çalışacak. İlişkili Category verisini kontrollü yükleyerek gereksiz sorguları önlüyoruz.", points: ["Filtreleme, sıralama ve sayfalama sorguları", "Eager, lazy ve explicit loading farkları", "`Include` ile N+1 problemini önleme"] },
            { title: "Repository Pattern", description: "ProductService'in doğrudan DbContext ayrıntılarına bağlanmasını önlemek için repository sınırı ekliyoruz. Ortak CRUD işlemleri genel repository'de, ürüne özel sorgular ise ProductRepository'de kalıyor.", points: ["Genel repository ile ortak CRUD işlemleri", "Product repository ile özel sorgular", "Servis katmanını veri erişim ayrıntılarından ayırma"] },
            { title: "Soft Delete", description: "S3'te silme işlemi kaydı koleksiyondan tamamen kaldırıyordu. IsDeleted ve global query filter ekleyerek kayıt geçmişini koruyor, silinmiş verileri mevcut sorgulardan otomatik olarak gizliyoruz.", points: ["Veriyi fiziksel olarak silmeden işaretleme", "Global query filter ile silinen kayıtları gizleme", "Veri geçmişini koruma yaklaşımı"] }
    ],
        checklist: ["EF Core SQLite ve Design paketlerini ekle.", "Product ve Category entity'lerini oluştur.", "BootcampDbContext ve Fluent API kurallarını tanımla.", "Genel ve Product repository katmanlarını ekle.", "Product servisini asenkron repository metotlarına bağla.", "Bağlantı dizesini ve DI kayıtlarını yapılandır.", "Migration oluşturup veritabanını hazırla.", "CRUD ve soft delete davranışını doğrula."],
    code: [
    { title: "EF Core paketlerini ekle", why: "SQLite sağlayıcısı çalışma zamanı erişimini, Design paketi ise migration araçlarını sunar.", file: "Terminal", language: "bash", code: String.raw`dotnet add ECommerceApi package Microsoft.EntityFrameworkCore.Sqlite --version 8.0.0
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
    { title: "DbContext ve model kurallarını ekle", why: "Tabloları, indeksleri, ondalık sayı hassasiyetini ve genel soft delete kuralını tek yerde tanımlarız.", file: "ECommerceApi/Data/BootcampDbContext.cs", language: "csharp", code: String.raw`using ECommerceApi.Entities;
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
    { title: "Veritabanı ve repository'leri kaydet", why: "Scoped DbContext ve repository'ler, istek boyunca aynı veri oturumunu paylaşır.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`builder.Services.AddDbContext<BootcampDbContext>(options =>
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
            { title: "API Güvenliğinin Temelleri", description: "S4'te kalıcı hale getirdiğimiz endpoint'ler kimlik sormadan herkese açık çalışıyor. Kullanıcının kimliğini doğrulayan authentication ile doğrulanmış kullanıcının yetkisini denetleyen authorization katmanlarını birbirinden ayırıyoruz.", points: ["Yetkisiz erişimin veri ve iş süreçlerine etkisi", "Authentication: kullanıcının kim olduğunu doğrulama", "Authorization: kullanıcının ne yapabileceğini belirleme"] },
            { title: "JWT Yapısı", description: "Başarılı girişten sonra, sunucuda oturum tutmadan kullanıcı kimliğini taşıyan bir JWT üretiyoruz. Kullanıcı kimliğini, adını ve rolünü claim olarak imzalayıp kısa ömürlü bir token'a dönüştürüyoruz.", points: ["Header, payload ve signature bölümleri", "Kullanıcı kimliği, adı, rolü ve süre claim'leri", "Durum tutmayan kimlik doğrulama modeli"] },
            { title: "Token Doğrulama", description: "Üretilen token'ı koşulsuz kabul etmek güvenli değildir. Bearer handler'a imza, issuer, audience ve süre kontrollerini ekleyerek değiştirilmiş veya süresi dolmuş token'ları işlem hattında reddediyoruz.", points: ["İmza ve süre kontrolü", "Issuer ve audience doğrulaması", "HTTPS ve gizli bilgi yönetiminin önemi"] },
            { title: "Kullanıcı Yönetimi", description: "S4'teki DbContext'e UserEntity ve kullanıcı rollerini ekliyoruz. AuthService, kayıt sırasında kullanıcı adı ve e-postanın benzersizliğini; giriş sırasında ise kayıtlı kullanıcı bilgilerini doğruluyor.", points: ["`UserEntity` ve kullanıcı rolleri", "Kayıt ve giriş iş akışı", "Benzersiz kullanıcı adı ve e-posta kontrolü"] },
            { title: "Parola Güvenliği", description: "Yeni User tablosuna düz metin parola yazmıyoruz. Kayıt sırasında BCrypt ile hash ve salt üretiyor, giriş sırasında gelen parolayı geri döndürülemez hash üzerinden doğruluyoruz.", points: ["Parolaların düz metin saklanmaması", "BCrypt ile hash ve salt", "Giriş sırasında güvenli parola doğrulama"] },
            { title: "Yetkilendirme", description: "Kimliği doğrulama tamamlandıktan sonra mevcut endpoint'lere Authorize ve rol kuralları eklenebilir. Swagger'a Bearer desteği ekleyerek korumalı akışı login'den endpoint'e kadar test ediyoruz.", points: ["`[Authorize]` ile korumalı kaynaklar", "Role-based authorization", "Swagger'dan Bearer token ile test"] },
            { title: "Güvenlik Tehditleri", description: "Yeni kimlik katmanı saldırı yüzeyini de büyütüyor. EF Core'un parametreli sorgularını, HTTPS'i ve secret'ların konfigürasyon dışında tutulmasını bütünsel savunmanın parçaları olarak konumluyoruz.", points: ["SQL injection'a karşı ORM ve parametreli sorgular", "XSS ve CSRF kavramları", "Secret'ların kaynak kod dışında tutulması"] }
    ],
        checklist: ["JWT bearer ve BCrypt paketlerini ekle.", "Kullanıcı entity'sini, rolleri ve başlangıç admin hesabını tanımla.", "JWT ayarlarını konfigürasyona taşı.", "Claim içeren token üreten JwtService katmanını oluştur.", "BCrypt kullanan kayıt/giriş akışını AuthService içinde kur.", "Kimlik doğrulama ve yetkilendirme middleware'lerini bağla.", "Token üretme ve geçersiz token senaryolarını doğrula."],
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
    { title: "Parolayı hashleyerek kullanıcı oluştur", why: "Veritabanına hiçbir zaman düz metin parola yazmayız.", file: "ECommerceApi/Services/AuthService.cs", language: "csharp", code: String.raw`public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
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
    { title: "JWT doğrulamasını işlem hattına bağla", why: "Bearer handler, her istekteki token'ı API action'ından önce doğrular.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`builder.Services.Configure<JwtSettings>(
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
            { title: "Transaction Temelleri", description: "S5'te her EF Core işlemi tek başına tamamlanıyor; bu nedenle iki hesabı değiştiren transfer akışı yarıda kalabilir. Para çıkışı, para girişi ve işlem kaydını tek transaction içinde ya hep ya hiç çalışacak şekilde birleştiriyoruz.", points: ["Bir grup işlemin hep birlikte başarılı olması", "Commit ve rollback davranışı", "Banka transferinde ya hep ya hiç yaklaşımı"] },
            { title: "ACID İlkeleri", description: "Yeni transfer akışının yalnızca doğru kod sırasına değil, veritabanı güvencelerine de ihtiyacı var. ACID özellikleri; bakiyelerin kurallara uygun, eşzamanlı işlemlere dayanıklı ve commit sonrasında kalıcı olmasını sağlıyor.", points: ["Atomicity ve consistency", "Isolation ve eşzamanlı işlemler", "Durability ve kalıcı sonuç"] },
            { title: "Isolation Seviyeleri", description: "Birden fazla transfer aynı hesaplara eriştiğinde ara bakiyelerin nasıl görüleceğini belirlememiz gerekir. Isolation seçeneklerini veri tutarlılığına ve işlem kapasitesine etkileriyle değerlendiriyoruz.", points: ["Read Uncommitted ve dirty read", "Read Committed ve Repeatable Read", "Serializable ve tutarlılık-performans dengesi"] },
            { title: "Unit of Work Pattern", description: "BankService'i doğrudan DbContext transaction API'sine bağlamıyoruz. Begin, SaveChanges, Commit ve Rollback davranışlarını Unit of Work arkasında toplayarak iş akışını veri erişim ayrıntılarından ayırıyoruz.", points: ["Birden çok repository işlemini tek iş biriminde toplama", "Tek `SaveChanges` ve transaction sınırı", "Transaction yönetimini servis katmanından soyutlama"] },
            { title: "Özel Hata Tasarımı", description: "S5'e kadar hataları çoğunlukla null veya genel Exception ile ifade ediyorduk. Hesap bulunamadı, geçersiz istek ve yetersiz bakiye durumları için ayrı iş alanı hata türleri ekliyoruz.", points: ["Bulunamadı ve doğrulama hataları", "Çakışma ve iş kuralı hataları", "Yetersiz bakiye gibi anlamlı iş alanı hataları"] },
            { title: "Merkezi Hata Yönetimi", description: "S2'de eklediğimiz hata middleware'ini yeni iş alanı hata türlerini anlayacak şekilde genişletiyoruz. Her hata uygun HTTP koduna dönüşürken teknik çağrı izi yalnızca sunucu logunda kalıyor.", points: ["Hata türlerini HTTP durum kodlarına eşleme", "Tutarlı JSON hata sözleşmesi", "Teknik ayrıntıyı loglayıp istemciden gizleme"] },
            { title: "Asenkron Hata ve İptal Yönetimi", description: "Transaction akışı asenkron EF çağrıları kullandığı için hata ve iptal bilgisinin await zincirinde doğru taşınması gerekir. Rollback sonrasında throw ile özgün çağrı izini koruyor, uzun işlemleri iptale hazırlıyoruz.", points: ["`await` edilen Task'tan hata yayılımı", "`throw;` ile çağrı izini koruma", "`CancellationToken` ile uzun işlemi iptal etme"] }
    ],
        checklist: ["Banka hesabı ve işlem kaydı entity'lerini oluştur.", "İş alanını ifade eden özel hata sınıflarını ekle.", "Transaction metotlarını sunan Unit of Work katmanını kur.", "Para transferini transaction içinde gerçekleştiren Bank servisini yaz.", "Hata durumunda rollback yap ve hatayı üst katmana ilet.", "Merkezi middleware'de hata türü → HTTP kodu eşlemesini yap.", "Başarılı, yetersiz bakiye ve bulunamayan hesap senaryolarını doğrula."],
    code: [
    { title: "İş alanı hata türlerini tanımla", why: "Hata türü hem iş anlamını hem de üretilecek HTTP yanıtını belirler.", file: "ECommerceApi/Exceptions/CustomExceptions.cs", language: "csharp", code: String.raw`namespace ECommerceApi.Exceptions;

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
    { title: "Unit of Work sözleşmesini oluştur", why: "Transaction yaşam döngüsünü servis kodundan ayırırız.", file: "ECommerceApi/UnitOfWork/IUnitOfWork.cs", language: "csharp", code: String.raw`namespace ECommerceApi.UnitOfWork;

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
    { title: "Hata türlerini HTTP koduna çevir", why: "İş alanı hataları controller'lardan bağımsız, tutarlı yanıtlara dönüşür.", file: "ECommerceApi/Middleware/ExceptionHandlingMiddleware.cs", language: "csharp", code: String.raw`var statusCode = exception switch
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
            { title: "Senkron ve Asenkron Çalışma", description: "S6'daki veritabanı işlemleri I/O beklerken istek thread'ini gereksiz yere meşgul etmemeli. Mevcut akışı bloklamayan bir await zincirine dönüştürerek aynı kaynaklarla daha fazla isteğe yanıt vermeyi hedefliyoruz.", points: ["Bloklayan ve bloklamayan bekleme farkı", "I/O işlemlerinde thread'in serbest bırakılması", "Asenkron tasarımın ölçeklenebilirliğe etkisi"] },
            { title: "Task ve Thread", description: "Her asenkron işlem için yeni bir thread açmak yerine .NET'in Task tabanlı modelini kullanıyoruz. Thread Pool çalışma kaynağını, Task ise tamamlanmasını beklediğimiz işi temsil ediyor.", points: ["Thread'in işletim sistemi kaynağı olması", "Task'ın bir iş soyutlaması olması", "Thread Pool ile kaynakların yeniden kullanılması"] },
            { title: "async ve await", description: "Controller action'larından servis ve EF Core çağrılarına kadar Task/Task<T> dönüşlerini zincir boyunca taşıyoruz. Böylece S6'daki transaction ve S5'teki kimlik doğrulama işlemlerini bloklamadan HTTP'ye açabiliyoruz.", points: ["`Task` ve `Task<T>` dönüş tipleri", "Sonucu bloklamadan bekleme", "Uçtan uca asenkron yaklaşım"] },
            { title: "Kaçınılması Gereken Hatalar", description: "Asenkron zincirin arasına .Result veya Wait koymak kazandığımız ölçeklenebilirliği ortadan kaldırır. Controller ve servislerde async void kullanmadan zinciri kesintisiz sürdürüyoruz.", points: ["`.Result` ve `.Wait()` ile bloklama", "Olay işleyicileri dışındaki `async void` kullanımı", "Asenkron zinciri yarıda senkrona çevirmek"] },
            { title: "Paralel İş Akışları", description: "AsyncDemoService'e bağımsız çağrıların sıralı yerine birlikte başlatıldığı örnekler ekliyoruz. WhenAll toplam süreyi azaltırken WhenAny en hızlı sonucu seçmenin davranışını gösterecek.", points: ["`Task.WhenAll` ile tüm işleri bekleme", "`Task.WhenAny` ile ilk sonucu kullanma", "`Parallel.ForEachAsync` ile kontrollü paralellik"] },
            { title: "CancellationToken", description: "İstemci bağlantıyı kapattığında uzun süren örnek veya veri işleminin devam etmesini istemiyoruz. İstek token'ını alt katmanlara taşıyarak beklemeleri ve döngüleri iptal edilebilir hale getiriyoruz.", points: ["İstemci bağlantısı kapandığında işi durdurma", "İptal sinyalini katmanlar boyunca taşıma", "`OperationCanceledException` davranışı"] },
            { title: "Web API'de Asenkronluk", description: "S5'teki AuthService ve S6'daki BankService artık AuthController ve BankController üzerinden erişilebilir olacak. ProductsController'ı da asenkron servis yüzeyine geçirerek API'nin tüm önemli akışlarını aynı modele taşıyoruz.", points: ["Asenkron controller action'ları", "EF Core'un asenkron sorgu ve kayıt metotları", "Controller → servis → repository boyunca asenkron akış"] }
    ],
        checklist: ["Gecikme, WhenAll, WhenAny ve iptal örnekleri sunan AsyncDemo servisini oluştur.", "Örnekleri HTTP üzerinden sunan AsyncDemo controller'ını ekle.", "Önceki oturumlardaki Auth ve Bank servislerini controller'larla dışarı aç.", "Products controller'ını tamamen asenkron servis kullanımına geçir.", "AsyncDemo servisini DI container'a kaydet.", "Sıralı/paralel süreleri ve iptal davranışını doğrula.", "Giriş → token → korumalı banka işlemi akışını test et."],
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
    { title: "JWT profil endpoint'ini aç", why: "Token claim'ini okur, kimliği doğrulanan kullanıcıyı servis üzerinden getiririz.", file: "ECommerceApi/Controllers/AuthController.cs", language: "csharp", code: String.raw`[HttpGet("profile")]
[Authorize]
public async Task<ActionResult<UserDto>> GetProfile()
{
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim is null || !int.TryParse(userIdClaim.Value, out var userId))
        return Unauthorized(new { message = "Invalid token" });

    var user = await _authService.GetUserByIdAsync(userId);
    return user is null ? NotFound() : Ok(user);
}` },
    { title: "Transfer endpoint'ini aç", why: "S6'da hazırladığımız transaction servisini HTTP üzerinden kullanılabilir hale getiririz.", file: "ECommerceApi/Controllers/BankController.cs", language: "csharp", code: String.raw`[HttpPost("transfer")]
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
            { title: "Test Seviyeleri", description: "Her riski aynı tür testle çözmeye çalışmıyoruz. Servis kurallarını hızlı birim testleriyle, routing ve middleware bütünlüğünü ise daha kapsamlı HTTP testleriyle doğruluyoruz.", points: ["Tek sınıfı izole eden birim testi", "Birden çok bileşeni doğrulayan entegrasyon testi", "Hız, kapsam ve güven dengesi"] },
            { title: "xUnit Temelleri", description: "Çözüme ECommerceApi.Tests projesini ekliyor; tek senaryoları Fact, veri çeşitlerini Theory olarak yazıyoruz. Arrange-Act-Assert düzeni, test takımının ortak okuma biçimini oluşturuyor.", points: ["`[Fact]` ile tek senaryo", "`[Theory]` ve `[InlineData]` ile parametrik test", "Arrange → Act → Assert düzeni"] },
            { title: "Bağımlılıkları Taklit Etme", description: "ProductService testinde gerçek SQLite'a, controller testinde ise gerçek servise ihtiyaç duymuyoruz. Moq ile sınır bağımlılıklarına kontrollü yanıtlar vererek yalnızca hedef davranışı ölçüyoruz.", points: ["Moq ile bağımlılıkları izole etme", "`Setup` ile beklenen davranışı hazırlama", "`Verify` ile etkileşimi doğrulama"] },
            { title: "Servis ve Controller Testleri", description: "S4'te eklediğimiz repository sınırı ProductService'i, S2'deki servis sınırı ise ProductsController'ı bağımsız test etmemizi sağlıyor. Başarılı ve hatalı yolları ayrı örneklerle kapsıyoruz.", points: ["Repository taklidiyle Product servis testi", "Servis taklidiyle controller sonucu testi", "Başarılı ve hatalı senaryoları ayrı ele alma"] },
            { title: "Entegrasyon Testleri", description: "Birim testlerinin görmediği gerçek route, binding ve middleware akışı için WebApplicationFactory ekliyoruz. Üretimde kullanılan SQLite kaydını testte InMemory sağlayıcısıyla değiştirip gerçek HTTP çağrıları yapıyoruz.", points: ["`WebApplicationFactory<Program>` ile test sunucusu", "EF Core InMemory ile izole veri ortamı", "Gerçek HTTP isteği ve middleware işlem hattı"] },
            { title: "Test Araçları ve Yapay Zekâ", description: "FluentAssertions testleri daha okunur, kod kapsamı raporu ise eksik alanları daha görünür hale getiriyor. Yapay zekâ önerilerini doğrudan kabul etmek yerine mevcut davranışı gerçekten kanıtlayıp kanıtlamadığını çalıştırarak denetliyoruz.", points: ["FluentAssertions ile okunabilir doğrulamalar", "Kod kapsamıyla test edilmeyen alanları görme", "Yapay zekâ üretimi testleri inceleyip çalıştırarak doğrulama"] }
    ],
        checklist: ["xUnit test projesini çözüme ekle.", "Moq, FluentAssertions, MVC Testing ve EF InMemory paketlerini kur.", "Program sınıfını WebApplicationFactory için erişilebilir yap.", "Product ve Bank servislerinin birim testlerini yaz.", "Products controller'ın HTTP sonuçlarını bağımsız test et.", "Products API için gerçek HTTP entegrasyon testleri oluştur.", "Tüm testleri ve isteğe bağlı kod kapsamı raporunu çalıştır."],
    code: [
    { title: "Test projesini ve paketleri kur", why: "Birim ve entegrasyon testi altyapısını API projesinden ayrı bir assembly içinde hazırlarız.", file: "Terminal", language: "bash", code: String.raw`dotnet new xunit -n ECommerceApi.Tests
dotnet sln add ECommerceApi.Tests/ECommerceApi.Tests.csproj
dotnet add ECommerceApi.Tests reference ECommerceApi/ECommerceApi.csproj
dotnet add ECommerceApi.Tests package Moq
dotnet add ECommerceApi.Tests package FluentAssertions
dotnet add ECommerceApi.Tests package Microsoft.AspNetCore.Mvc.Testing --version 8.0.0
dotnet add ECommerceApi.Tests package Microsoft.EntityFrameworkCore.InMemory --version 8.0.0` },
    { title: "ProductService birim testi yaz", why: "Repository'yi testten ayırarak servisin eşleme ve bulunamadı davranışını doğrularız.", file: "ECommerceApi.Tests/UnitTests/ProductServiceTests.cs", language: "csharp", code: String.raw`[Fact]
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
    { title: "Controller yanıt türünü test et", why: "Servis sonucunun HTTP action result sözleşmesine doğru çevrildiğini kontrol ederiz.", file: "ECommerceApi.Tests/UnitTests/ProductsControllerTests.cs", language: "csharp", code: String.raw`[Fact]
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
    { title: "Entegrasyon testi factory'sini hazırla", why: "Gerçek API işlem hattını çalıştırırken üretim veritabanını izole bir InMemory sağlayıcısıyla değiştiririz.", file: "ECommerceApi.Tests/IntegrationTests/ProductsApiTests.cs", language: "csharp", code: String.raw`public class ProductsApiTests : IClassFixture<WebApplicationFactory<Program>>
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
    { title: "Testleri çalıştır", why: "Birim ve entegrasyon testlerinin tamamını aynı komutla derleyip çalıştırırız.", file: "Terminal", language: "bash", code: String.raw`dotnet test
dotnet test --collect:"XPlat Code Coverage"` }
    ]
  },
  9: {
    theory: [
            { title: "Gözlemlenebilirlik İhtiyacı", description: "S8'deki testler geliştirme sırasında güven veriyor; ancak üretimde debugger veya test çalıştırıcısı bulunmuyor. Çalışan sistemin dışarı verdiği verilerden iç durumunu anlamak için telemetri katmanı ekliyoruz.", points: ["Üretimde neyin, nerede ve ne zaman bozulduğunu anlama", "Ölçülebilir sistem davranışı", "Sorun tespit ve çözüm süresini azaltma"] },
            { title: "Gözlemlenebilirliğin Üç Ayağı", description: "Tek bir log satırı resmin tamamını gösteremez. Olayın bağlamını loglarla, miktarını ve gecikmesini metriklerle, istek boyunca izlediği yolu ise izlerle tamamlıyoruz.", points: ["Loglar: ne olduğunu açıklayan olay kayıtları", "Metrikler: oran, adet ve gecikme ölçümleri", "İzler: isteğin bileşenler arasındaki yolculuğu"] },
            { title: "Yapılandırılmış Loglama", description: "Mevcut ILogger mesajlarını Serilog ile alan bazlı ve sorgulanabilir kayıtlara dönüştürüyoruz. Konsol ve dosya hedeflerine ortam ve korelasyon bilgilerini de ekliyoruz.", points: ["Serilog ile alan bazlı log üretimi", "Konsol ve dosya hedefleri", "Ortam ve korelasyon bilgileriyle zenginleştirme"] },
            { title: "Log Seviyeleri", description: "Yeni log akışının üretimde gürültüye dönüşmemesi için olayları önemlerine göre ayırıyoruz. Geliştirme ayrıntılarını ve üretim hatalarını ortam ayarlarıyla farklı biçimde filtreliyoruz.", points: ["Trace ve Debug ile geliştirme ayrıntıları", "Information ve Warning ile operasyonel görünürlük", "Error ve Fatal ile kritik olaylar"] },
            { title: "OpenTelemetry", description: "ASP.NET isteklerine, çalışma zamanına ve HTTP davranışlarına otomatik ölçüm ekliyoruz. Prometheus exporter metrikleri /metrics üzerinden sunarken ActivitySource, özel iş akışı izlerini oluşturuyor.", points: ["Sağlayıcıdan bağımsız telemetri standardı", "ASP.NET Core, çalışma zamanı ve HTTP ölçümleri", "Prometheus exporter ve `/metrics` endpoint'i"] },
            { title: "Korelasyon Kimliği", description: "S8'de tek istek olarak test ettiğimiz akış, üretimde çok sayıda log satırı oluşturabilir. İşlem hattının başına korelasyon middleware'i ekliyor; aynı kimliği HttpContext, yanıt başlığı ve Serilog bağlamında taşıyoruz.", points: ["Her isteğe benzersiz kimlik verme", "Aynı kimliği yanıt başlığında ve loglarda taşıma", "Bir isteği servisler boyunca uçtan uca izleme"] },
            { title: "Sağlık ve Tanılama", description: "Yeni telemetri verilerini gözlemlemek ve uygulamanın çalıştığını bildirmek için sağlık ve tanılama endpoint'leri ekliyoruz. Bu endpoint'ler S10'da container platformunun kullanacağı operasyonel sinyallere dönüşüyor.", points: ["Uygulama sağlığını kontrol eden endpoint'ler", "Sürüm, ortam ve çalışma süresi bilgisi", "Yük dengeleyici ve container platformlarının sağlık kontrolü"] }
    ],
        checklist: ["Serilog ve OpenTelemetry paketlerini ekle.", "Yapılandırılmış log ayarlarını konfigürasyonda tanımla.", "Korelasyon kimliği middleware'ini oluştur ve işlem hattının başına ekle.", "Uygulamaya özel metrikleri tanımlayan AppTelemetry sınıfını oluştur.", "Tanılama endpoint'ini ekle.", "Prometheus metriklerini ve iz ölçümlerini bağla.", "Log, korelasyon başlığı, /metrics ve tanılama çıktılarını doğrula."],
    code: [
    { title: "Korelasyon kimliği middleware'ini ekle", why: "İstek kimliği HttpContext, yanıt ve Serilog bağlamında aynı değeri taşır.", file: "ECommerceApi/Observability/CorrelationIdMiddleware.cs", language: "csharp", code: String.raw`using Serilog.Context;

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
    { title: "Özel metrikleri tanımla", why: "Framework metriklerine ek olarak bootcamp'e özgü olayları ve süreleri ölçeriz.", file: "ECommerceApi/Observability/AppTelemetry.cs", language: "csharp", code: String.raw`using System.Diagnostics;
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
    { title: "Metrik ve iz üreten endpoint yaz", why: "Tek çağrıda log, histogram ve özel span davranışını gözlemleriz.", file: "ECommerceApi/Controllers/DiagnosticsController.cs", language: "csharp", code: String.raw`[HttpGet("work")]
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
    { title: "Serilog ve OpenTelemetry'yi bağla", why: "Log, metrik ve iz sağlayıcılarını uygulama başlarken tek yerde yapılandırırız.", file: "ECommerceApi/Program.cs", language: "csharp", code: String.raw`builder.Host.UseSerilog((context, services, config) => config
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
            { title: "Yayın Ortamları", description: "S9'daki API geliştirici ayarlarıyla çalışıyor. Aynı uygulama çıktısını test ve üretim ortamlarına taşımak için konfigürasyonu uygulamadan ayırıyor, davranışı ortam değişkenleriyle yönetiyoruz.", points: ["Geliştirme, test ve üretim ortamlarının farkları", "Aynı kodu farklı konfigürasyonlarla çalıştırma", "Yayın öncesi kalite ve kod inceleme kontrolleri"] },
            { title: "Web Sunucuları ve Barındırma", description: "Container içinde uygulamayı Kestrel çalıştırıyor ve 8080 portunu dinliyor. Dış ortamda ters proxy'nin TLS, yönlendirme ve yük dengeleme sorumluluklarını nasıl üstlendiğini inceliyoruz.", points: ["ASP.NET Core sunucusu olarak Kestrel", "Nginx veya Apache ile ters proxy", "Windows ortamlarında IIS seçeneği"] },
            { title: "Performans ve Güvenilirlik", description: "S9'da eklediğimiz sağlık ve telemetri sinyalleri artık yayın kararlarına yön veriyor. Uygulama örneklerini izlemek, yükü dengelemek ve yatay ölçeklemek için hangi sinyallere ihtiyaç duyduğumuzu belirliyoruz.", points: ["Sağlık kontrolü ve izleme", "Yük dengeleme ve yüksek erişilebilirlik", "Dikey ve yatay ölçekleme farkı"] },
            { title: "Docker", description: "Yerel SDK bağımlılığını kaldırmak için projeye çok aşamalı Dockerfile ve .dockerignore ekliyoruz. SDK yalnızca derleme aşamasında kalıyor; son imajda ASP.NET çalışma zamanı ve yayımlanan uygulama bulunuyor.", points: ["Uygulamayı ve bağımlılıklarını imaj olarak paketleme", "Çok aşamalı derlemeyle küçük çalışma zamanı imajı", "`.dockerignore` ile temiz derleme bağlamı"] },
            { title: "Docker Compose", description: "API'nin yanına S9 loglarını toplayacak Seq servisini ekliyoruz. Ortak ağ, üretim ortamı değişkenleri ve veritabanı/log/Seq birimleri tek bir tanım dosyasında kuruluyor.", points: ["API ve Seq servislerini birlikte çalıştırma", "Container ağı ve ortam değişkenleri", "Birimlerle veriyi kalıcı tutma"] },
            { title: "CI/CD", description: "S8 testlerini ve yeni Docker derlemesini her push işleminde otomatik çalıştıran bir Bitbucket işlem hattı ekliyoruz. İmaj üretimi ancak geri yükleme, Release derlemesi ve test kontrolleri başarıyla tamamlanırsa başlıyor.", points: ["Her push işleminde geri yükleme, derleme ve test", "Başarılı işlem hattından sonra imaj üretimi", "Bitbucket Pipelines ile tekrarlanabilir otomasyon"] },
            { title: "Yayın Stratejileri", description: "Tek bir container çalıştırmak teslim sürecini tamamlamaz. Oluşturduğumuz imajın blue-green, canary veya rolling yöntemleriyle düşük riskle yayımlanmasını ve gerektiğinde geri alınmasını planlıyoruz.", points: ["Blue-green deployment", "Canary ve rolling update", "Hızlı geri dönüş ve risk azaltma"] },
            { title: "Orkestrasyon ve Bulut", description: "Compose, yerel çoklu servis ortamını yönetir; daha büyük ölçekte aynı imajı Kubernetes ve bulut platformları çalıştırır. Sağlık sinyalleri otomatik yeniden başlatma ve ölçeklemenin temelini oluşturur.", points: ["Kubernetes'in container yönetimindeki rolü", "Otomatik yeniden başlatma ve ölçekleme", "Azure, AWS ve GCP üzerinde barındırma seçenekleri"] }
    ],
        checklist: ["Derleme çıktısını sadeleştiren .dockerignore dosyasını oluştur.", "SDK ve çalışma zamanı aşamalarını ayıran Dockerfile'ı yaz.", "API imajını derleyip Kestrel üzerinde çalıştır.", "Serilog loglarını Seq'e gönderecek ayarları ekle.", "API ve Seq'i docker-compose.yml ile birlikte ayağa kaldır.", "Kalıcı veriler ve loglar için birimler tanımla.", "Geri yükle → derle → test et → imaj oluştur adımlarını işlem hattına ekle.", "API, Swagger, Seq ve işlem hattı sonuçlarını doğrula."],
    code: [
    { title: "Çok aşamalı imaj oluştur", why: "SDK yalnızca derleme aşamasında kalır; son imaj daha küçük olur ve daha az saldırı yüzeyi barındırır.", file: "Dockerfile", language: "dockerfile", code: String.raw`FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
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
    { title: "API ve Seq Compose ortamını kur", why: "Uygulamayı, log sunucusunu, ağı ve kalıcı birimleri tek komutla yönetiriz.", file: "docker-compose.yml", language: "yaml", code: String.raw`services:
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
    { title: "Derleme ve test işlem hattını ekle", why: "Her push işlemini temiz bir .NET SDK ortamında doğrular, main dalı için imaj üretimini ayrı bir kalite kontrolü olarak çalıştırırız.", file: "bitbucket-pipelines.yml", language: "yaml", code: String.raw`image: mcr.microsoft.com/dotnet/sdk:8.0

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
    { title: "Container ortamını doğrula", why: "İmajı ve çoklu servis akışını yerelde üretime benzer bir ortamda test ederiz.", file: "Terminal", language: "bash", code: String.raw`docker build -t ecommerceapi:local .
docker run --rm -p 8080:8080 \
  -e ASPNETCORE_ENVIRONMENT=Development ecommerceapi:local

docker compose up --build
# API: http://localhost:8080/swagger
# Seq: http://localhost:5341` }
    ]
  }
};
