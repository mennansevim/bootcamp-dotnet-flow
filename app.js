const sessions = [
  {
    id: 1, title: ".NET ve Web API'ye Giriş", speaker: "Burak", dates: "20 Ekim 2026 · Salı", start: "2026-10-20", end: "2026-10-20", format: "Teori + kısa uygulama",
    summary: "Henüz bir uygulamamız yok. Bu oturumda .NET 8 çözümünü kuruyor, JSON yanıtı veren ilk controller'ları ve bellekte çalışan Product CRUD akışını ekliyoruz.",
    baseline: "Boş bir çalışma alanından başlıyoruz; henüz çözüm, proje veya endpoint bulunmuyor.",
    additions: [".NET 8 Web API projesi ve çözüm iskeleti", "Hello, Weather ve Products controller'ları", "Product modeli ve bellekte CRUD akışı", "Routing, JSON yanıtları ve Swagger test ekranı"],
    topics: [
      ["Proje temeli", "Boş klasörden çalışan .NET 8 çözümüne"],
      ["İlk HTTP yüzeyi", "Controller, route ve sorgu endpoint'leri"],
      ["İlk veri modeli", "Product modeli ve bellek koleksiyonu"],
      ["Keşif ve test", "JSON yanıtları ve Swagger arayüzü"]
    ],
    outcomes: [".NET ekosisteminin ve çalışma modelinin temelini kavrarsın.", "Controller tabanlı bir ASP.NET Core Web API oluşturursun.", "REST endpoint'leri için doğru HTTP metodunu ve durum kodunu seçersin.", "Route, sorgu parametresi, model ve JSON yanıtlarını kullanırsın.", "API'yi Swagger üzerinden çalıştırıp test edersin."]
  },
  {
    id: 2, title: "ASP.NET Core Temelleri", speaker: "Serkan", dates: "22 Ekim 2026 · Perşembe", start: "2026-10-22", end: "2026-10-22", format: "Teori + uygulama",
    summary: "S1'de çalışan API'nin bütün sorumlulukları controller'da toplanıyordu. Şimdi iş kurallarını servis katmanına, dış sözleşmeyi DTO'lara taşıyor; bağımlılık enjeksiyonu, doğrulama, middleware ve ayar yönetimi ekliyoruz.",
    baseline: "S1 sonunda ProductsController veriyi bellekte tutuyor ve CRUD iş mantığını doğrudan yürütüyor. Ortak hata, doğrulama ve ayar yönetimi henüz yok.",
    additions: ["Product DTO'ları ve giriş doğrulama kuralları", "IProductService ve ProductService katmanı", "Bağımlılık enjeksiyonu ve yaşam süresi kayıtları", "Merkezi hata ve istek günlüğü middleware'leri", "Options Pattern ile türü belirli ayarlar"],
    topics: [
      ["Controller'ı incelt", "HTTP koordinasyonu controller'da kalsın"],
      ["Servis katmanı ekle", "İş kurallarını ayrı ve test edilebilir tut"],
      ["DTO ile sınır çiz", "İç model ile API sözleşmesini ayır"],
      ["Ortak davranışları merkezileştir", "DI, middleware, doğrulama ve options"]
    ],
    outcomes: ["ASP.NET Core istek yaşam döngüsünü açıklarsın.", "Bağımlılıklar için doğru yaşam süresini seçersin.", "Controller, servis ve DTO sorumluluklarını birbirinden ayırırsın.", "Ortak davranışları middleware ve Options Pattern ile merkezileştirirsin.", "Doğrulama ve Swagger ile anlaşılır bir API sözleşmesi sunarsın."]
  },
  {
    id: 3, title: "ASP.NET Core Web API Temelleri", speaker: "Burak ve Metin (teori) · Burak (uygulama)", dates: "27 Ekim 2026 · teori · 3 Kasım 2026 · uygulama", start: "2026-10-27", end: "2026-11-03", format: "Teori + uygulama",
    summary: "S2'de API'yi katmanlara ayırdık; ancak liste endpoint'i büyüyen verinin tamamını döndürüyor ve dış sözleşme yeterince açık değil. Bu oturumda sorgu modeli, filtreleme, sıralama, sayfalama, route kısıtları ve standart hata yanıtları ekliyoruz.",
    baseline: "S2 sonunda controller işi servise devrediyor, DTO ve middleware kullanıyor. Ancak GET listesi tüm veriyi döndürüyor, route parametreleri doğrulanmıyor ve hata/Swagger sözleşmesi eksik kalıyor.",
    additions: ["ProductQueryParameters ile ortak sorgu sözleşmesi", "PagedResult<T> ile veri ve sayfalama bilgileri", "Filtrele → sırala → say → sayfala akışı", "Route kısıtları ve açık model binding kaynakları", "Problem Details, XML yorumları ve yanıt tanımları"],
    topics: [
      ["Liste sözleşmesini büyüt", "Arama, sıralama ve sayfa parametreleri"],
      ["Yanıtı zenginleştir", "Items yanında sayfalama bilgileri"],
      ["Geçersiz isteği erken durdur", "Bağlama kaynakları ve route kısıtları"],
      ["Sözleşmeyi görünür yap", "Problem Details, XML yorumları ve Swagger"]
    ],
    outcomes: ["Her parametre için doğru model binding kaynağını seçersin.", "Sayfalama bilgilerini içeren güvenli liste yanıtları tasarlarsın.", "Route kısıtlarıyla geçersiz istekleri erkenden reddedersin.", "Tüm endpoint'lerde ortak bir hata sözleşmesi sunarsın.", "Endpoint ve yanıtları Swagger'da eksiksiz belgelersin."]
  },
  {
    id: 4, title: "Veri Yönetimi ve EF Core", speaker: "Cem", dates: "5 Kasım 2026 · teori · 10 Kasım 2026 · uygulama", start: "2026-11-05", end: "2026-11-10", format: "Teori + uygulama",
    summary: "S3'te API sözleşmesini geliştirdik; ancak veriler hâlâ bellekte tutuluyor ve uygulama yeniden başladığında kayboluyor. Bu oturumda SQLite, EF Core, entity ilişkileri, migration ve repository katmanını ekleyerek veri kalıcılığını sağlıyoruz.",
    baseline: "S3 sonunda filtrelenen ve sayfalanan Product verisi, ProductService içindeki bellek koleksiyonundan geliyor. Kalıcı şema, ilişki ve veri erişim soyutlaması bulunmuyor.",
    additions: ["EF Core SQLite ve migration araçları", "Product/Category entity'leri ve ilişkileri", "BootcampDbContext, Fluent API ve başlangıç verileri", "Genel ve Product repository katmanları", "Asenkron veri erişimi, LINQ ve soft delete"],
    topics: [
      ["Bellekten veritabanına", "SQLite ve EF Core altyapısı"],
      ["Kalıcı modeli kur", "Entity, ilişki ve DbContext"],
      ["Şemayı sürümle", "Code First, Fluent API ve migration'lar"],
      ["Erişimi soyutla", "Repository, LINQ ve soft delete"]
    ],
    outcomes: ["EF Core ile entity ve ilişkileri modelliyorsun.", "DbContext ve migration sürecini yönetirsin.", "LINQ ile verimli veritabanı sorguları yazarsın.", "Repository Pattern ile veri erişim ayrıntılarını servis katmanından ayırırsın.", "Soft delete ve global query filter uygularsın."]
  },
  {
    id: 5, title: "ASP.NET Core Güvenliği ve Kimlik", speaker: "Mustafa", dates: "12 Kasım 2026 · teori · 17 Kasım 2026 · uygulama", start: "2026-11-12", end: "2026-11-17", format: "Teori + uygulama",
    summary: "S4 sonunda ürün verileri kalıcı hale geldi; ancak API'ye erişen kullanıcıları henüz doğrulamıyoruz. Bu oturumda kullanıcı modeli, BCrypt ile güvenli parola saklama, kayıt/giriş servisleri ve JWT tabanlı kimlik doğrulama ekliyoruz.",
    baseline: "S4 sonunda EF Core ve repository üzerinden kalıcı CRUD çalışıyor. User tablosu, giriş akışı, token üretimi ve endpoint yetkilendirmesi henüz bulunmuyor.",
    additions: ["UserEntity, roller ve başlangıç admin kullanıcısı", "Kayıt/giriş DTO'ları ve AuthService", "BCrypt ile salt'lı parola hashleme", "JwtSettings ve claim üreten JwtService", "Kimlik doğrulama/yetkilendirme işlem hattı ve Bearer testi"],
    topics: [
      ["Kullanıcıyı kalıcılaştır", "User entity, roller ve benzersizlik"],
      ["Parolayı güvenli sakla", "BCrypt hash ve doğrulama"],
      ["Kimliği token'a taşı", "JWT, claim ve imza"],
      ["İşlem hattını koru", "Bearer doğrulama ve rol tabanlı erişim"]
    ],
    outcomes: ["Kimlik doğrulama ile yetkilendirme arasındaki farkı açıklarsın.", "JWT üretir ve güvenli şekilde doğrularsın.", "Parolaları BCrypt ile güvenli biçimde saklarsın.", "Rol ve claim tabanlı erişim kontrolü kurarsın.", "Güvenlik ayarlarını konfigürasyon üzerinden yönetirsin."]
  },
  {
    id: 6, title: "Transaction ve Hata Yönetimi", speaker: "Gözde", dates: "19 Kasım 2026 · teori · 24 Kasım 2026 · uygulama", start: "2026-11-19", end: "2026-11-24", format: "Teori + uygulama",
    summary: "S5'te kullanıcı kimliğini güvenceye aldık; ancak birden fazla kaydı değiştiren işlemlerde verinin yarım kalma riski sürüyor. Bu oturumda banka transferi örneği üzerinden transaction, Unit of Work deseni ve iş alanına özel hata türleri ekliyoruz.",
    baseline: "S5 sonunda kullanıcı ve ürün işlemleri tekil EF Core çağrılarıyla çalışıyor. Birden çok değişikliğin birlikte commit veya rollback edilmesini yöneten iş birimi ve anlamlı iş alanı hataları henüz yok.",
    additions: ["Banka hesabı ve transfer veri modeli", "Transaction sınırını yöneten Unit of Work", "Para çıkışı ve girişini atomik yapan BankService", "İş kurallarını ifade eden özel hata türleri", "Hata türlerini HTTP kodlarına çeviren merkezi yönetim"],
    topics: [
      ["Çok adımlı işi atomik yap", "Transferde ya hep ya hiç"],
      ["Transaction sınırını soyutla", "Unit of Work ile commit/rollback"],
      ["İş hatalarını adlandır", "Bulunamadı, çakışma ve yetersiz bakiye"],
      ["HTTP hatasını merkezileştir", "İş alanı hatası → güvenli yanıt"]
    ],
    outcomes: ["ACID ilkelerini ve transaction sınırlarını açıklarsın.", "EF Core transaction'larında commit ve rollback işlemlerini yönetirsin.", "Unit of Work desenini uygularsın.", "İş hatalarını anlamlı özel hata türleriyle ifade edersin.", "Merkezi ve güvenli API hata yanıtları üretirsin."]
  },
  {
    id: 7, title: "Asenkron Programlama", speaker: "Serkan", dates: "26 Kasım 2026 · teori · 1 Aralık 2026 · uygulama", start: "2026-11-26", end: "2026-12-01", format: "Teori + uygulama",
    summary: "S6'da transaction güvenliğini sağladık; ancak bazı servisler henüz HTTP'ye açılmadı ve I/O zincirinin tamamı asenkron çalışmıyor. Bu oturumda Auth/Bank controller'larını, asenkron örnekleri, Task birleştirme yöntemlerini ve iptal desteğini ekliyoruz.",
    baseline: "S6 sonunda AuthService ve BankService iş kurallarını içeriyor. Bu servislerin tam HTTP yüzeyi ve controller → servis → repository boyunca tutarlı asenkron/iptal akışı henüz eksik.",
    additions: ["AuthController ve BankController HTTP endpoint'leri", "AsyncDemoService ve AsyncDemoController", "WhenAll, WhenAny ve kontrollü paralellik örnekleri", "CancellationToken ile iptal edilebilir işler", "Products akışının uçtan uca asenkron hale getirilmesi"],
    topics: [
      ["I/O zincirini asenkron yap", "Controller'dan repository'ye await"],
      ["Servisleri HTTP'ye aç", "Auth ve Bank controller'ları"],
      ["Bağımsız işleri birleştir", "WhenAll, WhenAny ve paralellik"],
      ["Gereksiz işi durdur", "CancellationToken ve hata yayılımı"]
    ],
    outcomes: ["Senkron ve asenkron çalışma arasındaki farkı açıklarsın.", "async, await, Task ve Task<T> yapılarını doğru yerde kullanırsın.", "Bağımsız işleri WhenAll ile aynı anda yürütürsün.", "Uzun süren işlemleri CancellationToken ile iptal edersin.", "API katmanlarını uçtan uca asenkron çalışacak şekilde tasarlarsın."]
  },
  {
    id: 8, title: "Birim ve Entegrasyon Testleri", speaker: "Mennan", dates: "3 Aralık 2026 · Perşembe", start: "2026-12-03", end: "2026-12-03", format: "Teori + uygulama + kısa yapay zekâ oturumu",
    summary: "S7 sonunda özellikler uçtan uca çalışıyor; ancak değişikliklerin mevcut davranışı bozmadığını otomatik olarak doğrulayan bir güvenlik ağımız yok. Bu oturumda ayrı bir test projesi, servis/controller birim testleri ve gerçek işlem hattını kullanan entegrasyon testleri ekliyoruz.",
    baseline: "S7 sonunda Product, Auth, Bank ve asenkron endpoint'ler elle test edilebiliyor. Yeniden düzenleme sonrası oluşabilecek bozulmaları otomatik yakalayacak test projesi ve fixture bulunmuyor.",
    additions: ["ECommerceApi.Tests xUnit projesi", "Moq ile izole servis ve controller testleri", "FluentAssertions ile okunabilir doğrulamalar", "WebApplicationFactory tabanlı gerçek HTTP testleri", "Testte SQLite yerine InMemory EF Core ortamı"],
    topics: [
      ["Test projesini ekle", "Üretim kodundan ayrı xUnit assembly"],
      ["Servisleri izole doğrula", "Repository taklitleri ve iş kuralları"],
      ["Controller sözleşmesini test et", "ActionResult ve durum kodları"],
      ["Gerçek işlem hattını çalıştır", "WebApplicationFactory ve InMemory DB"]
    ],
    outcomes: ["Birim ve entegrasyon testlerinin sınırlarını doğru belirlersin.", "xUnit ile okunabilir testler yazarsın.", "Moq kullanarak bağımlılıkları testten ayırırsın.", "WebApplicationFactory ile gerçek API işlem hattını test edersin.", "Yapay zekânın önerdiği testleri eleştirel gözle incelersin."]
  },
  {
    id: 9, title: "İzleme ve Loglama", speaker: "Hakan", dates: "8 Aralık 2026 · Salı", start: "2026-12-08", end: "2026-12-08", format: "Teori + uygulama",
    summary: "S8'de uygulama davranışını testlerle güvenceye aldık; fakat uygulamanın üretimde ne yaptığını dışarıdan göremiyoruz. Bu oturumda yapılandırılmış log, korelasyon kimliği, metrik, iz, sağlık kontrolü ve tanılama araçları ekliyoruz.",
    baseline: "S8 sonunda kod değişiklikleri testlerle doğrulanıyor. Canlı istekleri ilişkilendiren bir kimlik, sorgulanabilir loglar, Prometheus metrikleri veya iz/tanılama görünürlüğü henüz yok.",
    additions: ["Serilog ile yapılandırılmış loglama ve ortam ayarları", "Her isteği izleyen CorrelationIdMiddleware", "OpenTelemetry metrik ve iz ölçümleri", "AppTelemetry özel sayaç, histogram ve span'ları", "Prometheus /metrics, sağlık ve tanılama endpoint'leri"],
    topics: [
      ["Logu yapılandır", "Serilog alanları, hedefler ve zenginleştirme"],
      ["İstekleri ilişkilendir", "Korelasyon kimliğiyle uçtan uca takip"],
      ["Davranışı ölç", "OpenTelemetry ve Prometheus metrikleri"],
      ["Tanılama yüzeyi ekle", "İz, sağlık ve tanılama endpoint'leri"]
    ],
    outcomes: ["Log, metrik ve iz arasındaki farkı açıklarsın.", "Serilog ile sorgulanabilir, yapılandırılmış loglar üretirsin.", "OpenTelemetry ile metrik ve iz verisi toplarsın.", "Korelasyon kimliğiyle tek bir isteği uçtan uca izlersin.", "Sağlık kontrolü ve tanılama endpoint'leri tasarlarsın."]
  },
  {
    id: 10, title: "Uygulama Yayını", speaker: "Mennan ve Burak", dates: "10 Aralık 2026 · teori · 15 Aralık 2026 · uygulama", start: "2026-12-10", end: "2026-12-15", format: "Teori + uygulama",
    summary: "S9'da uygulamayı gözlemlenebilir hale getirdik. Şimdi aynı uygulamayı geliştirici makinesinden bağımsız ve tekrar üretilebilir biçimde çalıştırmamız gerekiyor. Bu oturumda Docker imajı, Compose ortamı, Seq ve CI kalite kontrolleri ekliyoruz.",
    baseline: "S9 sonunda API log, metrik ve iz üretiyor; ancak yerel SDK'ya ve makine ayarlarına bağlı çalışıyor. Paketlenmiş imaj, çoklu servis ortamı ve otomatik derleme/test işlem hattı henüz yok.",
    additions: ["Çok aşamalı Dockerfile ve sade .dockerignore", "API ve Seq servislerini yöneten Docker Compose", "Ortam değişkenleriyle üretim konfigürasyonu", "Veritabanı, log ve Seq için kalıcı birimler", "Geri yükle → derle → test et → imaj oluştur CI akışı"],
    topics: [
      ["Uygulamayı paketle", "Çok aşamalı Docker imajı"],
      ["Servisleri birlikte çalıştır", "API, Seq, ağ ve kalıcı birimler"],
      ["Ortamı dışarıdan yapılandır", "Ortam değişkenleri ve gizli bilgiler"],
      ["Teslimatı otomatikleştir", "CI derleme/test kontrolleri ve imaj üretimi"]
    ],
    outcomes: ["Geliştirme, test ve üretim ortamları arasındaki farkı açıklarsın.", "Çok aşamalı ve küçük bir Docker imajı oluşturursun.", "Compose ile API ve Seq servislerini birlikte çalıştırırsın.", "CI/CD işlem hattına derleme ve test kontrolleri eklersin.", "İhtiyaca uygun yayın ve ölçeklendirme yöntemini seçersin."]
  }
];

const branches = ["ref/s01-intro", "ref/s02-core-fundamentals", "ref/s03-web-api-basics", "ref/s04-data-management", "ref/s05-security-identity", "ref/s06-transactions-errors", "ref/s07-async-programming", "ref/s08-testing", "ref/s09-monitoring-logging", "ref/s10-deployment"];
const repositoryUrl = "https://bitbucket.org/commencers/ecommerceapi/src";

sessions.forEach((session, index) => Object.assign(session, {
  branch: branches[index],
  branchUrl: `${repositoryUrl}/${encodeURIComponent(branches[index])}/`
}, window.sessionDetails?.[session.id] ?? {}));

const localDay = (value = new Date()) => Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
const asDay = value => Date.parse(`${value}T00:00:00Z`);
const today = localDay();
const completed = sessions.filter(session => today > asDay(session.end)).length;
const focus = sessions.find(session => today <= asDay(session.end)) ?? sessions.at(-1);
const focusState = today < asDay(focus.start) ? "Yaklaşan oturum" : today <= asDay(focus.end) ? "Şu anki oturum" : "Bootcamp tamamlandı";

document.querySelector("#current-label").textContent = focusState;
document.querySelector("#current-title").textContent = `Oturum ${focus.id} · ${focus.title}`;
document.querySelector("#current-speaker").textContent = focus.speaker;
document.querySelector("#current-date").textContent = focus.dates;
document.querySelector("#progress-text").textContent = `${completed} / ${sessions.length} oturum`;
document.querySelector("#progress-bar").style.width = `${(completed / sessions.length) * 100}%`;
document.querySelector("[role='progressbar']").setAttribute("aria-valuenow", completed);

const sessionState = session => {
  if (today > asDay(session.end)) return ["Tamamlandı", "completed"];
  if (session.id === focus.id) return [focusState, "current"];
  return ["Planlandı", "upcoming"];
};

const sessionList = document.querySelector("#session-list");
sessions.forEach(session => {
  const [label, state] = sessionState(session);
  const button = document.createElement("button");
  button.type = "button";
  button.className = `session-card${session.id === focus.id ? " is-current" : ""}`;
  button.setAttribute("aria-label", `Oturum ${session.id}: ${session.title} ayrıntılarını aç`);
  button.innerHTML = `
    <span class="session-number">S${String(session.id).padStart(2, "0")}</span>
    <span class="session-main">
      <h3>${session.title}</h3>
      <span class="session-topics">${session.topics.slice(0, 3).map(topic => `<span>${topic[0]}</span>`).join("")}</span>
      <span class="badge ${state}">${label}</span>
    </span>
    <span class="session-when"><strong>${session.speaker}</strong>${session.dates}</span>
    <span class="session-arrow" aria-hidden="true">→</span>`;
  button.addEventListener("click", () => openSession(session));
  sessionList.append(button);
});

const dialog = document.querySelector("#session-dialog");
const escapeHtml = value => value.replace(/[&<>"]/g, character => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
})[character]);
const codeStepsStorageKey = sessionId => `bootcamp-code-steps-v1-s${sessionId}`;
const legacyCodeStorageKey = (sessionId, codeIndex) => `bootcamp-code-s${sessionId}-${codeIndex}`;
const normalizeCodeStep = step => ({
  title: String(step.title ?? "Yeni kodlama adımı"),
  file: String(step.file ?? "ECommerceApi/"),
  why: String(step.why ?? "Bu adımın amacını buraya yaz."),
  language: String(step.language ?? "csharp"),
  code: String(step.code ?? "// Kodunu buraya yaz.")
});
const defaultCodeSteps = session => session.code.map(normalizeCodeStep);
const readCodeSteps = session => {
  try {
    const stored = JSON.parse(localStorage.getItem(codeStepsStorageKey(session.id)));
    if (Array.isArray(stored)) return stored.map(normalizeCodeStep);
  } catch { /* Varsayılan adımlarla devam et. */ }

  return defaultCodeSteps(session).map((step, index) => {
    try {
      return { ...step, code: localStorage.getItem(legacyCodeStorageKey(session.id, index)) ?? step.code };
    } catch {
      return step;
    }
  });
};
const storeCodeSteps = session => {
  try {
    localStorage.setItem(codeStepsStorageKey(session.id), JSON.stringify(session.editableCode));
    return true;
  } catch {
    return false;
  }
};

const renderCodeSteps = (session, openIndex = -1, editIndex = -1) => {
  const root = document.querySelector("#dialog-code");
  const steps = session.editableCode;

  root.innerHTML = steps.length ? steps.map((step, index) => `
    <details class="code-step"${index === openIndex ? " open" : ""}>
      <summary>
        <span class="code-step-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="code-step-copy">
          <strong>${escapeHtml(step.title)}</strong>
          <small>${escapeHtml(step.file)}</small>
          <span>${escapeHtml(step.why)}</span>
        </span>
        <span class="code-toggle" aria-hidden="true">+</span>
      </summary>
      <div class="step-management" aria-label="${escapeHtml(step.title)} adım kontrolleri">
        <button class="step-action" type="button" data-step-action="edit" data-code-index="${index}">Düzenle</button>
        <button class="step-action" type="button" data-step-action="move-up" data-code-index="${index}"${index === 0 ? " disabled" : ""}>↑ Yukarı</button>
        <button class="step-action" type="button" data-step-action="move-down" data-code-index="${index}"${index === steps.length - 1 ? " disabled" : ""}>↓ Aşağı</button>
        <button class="step-action danger" type="button" data-step-action="delete" data-code-index="${index}">Sil</button>
      </div>
      <form class="step-editor" data-code-index="${index}"${index === editIndex ? "" : " hidden"}>
        <label>Sıra no<input name="position" type="number" min="1" max="${steps.length}" value="${index + 1}" required></label>
        <label class="wide">Başlık<input name="title" value="${escapeHtml(step.title)}" required></label>
        <label>Dosya yolu<input name="file" value="${escapeHtml(step.file)}"></label>
        <label>Dil<input name="language" value="${escapeHtml(step.language)}" placeholder="csharp"></label>
        <label class="wide">Açıklama<textarea name="why">${escapeHtml(step.why)}</textarea></label>
        <label class="full">Kod<textarea class="code-input" name="code" spellcheck="false">${escapeHtml(step.code)}</textarea></label>
        <div class="editor-actions">
          <button class="manage-button" type="button" data-step-action="cancel" data-code-index="${index}">Vazgeç</button>
          <button class="manage-button primary" type="submit">Kaydet</button>
        </div>
      </form>
      <div class="code-panel">
        <div class="code-toolbar">
          <span class="code-language">${escapeHtml(step.language)}</span>
          <span class="code-actions"><button class="code-button copy-button" type="button" data-step-action="copy" data-code-index="${index}" aria-live="polite">Kopyala</button></span>
        </div>
        <pre><code class="language-${escapeHtml(step.language)}">${escapeHtml(step.code)}</code></pre>
      </div>
    </details>`).join("") : `<p class="code-empty">Henüz kodlama adımı yok. “Yeni kodlama adımı” ile ilk adımı ekleyebilirsin.</p>`;

  root.querySelectorAll(".step-editor").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const index = Number(form.dataset.codeIndex);
      const data = new FormData(form);
      const updated = normalizeCodeStep({
        title: data.get("title"),
        file: data.get("file"),
        why: data.get("why"),
        language: data.get("language"),
        code: data.get("code")
      });
      const target = Math.max(0, Math.min(steps.length - 1, Number(data.get("position")) - 1));
      steps.splice(index, 1);
      steps.splice(target, 0, updated);
      storeCodeSteps(session);
      renderCodeSteps(session, target);
    });
  });

  root.querySelectorAll("[data-step-action]").forEach(button => {
    button.addEventListener("click", async () => {
      const index = Number(button.dataset.codeIndex);
      const action = button.dataset.stepAction;
      if (action === "edit") return renderCodeSteps(session, index, index);
      if (action === "cancel") return renderCodeSteps(session, index);
      if (action === "move-up" || action === "move-down") {
        const target = action === "move-up" ? index - 1 : index + 1;
        [steps[index], steps[target]] = [steps[target], steps[index]];
        storeCodeSteps(session);
        return renderCodeSteps(session, target);
      }
      if (action === "delete") {
        if (!window.confirm(`“${steps[index].title}” adımı silinsin mi?`)) return;
        steps.splice(index, 1);
        storeCodeSteps(session);
        return renderCodeSteps(session, Math.min(index, steps.length - 1));
      }
      if (action === "copy") {
        try {
          await navigator.clipboard.writeText(steps[index].code);
          button.textContent = "Kopyalandı";
        } catch {
          button.textContent = "Kopyalanamadı";
        }
        window.setTimeout(() => { button.textContent = "Kopyala"; }, 1400);
      }
    });
  });
};

const openSession = session => {
  document.querySelector("#dialog-number").textContent = `Oturum ${String(session.id).padStart(2, "0")}`;
  document.querySelector("#dialog-title").textContent = session.title;
  document.querySelector("#dialog-meta").innerHTML = `<span>${session.speaker}</span><span>${session.dates}</span><span>${session.format}</span><a class="branch-link" href="${session.branchUrl}" target="_blank" rel="noopener noreferrer">${session.branch} <span aria-hidden="true">↗</span></a>`;
  document.querySelector("#dialog-summary").textContent = session.summary;
  document.querySelector("#dialog-baseline").textContent = session.baseline;
  document.querySelector("#dialog-additions").innerHTML = session.additions
    .map(addition => `<li>${addition}</li>`).join("");
  document.querySelector("#dialog-topics").innerHTML = session.theory.map((topic, index) => `
    <article class="dialog-topic">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <h4>${topic.title}</h4>
        <p>${topic.description}</p>
        <ul>${topic.points.map(point => `<li>${point}</li>`).join("")}</ul>
      </div>
    </article>`).join("");
  document.querySelector("#dialog-checklist").innerHTML = session.checklist
    .map(item => `<li><span>${item}</span></li>`).join("");
  session.editableCode = readCodeSteps(session);
  renderCodeSteps(session);
  document.querySelector("#dialog-outcome").innerHTML = session.outcomes
    .map(outcome => `<li>${outcome}</li>`).join("");
  document.querySelector("#add-code-step").onclick = () => {
    session.editableCode.push(normalizeCodeStep({}));
    storeCodeSteps(session);
    const index = session.editableCode.length - 1;
    renderCodeSteps(session, index, index);
  };
  document.querySelector("#reset-code-steps").onclick = () => {
    if (!window.confirm("Bu oturumda yaptığın tüm kodlama adımı değişiklikleri silinsin mi?")) return;
    try {
      localStorage.removeItem(codeStepsStorageKey(session.id));
      session.code.forEach((_, index) => localStorage.removeItem(legacyCodeStorageKey(session.id, index)));
    } catch { /* Depolama kapalıysa varsayılanları yine göster. */ }
    session.editableCode = defaultCodeSteps(session);
    renderCodeSteps(session);
  };
  dialog.showModal();
};

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});