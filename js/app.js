/* ═══════════════════════════════════════════════
   THE LIVING WORD — Application Logic
   ═══════════════════════════════════════════════ */

(function () {
  "use strict";

  // ─── STATE ───
  let currentView = "books";
  let currentBook = null;

  // ─── DOM REFS ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ─── AUTH CHECK ───
  const loginScreen = $("#loginScreen");
  const loginForm = $("#loginForm");
  const loginPassword = $("#loginPassword");
  const loginError = $("#loginError");

  function isLoggedIn() {
    return document.cookie.split(";").some((c) => c.trim().startsWith("logged_in="));
  }

  if (isLoggedIn()) {
    loginScreen.classList.add("hidden");
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.classList.add("hidden");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword.value }),
      });

      if (res.ok) {
        loginScreen.classList.add("leaving");
        setTimeout(() => loginScreen.classList.add("hidden"), 600);
      } else {
        loginError.classList.remove("hidden");
        loginPassword.value = "";
        loginPassword.focus();
      }
    } catch {
      loginError.textContent = "Connection error. Please try again.";
      loginError.classList.remove("hidden");
    }
  });

  const landing = $("#landing");
  const enterBtn = $("#enterBtn");
  const app = $("#app");
  const searchInput = $("#searchInput");

  // Views
  const views = {
    books: $("#booksView"),
    timeline: $("#timelineView"),

    scholar: $("#scholarView"),
  };

  // Detail panel
  const bookDetail = $("#bookDetail");
  const detailOverlay = $("#detailOverlay");
  const detailClose = $("#detailClose");

  // Chat
  const chatMessages = $("#chatMessages");
  const chatInput = $("#chatInput");
  const chatSend = $("#chatSend");

  // ─── INIT ───
  function init() {
    renderBookGrids();
    renderTimeline();
    bindEvents();
  }

  // ─── LANDING ───
  enterBtn.addEventListener("click", () => {
    landing.classList.add("leaving");
    setTimeout(() => {
      landing.classList.add("hidden");
      app.classList.remove("hidden");
      // Start card animations after app is visible and laid out
      setTimeout(() => animateCardsOnScroll(), 50);
    }, 700);
  });

  // ─── NAVIGATION ───
  function switchView(viewName) {
    currentView = viewName;
    Object.values(views).forEach((v) => v.classList.remove("active"));
    views[viewName].classList.add("active");
    $$(".nav-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.view === viewName);
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ─── BOOK GRIDS ───
  function renderBookGrids() {
    const gridMap = {
      gospel: $("#gospelsGrid"),
      history: $("#historyGrid"),
      pauline: $("#paulineGrid"),
      general: $("#generalGrid"),
      prophecy: $("#prophecyGrid"),
    };

    NT_BOOKS.forEach((book, i) => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.dataset.category = book.category;
      card.dataset.bookId = book.id;
      card.style.animationDelay = `${(i % 8) * 0.06}s`;

      card.innerHTML = `
        <div class="book-card-name">${book.name}</div>
        <div class="book-card-author">${book.author}</div>
        <div class="book-card-date">${book.date}</div>
        <div class="book-card-chapters">${book.chapters} chapter${book.chapters > 1 ? "s" : ""}</div>
      `;

      // Stagger delay for reveal animation
      card.style.transitionDelay = `${(i % 8) * 0.06}s`;

      card.addEventListener("click", () => openBookDetail(book));
      gridMap[book.category].appendChild(card);
    });
  }

  // ─── BOOK DETAIL ───
  function openBookDetail(book) {
    currentBook = book;

    const hero = $("#detailHero");
    hero.dataset.category = book.category;

    const categoryLabels = {
      gospel: "Gospel",
      history: "History",
      pauline: "Pauline Epistle",
      general: "General Epistle",
      prophecy: "Prophecy",
    };

    $("#detailBadge").textContent = categoryLabels[book.category];
    $("#detailTitle").textContent = book.name;
    $("#detailAuthor").textContent = book.author;
    $("#detailDate").textContent = book.date;
    $("#detailLocation").textContent = book.writtenFrom;
    $("#detailAudience").textContent = book.audience;

    // Overview tab
    $("#tabOverview").innerHTML = `
      <h3>Purpose</h3>
      <p>${book.purpose}</p>

      ${
        book.keyVerse
          ? `
        <div class="verse-callout">
          <p>"${book.keyVerse.text}"</p>
          <cite>${book.keyVerse.ref}</cite>
        </div>
      `
          : ""
      }

      <h4>Who Was It Written To?</h4>
      <p>${book.audienceDesc}</p>

      <h4>Quick Facts</h4>
      <ul>
        ${book.funFacts.map((f) => `<li>${f}</li>`).join("")}
      </ul>

      ${
        book.connections.length
          ? `
        <h4>Connected Books</h4>
        <div class="theme-tags">
          ${book.connections.map((c) => `<span class="theme-tag">${c}</span>`).join("")}
        </div>
      `
          : ""
      }
    `;

    // Historical Context tab
    $("#tabContext").innerHTML = `
      <h3>Historical Context</h3>
      <p>${book.historicalContext}</p>

      <h4>When Was It Written?</h4>
      <p><strong>${book.date}</strong> — ${getDateContext(book.dateMid)}</p>

      <h4>Where Was It Written?</h4>
      <p><strong>${book.writtenFrom}</strong> — ${getLocationContext(book.writtenFrom)}</p>
    `;

    // Author tab
    $("#tabAuthor").innerHTML = `
      <h3>About ${book.author}</h3>
      <p>${book.authorInfo}</p>
    `;

    // Themes tab
    $("#tabThemes").innerHTML = `
      <h3>Key Themes</h3>
      <div class="theme-tags">
        ${book.keyThemes.map((t) => `<span class="theme-tag">${t}</span>`).join("")}
      </div>
      <p style="margin-top: var(--sp-lg);">These themes run throughout the book of ${book.name}, shaping its message and connecting it to the larger story of the New Testament.</p>
    `;

    // Outline tab
    $("#tabOutline").innerHTML = `
      <h3>Book Outline</h3>
      <div class="outline-list">
        ${book.outline
          .map(
            (section) => `
          <div class="outline-item">
            <div class="outline-title">${section.title}</div>
            <div class="outline-ref">${section.ref} — ${section.desc}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    // Reset tabs
    $$(".detail-tab").forEach((t) => t.classList.remove("active"));
    $$(".tab-content").forEach((t) => t.classList.remove("active"));
    $(".detail-tab").classList.add("active");
    $("#tabOverview").classList.add("active");

    // Show panel
    bookDetail.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeBookDetail() {
    bookDetail.classList.add("hidden");
    document.body.style.overflow = "";
    currentBook = null;
  }

  function getDateContext(year) {
    if (year < 50) return "Among the very earliest Christian writings, penned while eyewitnesses were still actively leading the church.";
    if (year < 60) return "Written during the active expansion of the early church across the Roman Empire, as Paul and others planted churches throughout the Mediterranean world.";
    if (year < 70) return "Composed before the catastrophic destruction of the Jerusalem Temple in AD 70, which transformed both Judaism and Christianity forever.";
    if (year < 80) return "Written in the generation after the apostles, as the church established its identity distinct from Judaism.";
    return "Among the latest New Testament writings, composed as the apostolic era drew to a close and the church faced new challenges of false teaching and Roman persecution.";
  }

  function getLocationContext(location) {
    const contexts = {
      "Rome": "The capital of the Empire — a city of over one million people, seat of imperial power, and eventually the place of martyrdom for both Peter and Paul.",
      "Rome (prison)": "Written from confinement in Rome. Paul spent years under Roman guard, yet his imprisonment became an opportunity — his letters from chains shaped Christian theology for all time.",
      "Ephesus": "One of the largest cities in the Roman Empire and a center of pagan worship (especially the cult of Artemis). It became a major hub of early Christianity under Paul and later John.",
      "Corinth": "A wealthy, cosmopolitan port city connecting East and West, famous for its commerce and moral permissiveness. A challenging place to plant a church.",
      "Jerusalem": "The holy city, center of Jewish worship, and birthplace of the Christian church at Pentecost.",
      "Antioch, Syria": "The third-largest city in the Roman Empire and the place where believers were first called 'Christians' (Acts 11:26). A launching pad for missionary work.",
      "Caesarea or Rome": "Either the Roman administrative capital of Judea or the imperial capital itself — both centers of Roman power where Luke had access to records and witnesses.",
      "Macedonia": "The northern Greek region including cities like Thessalonica and Philippi — Paul's first European mission field.",
      "Island of Patmos": "A small, rocky island in the Aegean Sea used as a Roman penal colony. John was exiled here for his faith, and it became the setting for his extraordinary visions.",
      "Macedonia or Nicopolis": "Written either from the Greek mainland during Paul's travels or from the coastal city of Nicopolis where Paul planned to winter.",
      "Antioch or Ephesus": "Two of the most important early Christian centers — either the church's first Gentile base or the great city where Paul spent three years teaching.",
      "Unknown (possibly Rome or Alexandria)": "The origin remains debated — Rome and Alexandria (Egypt's great intellectual center) are leading candidates.",
      "Unknown (possibly Jerusalem)": "Likely written from Jerusalem, the center of the early Jewish-Christian community.",
      "Rome ('Babylon')": "Peter uses 'Babylon' as a code name for Rome — just as ancient Babylon conquered and exiled Israel, Rome now held God's people in its grip."
    };
    return contexts[location] || "A significant city in the ancient Mediterranean world.";
  }

  // ─── TIMELINE ───
  function renderTimeline() {
    const container = $("#timelineContainer");

    // Sort books by date
    const sorted = [...NT_BOOKS].sort((a, b) => a.dateMid - b.dateMid);

    // Group by era
    const eras = [
      { label: "AD 45–55 · The Earliest Writings", books: sorted.filter((b) => b.dateMid <= 55) },
      { label: "AD 55–62 · Paul's Major Letters & Gospels", books: sorted.filter((b) => b.dateMid > 55 && b.dateMid <= 62) },
      { label: "AD 63–68 · Prison Letters & Final Words", books: sorted.filter((b) => b.dateMid > 62 && b.dateMid <= 68) },
      { label: "AD 85–96 · John's Later Writings", books: sorted.filter((b) => b.dateMid > 68) },
    ];

    let html = '<div class="timeline-axis"></div>';

    eras.forEach((era) => {
      if (era.books.length === 0) return;
      html += `<div class="timeline-era">`;
      html += `<div class="timeline-era-label">${era.label}</div>`;

      era.books.forEach((book) => {
        // Brief purpose - take first sentence only
        const briefPurpose = book.purpose.split(/\.\s/)[0] + '.';
        html += `
          <div class="timeline-item" data-category="${book.category}" data-book-id="${book.id}">
            <div class="timeline-item-header">
              <span class="timeline-item-name">${book.name}</span>
              <span class="timeline-item-date">${book.date}</span>
            </div>
            <div class="timeline-item-detail">${book.author} · ${book.writtenFrom}</div>
            <div class="timeline-item-audience"><strong>To:</strong> ${book.audience}</div>
            <div class="timeline-item-purpose"><strong>Why:</strong> ${briefPurpose}</div>
          </div>
        `;
      });

      html += `</div>`;
    });

    container.innerHTML = html;

    // Click handler
    container.querySelectorAll(".timeline-item").forEach((item) => {
      item.addEventListener("click", () => {
        const book = NT_BOOKS.find((b) => b.id === item.dataset.bookId);
        if (book) openBookDetail(book);
      });
    });
  }

  // ─── MAP ───
  function renderMap() {
    const svg = $("#mapSvg");

    // Simplified Mediterranean map paths
    const mapHTML = `
      <!-- Water background -->
      <rect class="map-water" x="0" y="0" width="1000" height="600" rx="8"/>

      <!-- Simplified land masses -->
      <g class="map-lands">
        <!-- Italy -->
        <path class="map-land" d="M220,180 L260,170 L290,190 L310,210 L300,240 L280,260 L260,290 L250,310 L240,300 L230,270 L225,250 L215,230 L210,210 Z"/>
        <!-- Sicily -->
        <path class="map-land" d="M255,310 L280,300 L300,310 L290,325 L265,320 Z"/>

        <!-- Greece -->
        <path class="map-land" d="M340,220 L370,210 L400,220 L410,240 L400,260 L380,280 L370,300 L355,295 L345,280 L340,260 L335,240 Z"/>
        <!-- Crete -->
        <path class="map-land" d="M370,320 L420,315 L440,320 L430,330 L380,330 Z"/>

        <!-- Asia Minor (Turkey) -->
        <path class="map-land" d="M400,200 L440,190 L500,185 L560,190 L600,200 L610,220 L600,240 L580,250 L550,260 L520,265 L490,260 L460,255 L440,260 L420,255 L410,240 L405,220 Z"/>

        <!-- Syria / Levant -->
        <path class="map-land" d="M560,260 L580,250 L600,260 L590,280 L580,300 L560,320 L540,340 L520,350 L510,340 L505,320 L510,300 L520,280 L540,270 Z"/>

        <!-- Egypt (top) -->
        <path class="map-land" d="M420,370 L460,360 L500,355 L520,360 L530,380 L510,400 L480,410 L440,400 L420,390 Z"/>

        <!-- North Africa coast -->
        <path class="map-land" d="M140,340 L200,335 L260,340 L320,345 L370,350 L420,370 L420,390 L380,380 L320,375 L260,370 L200,365 L140,360 Z"/>

        <!-- Spain (partial) -->
        <path class="map-land" d="M100,200 L140,180 L180,185 L200,200 L195,230 L180,250 L160,260 L130,255 L110,240 L100,220 Z"/>

        <!-- Southern France -->
        <path class="map-land" d="M180,185 L210,175 L230,180 L220,180 L200,200 L195,195 Z"/>

        <!-- Macedonia/Balkans -->
        <path class="map-land" d="M310,180 L340,170 L380,175 L400,200 L405,220 L390,210 L370,210 L340,220 L320,210 Z"/>
      </g>

      <!-- Sea labels -->
      <text x="300" y="310" font-family="var(--ff-body)" font-size="11" fill="rgba(59,74,140,0.3)" font-style="italic" text-anchor="middle">Mediterranean Sea</text>
      <text x="460" y="290" font-family="var(--ff-body)" font-size="9" fill="rgba(59,74,140,0.25)" font-style="italic" text-anchor="middle">Aegean Sea</text>

      <!-- Cities -->
      <g id="mapCities"></g>
    `;

    svg.innerHTML = mapHTML;

    const citiesGroup = svg.querySelector("#mapCities");

    MAP_CITIES.forEach((city) => {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute("class", "map-city");
      group.setAttribute("data-city", city.name);

      // Pulse ring
      const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pulse.setAttribute("cx", city.x);
      pulse.setAttribute("cy", city.y);
      pulse.setAttribute("r", "5");
      pulse.setAttribute("class", "map-city-pulse");
      group.appendChild(pulse);

      // Main dot
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", city.x);
      dot.setAttribute("cy", city.y);
      dot.setAttribute("r", "5");
      dot.setAttribute("class", "map-city-dot");
      group.appendChild(dot);

      // Label
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", city.x);
      label.setAttribute("y", city.y - 10);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "map-city-label");
      label.textContent = city.name;
      group.appendChild(label);

      // Tooltip interaction
      group.addEventListener("click", (e) => {
        showMapTooltip(city, e);
      });
      group.addEventListener("mouseenter", (e) => {
        showMapTooltip(city, e);
      });
      group.addEventListener("mouseleave", () => {
        hideMapTooltip();
      });

      citiesGroup.appendChild(group);
    });
  }

  function showMapTooltip(city, e) {
    const tooltip = $("#mapTooltip");
    const container = $(".map-container");
    const rect = container.getBoundingClientRect();

    // Position tooltip
    const svgRect = $("#mapSvg").getBoundingClientRect();
    const scaleX = svgRect.width / 1000;
    const scaleY = svgRect.height / 600;

    let left = city.x * scaleX + svgRect.left - rect.left;
    let top = city.y * scaleY + svgRect.top - rect.top - 10;

    // Keep tooltip in bounds
    if (left > rect.width - 260) left = rect.width - 260;
    if (left < 10) left = 10;

    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
    tooltip.style.transform = "translateY(-100%)";

    tooltip.innerHTML = `
      <div class="map-tooltip-city">${city.name}</div>
      <div class="map-tooltip-books">Books written here:<br><strong>${city.books.join(", ")}</strong></div>
    `;

    tooltip.classList.remove("hidden");
  }

  function hideMapTooltip() {
    $("#mapTooltip").classList.add("hidden");
  }

  // ─── SCHOLAR / AI CHAT ───
  async function sendQuestion(question) {
    if (!question.trim()) return;

    // Hide suggestions after first question
    const suggestions = $("#scholarSuggestions");
    if (suggestions) suggestions.style.display = "none";

    // Remove welcome message
    const welcome = chatMessages.querySelector(".chat-welcome");
    if (welcome) welcome.remove();

    // Add user message
    appendChatMessage("user", question);
    chatInput.value = "";
    chatInput.style.height = "auto";

    // Add loading indicator
    const loadingEl = appendChatMessage("loading", "");

    // Disable input
    chatSend.disabled = true;

    try {
      const bookContext = currentBook ? currentBook.name : null;
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, bookContext }),
      });

      const data = await response.json();

      // Remove loading
      loadingEl.remove();

      if (data.error) {
        appendChatMessage("assistant", "I apologize, but I'm unable to answer right now. Please make sure the server is running and try again.");
      } else {
        appendChatMessage("assistant", data.answer);
      }
    } catch (err) {
      loadingEl.remove();
      appendChatMessage(
        "assistant",
        "I'm unable to connect to the server. Please make sure the application is running with `npm start` and try again."
      );
    }

    chatSend.disabled = false;
    chatInput.focus();
  }

  function appendChatMessage(type, content) {
    const msg = document.createElement("div");

    if (type === "loading") {
      msg.className = "chat-msg loading";
      msg.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    } else {
      msg.className = `chat-msg ${type}`;
      if (type === "assistant") {
        msg.innerHTML = formatMarkdown(content);
      } else {
        msg.innerHTML = `<p>${escapeHtml(content)}</p>`;
      }
    }

    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function formatMarkdown(text) {
    // Basic markdown → HTML
    let html = escapeHtml(text);

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // Bullet points
    html = html.replace(/^[\-•]\s+(.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

    // Paragraphs
    html = html
      .split(/\n\n+/)
      .map((p) => {
        p = p.trim();
        if (!p) return "";
        if (p.startsWith("<ul>") || p.startsWith("<li>")) return p;
        return `<p>${p}</p>`;
      })
      .join("");

    // Clean up any remaining single newlines within paragraphs
    html = html.replace(/\n/g, "<br>");

    return html;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // ─── SEARCH ───
  function handleSearch(query) {
    const q = query.toLowerCase().trim();
    const cards = $$(".book-card");

    if (!q) {
      cards.forEach((card) => {
        card.style.display = "";
        card.style.opacity = "1";
      });
      $$(".book-category").forEach((cat) => (cat.style.display = ""));
      return;
    }

    cards.forEach((card) => {
      const bookId = card.dataset.bookId;
      const book = NT_BOOKS.find((b) => b.id === bookId);
      const match =
        book.name.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q) ||
        book.keyThemes.some((t) => t.toLowerCase().includes(q)) ||
        book.audience.toLowerCase().includes(q) ||
        book.writtenFrom.toLowerCase().includes(q);

      card.style.display = match ? "" : "none";
      card.style.opacity = match ? "1" : "0";
    });

    // Hide empty categories
    $$(".book-category").forEach((cat) => {
      const grid = cat.querySelector(".book-grid");
      const visible = grid.querySelectorAll('.book-card[style=""], .book-card:not([style])');
      const hasVisible = Array.from(grid.children).some((c) => c.style.display !== "none");
      cat.style.display = hasVisible ? "" : "none";
    });
  }

  // ─── SCROLL ANIMATIONS ───
  function animateCardsOnScroll() {
    const cards = $$(".book-card");

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "50px" }
    );

    // Reveal cards that are already in view, observe the rest
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
        card.classList.add("revealed");
      } else {
        observer.observe(card);
      }
    });
  }

  // ─── AUTO-RESIZE TEXTAREA ───
  function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  }

  // ─── EVENT BINDINGS ───
  function bindEvents() {
    // Nav tabs
    $$(".nav-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchView(tab.dataset.view));
    });

    // Home button
    $("#navHome").addEventListener("click", () => switchView("books"));

    // Detail panel
    detailClose.addEventListener("click", closeBookDetail);
    detailOverlay.addEventListener("click", closeBookDetail);

    // Detail tabs
    $$(".detail-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".detail-tab").forEach((t) => t.classList.remove("active"));
        $$(".tab-content").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const tabId = "tab" + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
        $(`#${tabId}`).classList.add("active");
      });
    });

    // Ask Scholar button in detail panel
    $("#detailAskBtn").addEventListener("click", () => {
      closeBookDetail();
      switchView("scholar");
      if (currentBook) {
        chatInput.value = `Tell me more about the book of ${currentBook.name} — its background, why it was written, and what was happening historically.`;
        chatInput.focus();
      }
    });

    // Search
    searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
    searchInput.addEventListener("focus", () => {
      searchInput.classList.add("expanded");
      if (currentView !== "books") switchView("books");
    });
    searchInput.addEventListener("blur", () => {
      if (!searchInput.value) searchInput.classList.remove("expanded");
    });

    // Chat
    chatSend.addEventListener("click", () => sendQuestion(chatInput.value));
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendQuestion(chatInput.value);
      }
    });
    chatInput.addEventListener("input", () => autoResize(chatInput));

    // Suggestion chips
    $$(".suggestion-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        sendQuestion(chip.dataset.q);
      });
    });

    // Keyboard: Escape to close detail
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !bookDetail.classList.contains("hidden")) {
        closeBookDetail();
      }
    });

    // Handle back button / swipe on mobile
    window.addEventListener("popstate", () => {
      if (!bookDetail.classList.contains("hidden")) {
        closeBookDetail();
      }
    });
  }

  // ─── START ───
  init();
})();
