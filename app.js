const sessions = [
  {
    id: 1, title: ".NET ve Web API'ye Giriş", speaker: "Burak", dates: "20 Ekim 2026 · Salı", start: "2026-10-20", end: "2026-10-20", format: "Teori + kısa hands-on",
    summary: "Henüz uygulama yok. Bu session'da .NET 8 solution'ını kurup HTTP üzerinden JSON sunan ilk controller'ları ve bellekte çalışan Product CRUD akışını ekliyoruz.",
    baseline: "Boş bir çalışma alanından başlıyoruz; henüz solution, proje veya endpoint bulunmuyor.",
    additions: [".NET 8 Web API projesi ve solution iskeleti", "Hello, Weather ve Products controller'ları", "Product modeli ve bellekte CRUD davranışı", "Routing, JSON yanıtları ve Swagger test yüzeyi"],
    topics: [
      ["Proje temeli", "Boş klasörden çalışan .NET 8 solution'ına"],
      ["İlk HTTP yüzeyi", "Controller, route ve query endpoint'leri"],
      ["İlk veri modeli", "Product modeli ve in-memory koleksiyon"],
      ["Keşif ve test", "JSON yanıtları ve Swagger arayüzü"]
    ],
    outcomes: [".NET ekosistemini ve çalışma modelini açıklayabilmek", "Controller tabanlı bir ASP.NET Core Web API oluşturabilmek", "REST endpoint'lerini doğru HTTP metodu ve durum koduyla tasarlayabilmek", "Route, query string, model ve JSON yanıtlarını kullanabilmek", "Swagger üzerinden API'yi çalıştırıp test edebilmek"]
  },
  {
    id: 2, title: "ASP.NET Core Fundamentals", speaker: "Serkan", dates: "22 Ekim 2026 · Perşembe", start: "2026-10-22", end: "2026-10-22", format: "Teori + hands-on",
    summary: "S1'de çalışan fakat bütün sorumlulukları controller'da toplanan API'yi devralıyoruz. İş kurallarını service'e, dış sözleşmeyi DTO'lara taşıyıp DI, validation, middleware ve konfigürasyon katmanlarını ekliyoruz.",
    baseline: "S1 sonunda ProductsController veriyi bellekte tutuyor ve CRUD iş mantığını doğrudan kendisi yürütüyor; ortak hata, validation ve ayar yönetimi henüz yok.",
    additions: ["Product DTO'ları ve giriş doğrulama kuralları", "IProductService ve ProductService katmanı", "Dependency Injection ve yaşam süresi kayıtları", "Merkezi exception/request logging middleware'leri", "Options Pattern ile strongly typed ayarlar"],
    topics: [
      ["Controller'ı incelt", "HTTP koordinasyonu controller'da kalsın"],
      ["Service katmanı ekle", "İş kurallarını ayrı ve test edilebilir tut"],
      ["DTO ile sınır çiz", "İç model ile API sözleşmesini ayır"],
      ["Ortak davranışları merkezileştir", "DI, middleware, validation ve options"]
    ],
    outcomes: ["ASP.NET Core request yaşam döngüsünü açıklayabilmek", "DI yaşam süresini ihtiyaca göre seçebilmek", "Controller, service ve DTO sorumluluklarını ayırabilmek", "Merkezi middleware ve Options Pattern kullanabilmek", "Validation ve Swagger ile anlaşılır bir API sözleşmesi sunabilmek"]
  },
  {
    id: 3, title: "ASP.NET Core Web API Basics", speaker: "Burak ve Metin (teori) · Burak (hands-on)", dates: "27 Ekim 2026 · teori · 3 Kasım 2026 · hands-on", start: "2026-10-27", end: "2026-11-03", format: "Teori + hands-on",
    summary: "S2'de katmanlara ayrılan API artık bakımı kolay, fakat liste endpoint'i büyüyen veri için sınırsız ve dış sözleşme yeterince ayrıntılı değil. Bu session'da query modeli, filtreleme, sıralama, sayfalama, route constraint ve standart hata sözleşmesi ekliyoruz.",
    baseline: "S2 sonunda controller service'e delege ediyor, DTO ve middleware kullanıyor; ancak GET listesi tüm veriyi döndürüyor, route girdileri sınırlanmıyor ve hata/Swagger sözleşmesi eksik kalıyor.",
    additions: ["ProductQueryParameters ile tek query sözleşmesi", "PagedResult<T> ile veri ve sayfalama metadatası", "Filtrele → sırala → say → sayfala akışı", "Route constraint ve açık model binding kaynakları", "Problem Details, XML comments ve response tanımları"],
    topics: [
      ["Liste sözleşmesini büyüt", "Arama, sıralama ve sayfa parametreleri"],
      ["Yanıtı zenginleştir", "Items yanında gezinme metadatası"],
      ["Geçersiz isteği erken durdur", "Binding kaynakları ve route constraint"],
      ["Sözleşmeyi görünür yap", "Problem Details, XML docs ve Swagger"]
    ],
    outcomes: ["Model binding kaynağını bilinçli seçebilmek", "Güvenli ve metadatalı sayfalama tasarlayabilmek", "Route constraint'leriyle geçersiz istekleri erken reddedebilmek", "Standart hata sözleşmesi sunabilmek", "Swagger'da endpoint ve yanıtları eksiksiz belgeleyebilmek"]
  },
  {
    id: 4, title: "Data Management ve EF Core", speaker: "Cem", dates: "5 Kasım 2026 · teori · 10 Kasım 2026 · hands-on", start: "2026-11-05", end: "2026-11-10", format: "Teori + hands-on",
    summary: "S3'ün profesyonelleşen API sözleşmesi hâlâ bellekteki listeye bağlı ve restart sonrası veriyi kaybediyor. Bu session'da SQLite, EF Core, entity ilişkileri, migration ve repository katmanını ekleyerek veriyi kalıcı hale getiriyoruz.",
    baseline: "S3 sonunda filtrelenen ve sayfalanan Product verisi ProductService içindeki in-memory koleksiyondan geliyor; kalıcı şema, ilişki ve veri erişim abstraction'ı bulunmuyor.",
    additions: ["EF Core SQLite ve migration araçları", "Product/Category entity'leri ve ilişkileri", "BootcampDbContext, Fluent API ve seed data", "Generic ve Product repository katmanları", "Async veri erişimi, LINQ ve soft delete"],
    topics: [
      ["Bellekten veritabanına", "SQLite ve EF Core altyapısı"],
      ["Kalıcı modeli kur", "Entity, ilişki ve DbContext"],
      ["Şemayı versiyonla", "Code First, Fluent API ve migrations"],
      ["Erişimi soyutla", "Repository, LINQ ve soft delete"]
    ],
    outcomes: ["EF Core entity ve ilişki modelleyebilmek", "DbContext ve migration yaşam döngüsünü yönetebilmek", "LINQ ile verimli sorgular oluşturabilmek", "Repository Pattern ile veri erişimini soyutlayabilmek", "Soft delete ve global query filter uygulayabilmek"]
  },
  {
    id: 5, title: "ASP.NET Core Security ve Identity", speaker: "Mustafa", dates: "12 Kasım 2026 · teori · 17 Kasım 2026 · hands-on", start: "2026-11-12", end: "2026-11-17", format: "Teori + hands-on",
    summary: "S4 sonunda ürün verisi kalıcı ama API'yi kimin kullandığı bilinmiyor ve tüm kaynaklar herkese açık. Bu session'da kullanıcı modeli, BCrypt parola saklama, register/login servisleri ve JWT tabanlı kimlik doğrulama ekliyoruz.",
    baseline: "S4 sonunda EF Core ve repository üzerinden kalıcı CRUD çalışıyor; User tablosu, giriş akışı, token üretimi ve endpoint yetkilendirmesi henüz bulunmuyor.",
    additions: ["UserEntity, roller ve başlangıç admin kullanıcısı", "Register/Login DTO'ları ve AuthService", "BCrypt ile salt'lı parola hashleme", "JwtSettings ve claim üreten JwtService", "Authentication/authorization pipeline'ı ve Bearer testi"],
    topics: [
      ["Kullanıcıyı kalıcılaştır", "User entity, roller ve benzersizlik"],
      ["Parolayı güvenli sakla", "BCrypt hash ve doğrulama"],
      ["Kimliği token'a taşı", "JWT, claim ve imza"],
      ["Pipeline'ı koru", "Bearer doğrulama ve role-based erişim"]
    ],
    outcomes: ["Authentication ve authorization farkını açıklayabilmek", "JWT üretip güvenli biçimde doğrulayabilmek", "Şifreleri BCrypt ile hashleyebilmek", "Rol ve claim tabanlı erişim kontrolü kurabilmek", "Güvenlik ayarlarını konfigürasyon üzerinden yönetebilmek"]
  },
  {
    id: 6, title: "Transactions ve Error Handling", speaker: "Gözde", dates: "19 Kasım 2026 · teori · 24 Kasım 2026 · hands-on", start: "2026-11-19", end: "2026-11-24", format: "Teori + hands-on",
    summary: "S5 kullanıcı kimliğini güvenceye aldı; ancak birden fazla kaydı değiştiren iş akışlarında yarım kalmış veri riski sürüyor. Bu session'da banka transferi örneği üzerinden transaction, Unit of Work ve domain exception katmanlarını ekliyoruz.",
    baseline: "S5 sonunda kullanıcı ve ürün işlemleri tekil EF Core çağrılarıyla çalışıyor; birden çok değişikliğin hep birlikte commit/rollback edilmesini yöneten iş birimi ve anlamlı domain hataları yok.",
    additions: ["Banka hesabı ve transfer veri modeli", "Transaction sınırı yöneten Unit of Work", "Atomik debit/credit yapan BankService", "İş kuralını ifade eden custom exception'lar", "Exception tiplerini HTTP kodlarına çeviren merkezi handler"],
    topics: [
      ["Çok adımlı işi atomik yap", "Transferde ya hep ya hiç"],
      ["Transaction sınırını soyutla", "Unit of Work ile commit/rollback"],
      ["İş hatalarını adlandır", "Not found, conflict ve yetersiz bakiye"],
      ["HTTP hatasını merkezileştir", "Domain exception → güvenli response"]
    ],
    outcomes: ["ACID ve transaction sınırlarını açıklayabilmek", "EF Core transaction'larında commit ve rollback yönetebilmek", "Unit of Work Pattern uygulayabilmek", "Domain hatalarını anlamlı exception tipleriyle ifade edebilmek", "Merkezi ve güvenli API hata yanıtları üretebilmek"]
  },
  {
    id: 7, title: "Asynchronous Programming", speaker: "Serkan", dates: "26 Kasım 2026 · teori · 1 Aralık 2026 · hands-on", start: "2026-11-26", end: "2026-12-01", format: "Teori + hands-on",
    summary: "S6'da transaction güvenliği sağlandı fakat servislerin bir bölümü HTTP'ye açılmadı ve I/O zincirinin tamamı asenkron değil. Bu session'da Auth/Bank controller'larını, async demo akışlarını, Task kompozisyonunu ve iptal desteğini ekliyoruz.",
    baseline: "S6 sonunda AuthService ve BankService iş kurallarını içeriyor; bunların tam HTTP yüzeyi ve controller → service → repository boyunca tutarlı async/cancellation akışı eksik.",
    additions: ["AuthController ve BankController HTTP endpoint'leri", "AsyncDemoService ve AsyncDemoController", "WhenAll, WhenAny ve kontrollü paralellik örnekleri", "CancellationToken ile iptal edilebilir işler", "Products akışının uçtan uca async hale getirilmesi"],
    topics: [
      ["I/O zincirini async yap", "Controller'dan repository'ye await"],
      ["Servisleri HTTP'ye aç", "Auth ve Bank controller'ları"],
      ["Bağımsız işleri birleştir", "WhenAll, WhenAny ve paralellik"],
      ["Gereksiz işi durdur", "CancellationToken ve hata yayılımı"]
    ],
    outcomes: ["Senkron ve asenkron çalışma farkını açıklayabilmek", "async, await, Task ve Task<T> kullanabilmek", "Bağımsız işleri WhenAll ile paralel yürütebilmek", "İşlemleri CancellationToken ile iptal edebilmek", "API katmanlarını uçtan uca asenkron tasarlayabilmek"]
  },
  {
    id: 8, title: "Unit ve Integration Testing", speaker: "Mennan", dates: "3 Aralık 2026 · Perşembe", start: "2026-12-03", end: "2026-12-03", format: "Teori + hands-on + kısa AI oturumu",
    summary: "S7 sonunda özellikler uçtan uca çalışıyor, ancak davranışların bozulmadığını otomatik kanıtlayan bir güvenlik ağı yok. Bu session'da ayrı test projesi, service/controller unit testleri ve gerçek pipeline integration testleri ekliyoruz.",
    baseline: "S7 sonunda Product, Auth, Bank ve async endpoint'leri elle test edilebiliyor; refactoring sonrası regresyonları otomatik yakalayacak test projesi ve fixture bulunmuyor.",
    additions: ["ECommerceApi.Tests xUnit projesi", "Moq ile izole service ve controller testleri", "FluentAssertions ile okunabilir doğrulamalar", "WebApplicationFactory tabanlı gerçek HTTP testleri", "Testte SQLite yerine InMemory EF Core ortamı"],
    topics: [
      ["Test projesini ekle", "Üretim kodundan ayrı xUnit assembly"],
      ["Servisleri izole doğrula", "Repository mock'ları ve iş kuralları"],
      ["Controller sözleşmesini test et", "ActionResult ve status code'lar"],
      ["Gerçek pipeline'ı çalıştır", "WebApplicationFactory ve InMemory DB"]
    ],
    outcomes: ["Unit ve integration test kapsamlarını ayırabilmek", "xUnit ile okunabilir testler yazabilmek", "Moq kullanarak bağımlılıkları izole edebilmek", "WebApplicationFactory ile API pipeline'ını test edebilmek", "AI tarafından önerilen testleri eleştirel biçimde doğrulayabilmek"]
  },
  {
    id: 9, title: "Monitoring & Logging", speaker: "Hakan", dates: "8 Aralık 2026 · Salı", start: "2026-12-08", end: "2026-12-08", format: "Teori + hands-on",
    summary: "S8 davranışı testlerle güvenceye aldı; fakat çalışan uygulamanın üretimde ne yaptığını dışarıdan göremiyoruz. Bu session'da structured log, correlation ID, metric, trace, health ve diagnostics yüzeylerini ekliyoruz.",
    baseline: "S8 sonunda kod değişiklikleri testlerle doğrulanıyor; canlı request'leri ilişkilendiren kimlik, sorgulanabilir log, Prometheus metric'i veya trace/diagnostics görünürlüğü yok.",
    additions: ["Serilog structured logging ve ortam ayarları", "Her isteği izleyen CorrelationIdMiddleware", "OpenTelemetry metric ve trace instrumentation'ı", "AppTelemetry custom counter/histogram/span'ları", "Prometheus /metrics, health ve diagnostics endpoint'leri"],
    topics: [
      ["Logu yapılandır", "Serilog alanları, sink ve enrichment"],
      ["Request'leri ilişkilendir", "Correlation ID ile uçtan uca takip"],
      ["Davranışı ölç", "OpenTelemetry ve Prometheus metric'leri"],
      ["Teşhis yüzeyi ekle", "Trace, health ve diagnostics endpoint'leri"]
    ],
    outcomes: ["Log, metric ve trace arasındaki farkı açıklayabilmek", "Serilog ile sorgulanabilir structured log üretebilmek", "OpenTelemetry ile metric ve trace toplayabilmek", "Correlation ID ile tek isteği uçtan uca izleyebilmek", "Health ve diagnostics endpoint'leri tasarlayabilmek"]
  },
  {
    id: 10, title: "Application Deployment", speaker: "Mennan ve Burak", dates: "10 Aralık 2026 · teori · 15 Aralık 2026 · hands-on", start: "2026-12-10", end: "2026-12-15", format: "Teori + hands-on",
    summary: "S9 uygulamayı gözlemlenebilir hale getirdi; şimdi aynı uygulamayı geliştirici makinesinden bağımsız, tekrar üretilebilir biçimde çalıştırmamız gerekiyor. Bu session'da Docker image, Compose ortamı, Seq ve CI kalite kapılarını ekliyoruz.",
    baseline: "S9 sonunda API log, metric ve trace üretiyor ancak yerel SDK ve makine ayarlarına bağlı çalışıyor; paketlenmiş image, çoklu servis ortamı ve otomatik build/test pipeline'ı yok.",
    additions: ["Multi-stage Dockerfile ve sade .dockerignore", "API + Seq servislerini yöneten Docker Compose", "Environment variable ile production konfigürasyonu", "DB, log ve Seq için kalıcı volume'ler", "Restore → build → test → image CI pipeline'ı"],
    topics: [
      ["Uygulamayı paketle", "Multi-stage Docker image"],
      ["Servisleri birlikte çalıştır", "API, Seq, network ve volumes"],
      ["Ortamı dışarıdan yapılandır", "Environment variable ve secrets"],
      ["Teslimatı otomatikleştir", "CI build/test kapıları ve image üretimi"]
    ],
    outcomes: ["Deployment ortamlarını ve hosting seçeneklerini ayırabilmek", "Multi-stage Docker image oluşturabilmek", "Compose ile çoklu servis çalıştırabilmek", "CI/CD pipeline'ında build ve test kapıları kurabilmek", "Yayın ve ölçeklendirme stratejilerini ihtiyaca göre seçebilmek"]
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
document.querySelector("#current-title").textContent = `Session ${focus.id} · ${focus.title}`;
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
  button.setAttribute("aria-label", `Session ${session.id}: ${session.title} detayını aç`);
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
  document.querySelector("#dialog-number").textContent = `Session ${String(session.id).padStart(2, "0")}`;
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
    if (!window.confirm("Bu session için yaptığın tüm kodlama adımı değişiklikleri silinsin mi?")) return;
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