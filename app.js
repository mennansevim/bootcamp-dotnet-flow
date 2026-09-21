const sessions = [
  {
    id: 1, title: ".NET ve Web API'ye Giriş", speaker: "Burak", dates: "20 Ekim 2026 · Salı", start: "2026-10-20", end: "2026-10-20", format: "Teori + kısa hands-on",
    summary: ".NET platformunu ve modern Web API yaklaşımını tanımak; sıfırdan çalışan, HTTP üzerinden JSON sunan ilk ASP.NET Core API'sini oluşturmak.",
    topics: [
      [".NET Platformu", "Açık kaynak, çok platformlu yapı ve kullanım alanları"],
      ["Modern .NET Ekosistemi", ".NET Framework, modern .NET ve LTS sürümler"],
      ["CLR ve CTS", "JIT, bellek yönetimi ve ortak tip sistemi"],
      ["Web API ve REST", "HTTP iletişimi, stateless yaklaşım ve CRUD"]
    ],
    outcomes: [".NET ekosistemini ve çalışma modelini açıklayabilmek", "Controller tabanlı bir ASP.NET Core Web API oluşturabilmek", "REST endpoint'lerini doğru HTTP metodu ve durum koduyla tasarlayabilmek", "Route, query string, model ve JSON yanıtlarını kullanabilmek", "Swagger üzerinden API'yi çalıştırıp test edebilmek"]
  },
  {
    id: 2, title: "ASP.NET Core Fundamentals", speaker: "Serkan", dates: "22 Ekim 2026 · Perşembe", start: "2026-10-22", end: "2026-10-22", format: "Teori + hands-on",
    summary: "İlk session'da oluşturulan API'yi Dependency Injection, service ve DTO katmanları, middleware ve yönetilebilir konfigürasyon kullanarak bakımı kolay bir yapıya dönüştürmek.",
    topics: [
      ["ASP.NET Core Mimarisi", "Kestrel, Program.cs ve request-response akışı"],
      ["Dependency Injection", "Scoped, transient ve singleton yaşam süreleri"],
      ["Katmanlı Mimari", "Controller, service ve interface sorumlulukları"],
      ["DTO ve Validation", "API sözleşmesi ve doğrulama kuralları"]
    ],
    outcomes: ["ASP.NET Core request yaşam döngüsünü açıklayabilmek", "DI yaşam süresini ihtiyaca göre seçebilmek", "Controller, service ve DTO sorumluluklarını ayırabilmek", "Merkezi middleware ve Options Pattern kullanabilmek", "Validation ve Swagger ile anlaşılır bir API sözleşmesi sunabilmek"]
  },
  {
    id: 3, title: "ASP.NET Core Web API Basics", speaker: "Burak ve Metin (teori) · Burak (hands-on)", dates: "27 Ekim 2026 · teori · 3 Kasım 2026 · hands-on", start: "2026-10-27", end: "2026-11-03", format: "Teori + hands-on",
    summary: "API'nin dış sözleşmesini routing, model binding, sayfalama, filtreleme, standart hata yanıtları ve zengin Swagger dokümantasyonuyla profesyonelleştirmek.",
    topics: [
      ["API Sözleşmesi", "Kaynak odaklı ve tutarlı endpoint tasarımı"],
      ["Model Binding Kaynakları", "Route, query, body ve header kaynakları"],
      ["Routing Kuralları", "Attribute route, named route ve constraint'ler"],
      ["Filtreleme, Sıralama ve Sayfalama", "Güvenli, metadatalı listeleme"]
    ],
    outcomes: ["Model binding kaynağını bilinçli seçebilmek", "Güvenli ve metadatalı sayfalama tasarlayabilmek", "Route constraint'leriyle geçersiz istekleri erken reddedebilmek", "Standart hata sözleşmesi sunabilmek", "Swagger'da endpoint ve yanıtları eksiksiz belgeleyebilmek"]
  },
  {
    id: 4, title: "Data Management ve EF Core", speaker: "Cem", dates: "5 Kasım 2026 · teori · 10 Kasım 2026 · hands-on", start: "2026-11-05", end: "2026-11-10", format: "Teori + hands-on",
    summary: "Bellekte tutulan veriden kalıcı veritabanına geçmek; EF Core, Code First, LINQ ve Repository Pattern ile sürdürülebilir bir veri erişim katmanı kurmak.",
    topics: [
      ["Veri Erişim Yaklaşımları", "ADO.NET, EF Core ve Dapper"],
      ["ORM ve Entity Tasarımı", "Entity ilişkileri ve navigation property'leri"],
      ["DbContext ve DbSet", "Change tracking ve SaveChanges akışı"],
      ["Code First ve Migrations", "Şema versiyonlama, Fluent API ve seed data"]
    ],
    outcomes: ["EF Core entity ve ilişki modelleyebilmek", "DbContext ve migration yaşam döngüsünü yönetebilmek", "LINQ ile verimli sorgular oluşturabilmek", "Repository Pattern ile veri erişimini soyutlayabilmek", "Soft delete ve global query filter uygulayabilmek"]
  },
  {
    id: 5, title: "ASP.NET Core Security ve Identity", speaker: "Mustafa", dates: "12 Kasım 2026 · teori · 17 Kasım 2026 · hands-on", start: "2026-11-12", end: "2026-11-17", format: "Teori + hands-on",
    summary: "API'ye güvenli kullanıcı kaydı, giriş ve yetkilendirme altyapısı kazandırmak; JWT, claim, rol ve güvenli şifre saklama prensiplerini uygulamak.",
    topics: [
      ["API Güvenliğinin Temelleri", "Authentication ve authorization ayrımı"],
      ["JWT Yapısı", "Header, payload, signature ve claim'ler"],
      ["Token Doğrulama", "İmza, süre, issuer ve audience kontrolü"],
      ["Kullanıcı Yönetimi", "Kayıt, giriş, roller ve benzersizlik"]
    ],
    outcomes: ["Authentication ve authorization farkını açıklayabilmek", "JWT üretip güvenli biçimde doğrulayabilmek", "Şifreleri BCrypt ile hashleyebilmek", "Rol ve claim tabanlı erişim kontrolü kurabilmek", "Güvenlik ayarlarını konfigürasyon üzerinden yönetebilmek"]
  },
  {
    id: 6, title: "Transactions ve Error Handling", speaker: "Gözde", dates: "19 Kasım 2026 · teori · 24 Kasım 2026 · hands-on", start: "2026-11-19", end: "2026-11-24", format: "Teori + hands-on",
    summary: "Çok adımlı işlemlerde veri bütünlüğünü korumak; transaction, Unit of Work ve merkezi exception handling ile güvenilir bir API akışı oluşturmak.",
    topics: [
      ["Transaction Temelleri", "Commit, rollback ve all-or-nothing"],
      ["ACID Prensipleri", "Atomicity, consistency, isolation ve durability"],
      ["Isolation Seviyeleri", "Tutarlılık ve performans dengesi"],
      ["Unit of Work Pattern", "Repository işlemlerini tek sınırda toplama"]
    ],
    outcomes: ["ACID ve transaction sınırlarını açıklayabilmek", "EF Core transaction'larında commit ve rollback yönetebilmek", "Unit of Work Pattern uygulayabilmek", "Domain hatalarını anlamlı exception tipleriyle ifade edebilmek", "Merkezi ve güvenli API hata yanıtları üretebilmek"]
  },
  {
    id: 7, title: "Asynchronous Programming", speaker: "Serkan", dates: "26 Kasım 2026 · teori · 1 Aralık 2026 · hands-on", start: "2026-11-26", end: "2026-12-01", format: "Teori + hands-on",
    summary: "async/await, Task kompozisyonu ve iptal mekanizmalarını öğrenmek; API'nin I/O beklerken thread tüketmeyen, uçtan uca asenkron bir yapıda çalışmasını sağlamak.",
    topics: [
      ["Senkron ve Asenkron Çalışma", "Bloklayan ve bloklamayan bekleme"],
      ["Task ve Thread", "İş soyutlaması ve Thread Pool"],
      ["async ve await", "Task dönüşleri ve async all the way"],
      ["Kaçınılması Gereken Hatalar", ".Result, .Wait() ve async void"]
    ],
    outcomes: ["Senkron ve asenkron çalışma farkını açıklayabilmek", "async, await, Task ve Task<T> kullanabilmek", "Bağımsız işleri WhenAll ile paralel yürütebilmek", "İşlemleri CancellationToken ile iptal edebilmek", "API katmanlarını uçtan uca asenkron tasarlayabilmek"]
  },
  {
    id: 8, title: "Unit ve Integration Testing", speaker: "Mennan", dates: "3 Aralık 2026 · Perşembe", start: "2026-12-03", end: "2026-12-03", format: "Teori + hands-on + kısa AI oturumu",
    summary: "Unit ve integration testlerle güvenli değişiklik yapabilmek; xUnit, Moq ve WebApplicationFactory kullanarak servis, controller ve gerçek HTTP pipeline davranışlarını doğrulamak.",
    topics: [
      ["Neden Test Yazarız?", "Erken hata yakalama ve hızlı geri bildirim"],
      ["Test Seviyeleri", "Unit ve integration test sınırları"],
      ["xUnit Temelleri", "Fact, Theory ve Arrange-Act-Assert"],
      ["Mocking", "Moq ile bağımlılık izolasyonu"],
    ],
    outcomes: ["Unit ve integration test kapsamlarını ayırabilmek", "xUnit ile okunabilir testler yazabilmek", "Moq kullanarak bağımlılıkları izole edebilmek", "WebApplicationFactory ile API pipeline'ını test edebilmek", "AI tarafından önerilen testleri eleştirel biçimde doğrulayabilmek"]
  },
  {
    id: 9, title: "Monitoring & Logging", speaker: "Hakan", dates: "8 Aralık 2026 · Salı", start: "2026-12-08", end: "2026-12-08", format: "Teori + hands-on",
    summary: "Üretimde çalışan API'nin davranışını görünür kılmak; log, metric ve trace verilerini bir araya getirerek sorunları hızlı ve bağlamıyla teşhis edebilmek.",
    topics: [
      ["Observability İhtiyacı", "Üretim sorunlarını ölçmek ve teşhis etmek"],
      ["Observability'nin Üç Ayağı", "Logs, metrics ve traces"],
      ["Structured Logging", "Serilog, sink ve enrichment"],
      ["Log Seviyeleri", "Trace'ten Fatal'a olay önemi"]
    ],
    outcomes: ["Log, metric ve trace arasındaki farkı açıklayabilmek", "Serilog ile sorgulanabilir structured log üretebilmek", "OpenTelemetry ile metric ve trace toplayabilmek", "Correlation ID ile tek isteği uçtan uca izleyebilmek", "Health ve diagnostics endpoint'leri tasarlayabilmek"]
  },
  {
    id: 10, title: "Application Deployment", speaker: "Mennan ve Burak", dates: "10 Aralık 2026 · teori · 15 Aralık 2026 · hands-on", start: "2026-12-10", end: "2026-12-15", format: "Teori + hands-on",
    summary: "Geliştirilen API'yi tekrarlanabilir ve gözlemlenebilir biçimde çalıştırmak; Docker, Compose ve CI/CD ile geliştirmeden yayına uzanan teslim sürecini tamamlamak.",
    topics: [
      ["Deployment Ortamları", "Development, staging ve production"],
      ["Web Sunucuları ve Hosting", "Kestrel, reverse proxy ve IIS"],
      ["Performans ve Güvenilirlik", "Health check, yük dengeleme ve scaling"],
      ["Docker", "Image, container ve multi-stage build"]
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