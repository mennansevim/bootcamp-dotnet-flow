const sessions = [
  {
    id: 1, title: ".NET ve Web API'ye Giriş", speaker: "Burak", dates: "20 Ekim 2026 · Salı", start: "2026-10-20", end: "2026-10-20", format: "Teori + kısa hands-on",
    summary: ".NET platformunu tanıyıp sıfırdan çalışan ilk ASP.NET Core Web API projesini oluşturuyoruz.",
    topics: [
      [".NET platformu", "Modern .NET, CLR, CTS ve çok platformlu çalışma"],
      ["Web API ve REST", "HTTP metotları, kaynaklar ve stateless iletişim"],
      ["HTTP sözleşmesi", "Durum kodları, JSON ve doğru yanıt tasarımı"],
      ["İlk API", "Controller, model, routing ve Swagger"]
    ],
    outcome: "Çalışan bir API, Hello endpoint'leri ve bellekte CRUD yapan ProductsController."
  },
  {
    id: 2, title: "ASP.NET Core Fundamentals", speaker: "Serkan", dates: "22 Ekim 2026 · Perşembe", start: "2026-10-22", end: "2026-10-22", format: "Teori + hands-on",
    summary: "Basit API'yi katmanlı, test edilebilir ve yönetilebilir bir ASP.NET Core uygulamasına dönüştürüyoruz.",
    topics: [
      ["Request lifecycle", "Kestrel, middleware, controller ve response akışı"],
      ["Dependency Injection", "Scoped, transient ve singleton yaşam süreleri"],
      ["Katmanlı mimari", "Controller, service ve DTO sorumlulukları"],
      ["Uygulama altyapısı", "Validation, Options Pattern, logging ve Swagger"]
    ],
    outcome: "Service ve DTO katmanları, merkezi middleware'ler ve strongly typed konfigürasyon."
  },
  {
    id: 3, title: "ASP.NET Core Web API Basics", speaker: "Burak · Metin", dates: "27 Ekim & 3 Kasım 2026", start: "2026-10-27", end: "2026-11-03", format: "Teori + hands-on",
    summary: "API'nin dış sözleşmesini daha güvenli, ölçeklenebilir ve anlaşılır hale getiriyoruz.",
    topics: [
      ["Model binding", "Route, query, body ve header kaynakları"],
      ["Routing", "Attribute route, named route ve constraint'ler"],
      ["Listeleme", "Filtreleme, sıralama ve metadatalı sayfalama"],
      ["API standardı", "Problem Details, XML comments ve Swagger"]
    ],
    outcome: "Sayfalanabilir Products API, route doğrulama ve standart Problem Details yanıtları."
  },
  {
    id: 4, title: "Data Management", speaker: "Cem", dates: "5 & 10 Kasım 2026", start: "2026-11-05", end: "2026-11-10", format: "Teori + hands-on",
    summary: "Bellekteki veriyi EF Core ve SQLite ile kalıcı, sorgulanabilir bir veri katmanına taşıyoruz.",
    topics: [
      ["EF Core", "ORM, entity, DbContext ve DbSet"],
      ["Code First", "Fluent API, migrations ve seed data"],
      ["Veri sorgulama", "LINQ, loading stratejileri ve N+1"],
      ["Repository", "Generic CRUD, özel sorgular ve soft delete"]
    ],
    outcome: "SQLite veritabanı, repository katmanı, migration ve kalıcı Product CRUD akışı."
  },
  {
    id: 5, title: "Security & Identity", speaker: "Mustafa", dates: "12 & 17 Kasım 2026", start: "2026-11-12", end: "2026-11-17", format: "Teori + hands-on",
    summary: "Kullanıcı kimliğini güvenli biçimde doğrulayan ve yetkiyi role göre yöneten altyapıyı kuruyoruz.",
    topics: [
      ["Kimlik ve yetki", "Authentication ile authorization ayrımı"],
      ["JWT", "Claim, signature, issuer, audience ve expiration"],
      ["Şifre güvenliği", "BCrypt, hashing ve salting"],
      ["API koruması", "Bearer authentication ve role-based authorization"]
    ],
    outcome: "Güvenli kullanıcı kaydı/girişi, JWT üretimi ve korumalı endpoint altyapısı."
  },
  {
    id: 6, title: "Transactions & Error Handling", speaker: "Gözde", dates: "19 & 24 Kasım 2026", start: "2026-11-19", end: "2026-11-24", format: "Teori + hands-on",
    summary: "Çok adımlı işlerde veri bütünlüğünü ve tüm API boyunca tutarlı hata davranışını güvence altına alıyoruz.",
    topics: [
      ["Transactions", "Commit, rollback ve all-or-nothing"],
      ["ACID", "Tutarlılık, izolasyon ve kalıcılık"],
      ["Unit of Work", "Repository işlemlerini tek sınırda toplama"],
      ["Error handling", "Custom exception ve merkezi HTTP eşlemesi"]
    ],
    outcome: "Transaction güvenli banka transferi, Unit of Work ve global exception middleware."
  },
  {
    id: 7, title: "Asynchronous Programming", speaker: "Serkan", dates: "26 Kasım & 1 Aralık 2026", start: "2026-11-26", end: "2026-12-01", format: "Teori + hands-on",
    summary: "I/O beklemelerini bloklamadan yöneten ve yoğun trafikte ölçeklenebilen API akışına geçiyoruz.",
    topics: [
      ["Async model", "Senkron/asenkron farkı, Task ve Thread"],
      ["async / await", "Task dönüşleri ve async all the way"],
      ["Task composition", "WhenAll, WhenAny ve paralel işlemler"],
      ["İptal", "CancellationToken ve async hata davranışı"]
    ],
    outcome: "Async controller ve servisler, paralel demo akışları, Auth ve Bank endpoint'leri."
  },
  {
    id: 8, title: "Unit & Integration Testing", speaker: "Mennan", dates: "3 Aralık 2026 · Perşembe", start: "2026-12-03", end: "2026-12-03", format: "Teori + hands-on + AI",
    summary: "Kodun davranışını hızlı unit testler ve gerçek pipeline integration testleriyle güvenceye alıyoruz.",
    topics: [
      ["Test stratejisi", "Unit ve integration test sınırları"],
      ["xUnit", "Fact, Theory ve Arrange-Act-Assert"],
      ["Mocking", "Moq ile bağımlılık izolasyonu"],
      ["API testleri", "WebApplicationFactory ve InMemory DB"]
    ],
    outcome: "Service/controller unit testleri, HTTP integration testleri ve çalışan test projesi."
  },
  {
    id: 9, title: "Monitoring & Logging", speaker: "Hakan", dates: "8 Aralık 2026 · Salı", start: "2026-12-08", end: "2026-12-08", format: "Teori + hands-on",
    summary: "Üretim davranışını log, metric ve trace üzerinden görünür ve teşhis edilebilir hale getiriyoruz.",
    topics: [
      ["Observability", "Logs, metrics ve traces"],
      ["Serilog", "Structured logging, sink ve enrichment"],
      ["OpenTelemetry", "Instrumentation ve Prometheus metrics"],
      ["İstek takibi", "Correlation ID, health ve diagnostics"]
    ],
    outcome: "Structured loglar, correlation middleware, `/metrics` ve diagnostics endpoint'i."
  },
  {
    id: 10, title: "Application Deployment", speaker: "Mennan · Burak", dates: "10 & 15 Aralık 2026", start: "2026-12-10", end: "2026-12-15", format: "Teori + hands-on",
    summary: "API'yi container olarak paketliyor ve otomatik kalite kapılarıyla yayına hazır hale getiriyoruz.",
    topics: [
      ["Hosting", "Kestrel, reverse proxy ve ortamlar"],
      ["Docker", "Image, container ve multi-stage build"],
      ["Compose", "API, Seq, network ve kalıcı volume"],
      ["CI/CD", "Restore, build, test ve deployment stratejileri"]
    ],
    outcome: "Docker image, API + Seq compose ortamı ve otomatik build/test pipeline'ı."
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
const codeStorageKey = (sessionId, codeIndex) => `bootcamp-code-s${sessionId}-${codeIndex}`;
const readStoredCode = key => {
  try { return localStorage.getItem(key); }
  catch { return null; }
};
const storeCode = (key, code) => {
  try { localStorage.setItem(key, code); }
  catch { return false; }
  return true;
};
const escapeHtml = value => value.replace(/[&<>"]/g, character => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
})[character]);

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
  document.querySelector("#dialog-code").innerHTML = session.code.map((step, index) => {
    const savedCode = readStoredCode(codeStorageKey(session.id, index));
    return `
    <details class="code-step">
      <summary>
        <span class="code-step-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="code-step-copy">
          <strong>${step.title}</strong>
          <small>${step.file}</small>
          <span>${step.why}</span>
        </span>
        <span class="code-toggle" aria-hidden="true">+</span>
      </summary>
      <div class="code-panel">
        <div class="code-toolbar">
          <span class="code-language">${step.language}</span>
          <span class="code-actions"><button class="code-button edit-button" type="button" data-code-index="${index}" aria-pressed="false" aria-live="polite">Düzenle</button><button class="code-button copy-button" type="button" data-code-index="${index}" aria-live="polite">Kopyala</button></span>
        </div>
        <pre><code class="language-${step.language}">${escapeHtml(savedCode ?? step.code)}</code></pre>
      </div>
    </details>`;
  }).join("");
  document.querySelector("#dialog-outcome").textContent = session.outcome;
  document.querySelectorAll(".edit-button").forEach(button => {
    button.addEventListener("click", () => {
      const codeIndex = Number(button.dataset.codeIndex);
      const code = button.closest(".code-panel").querySelector("code");
      const isEditing = button.getAttribute("aria-pressed") === "true";
      if (isEditing) {
        code.removeAttribute("contenteditable");
        code.removeAttribute("role");
        code.removeAttribute("aria-label");
        code.removeAttribute("aria-multiline");
        storeCode(codeStorageKey(session.id, codeIndex), code.textContent);
        button.setAttribute("aria-pressed", "false");
        button.textContent = "Kaydedildi";
        window.setTimeout(() => { button.textContent = "Düzenle"; }, 1200);
        return;
      }
      code.setAttribute("contenteditable", "plaintext-only");
      code.setAttribute("role", "textbox");
      code.setAttribute("aria-label", `${session.code[codeIndex].title} kodunu düzenle`);
      code.setAttribute("aria-multiline", "true");
      code.oninput = () => storeCode(codeStorageKey(session.id, codeIndex), code.textContent);
      code.focus();
      button.setAttribute("aria-pressed", "true");
      button.textContent = "Kaydet";
    });
  });
  document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", async () => {
      const code = button.closest(".code-panel").querySelector("code").textContent;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Kopyalandı";
      } catch {
        button.textContent = "Kopyalanamadı";
      }
      window.setTimeout(() => { button.textContent = "Kopyala"; }, 1400);
    });
  });
  dialog.showModal();
};

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});