/* ═══════════════════════════════════════════════
   THE LIVING WORD — Application Logic
   ═══════════════════════════════════════════════ */

(function () {
  "use strict";

  // ─── STATE ───
  let currentView = "books";
  let currentBook = null;
  let currentUser = null;
  let currentBookmark = null;

  // ─── DOM REFS ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ─── AUTH CHECK ───
  const loginScreen = $("#loginScreen");
  const loginForm = $("#loginForm");
  const loginUsername = $("#loginUsername");
  const loginPassword = $("#loginPassword");
  const loginError = $("#loginError");

  function isLoggedIn() {
    return document.cookie.split(";").some((c) => c.trim().startsWith("logged_in="));
  }

  if (isLoggedIn()) {
    loginScreen.classList.add("hidden");
    loadUserData();
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.classList.add("hidden");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername.value, password: loginPassword.value }),
      });

      if (res.ok) {
        const data = await res.json();
        currentUser = data.user;
        loginScreen.classList.add("leaving");
        setTimeout(() => loginScreen.classList.add("hidden"), 600);
        loadUserData();
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
    connections: $("#connectionsView"),
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
    // Initialize graph on first view
    if (viewName === "connections") initGraph();
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

    // Scripture tab
    renderScriptureTab(book);

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

  // ─── CONNECTIONS GRAPH ───
  const graphCanvas = $("#graphCanvas");
  const graphCtx = graphCanvas ? graphCanvas.getContext("2d") : null;
  const graphTooltip = $("#graphTooltip");
  let graphNodes = [];
  let graphEdges = [];
  let graphAnimId = null;
  let graphDragging = null;
  let graphHovered = null;
  let graphReady = false;
  let graphDragMoved = false;

  const categoryColors = {
    gospel: "#722F37",
    history: "#2E5E4E",
    pauline: "#3B4A8C",
    general: "#7B5B3A",
    prophecy: "#6B3A6B",
  };

  function initGraph() {
    if (!graphCanvas || graphReady) return;
    graphReady = true;

    const nameToId = {};
    NT_BOOKS.forEach((b) => (nameToId[b.name] = b.id));

    // Build nodes
    graphNodes = NT_BOOKS.map((book) => ({
      id: book.id,
      name: book.name,
      category: book.category,
      chapters: book.chapters,
      radius: Math.max(14, Math.min(30, 10 + book.chapters * 0.5)),
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      book: book,
    }));

    // Build edges from connections
    const edgeSet = new Set();
    graphEdges = [];
    NT_BOOKS.forEach((book) => {
      (book.connections || []).forEach((connName) => {
        const targetId = nameToId[connName];
        if (!targetId) return;
        const key = [book.id, targetId].sort().join("-");
        if (edgeSet.has(key)) return;
        edgeSet.add(key);
        graphEdges.push({
          source: graphNodes.find((n) => n.id === book.id),
          target: graphNodes.find((n) => n.id === targetId),
        });
      });
    });

    resizeGraph();
    window.addEventListener("resize", resizeGraph);
    bindGraphEvents();
  }

  function resizeGraph() {
    const container = graphCanvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight || 500;
    graphCanvas.width = w * dpr;
    graphCanvas.height = h * dpr;
    graphCanvas.style.width = w + "px";
    graphCanvas.style.height = h + "px";
    graphCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Scatter nodes in a circle initially
    const cx = w / 2;
    const cy = h / 2;
    const spread = Math.min(w, h) * 0.35;
    graphNodes.forEach((node, i) => {
      const angle = (i / graphNodes.length) * Math.PI * 2;
      node.x = cx + Math.cos(angle) * spread + (Math.random() - 0.5) * 40;
      node.y = cy + Math.sin(angle) * spread + (Math.random() - 0.5) * 40;
      node.vx = 0;
      node.vy = 0;
    });

    startGraphSimulation();
  }

  function startGraphSimulation() {
    if (graphAnimId) cancelAnimationFrame(graphAnimId);
    let iterations = 0;
    const maxIterations = 300;

    function tick() {
      iterations++;
      const w = graphCanvas.clientWidth;
      const h = graphCanvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const damping = iterations < 100 ? 0.92 : 0.85;

      // Repulsion between all pairs
      for (let i = 0; i < graphNodes.length; i++) {
        for (let j = i + 1; j < graphNodes.length; j++) {
          const a = graphNodes[i];
          const b = graphNodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 2000 / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }

      // Spring forces along edges
      graphEdges.forEach((edge) => {
        const dx = edge.target.x - edge.source.x;
        const dy = edge.target.y - edge.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 100;
        const force = (dist - targetDist) * 0.02;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        edge.source.vx += fx;
        edge.source.vy += fy;
        edge.target.vx -= fx;
        edge.target.vy -= fy;
      });

      // Centering force
      graphNodes.forEach((node) => {
        node.vx += (cx - node.x) * 0.003;
        node.vy += (cy - node.y) * 0.003;
      });

      // Update positions
      graphNodes.forEach((node) => {
        if (node === graphDragging) return;
        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;
        // Keep in bounds
        const pad = node.radius + 4;
        node.x = Math.max(pad, Math.min(w - pad, node.x));
        node.y = Math.max(pad, Math.min(h - pad, node.y));
      });

      drawGraph();

      if (iterations < maxIterations || graphDragging) {
        graphAnimId = requestAnimationFrame(tick);
      }
    }
    tick();
  }

  function drawGraph() {
    const w = graphCanvas.clientWidth;
    const h = graphCanvas.clientHeight;
    graphCtx.clearRect(0, 0, w, h);

    // Find connected nodes to hovered
    const hoveredConnections = new Set();
    if (graphHovered) {
      hoveredConnections.add(graphHovered.id);
      graphEdges.forEach((e) => {
        if (e.source.id === graphHovered.id) hoveredConnections.add(e.target.id);
        if (e.target.id === graphHovered.id) hoveredConnections.add(e.source.id);
      });
    }

    // Draw edges
    graphEdges.forEach((edge) => {
      const isHighlighted =
        graphHovered &&
        (edge.source.id === graphHovered.id || edge.target.id === graphHovered.id);
      const isDimmed = graphHovered && !isHighlighted;

      graphCtx.beginPath();
      graphCtx.moveTo(edge.source.x, edge.source.y);
      graphCtx.lineTo(edge.target.x, edge.target.y);

      if (isHighlighted) {
        graphCtx.strokeStyle = "rgba(201,152,76,0.7)";
        graphCtx.lineWidth = 2.5;
      } else if (isDimmed) {
        graphCtx.strokeStyle = "rgba(44,36,32,0.04)";
        graphCtx.lineWidth = 1;
      } else {
        graphCtx.strokeStyle = "rgba(44,36,32,0.1)";
        graphCtx.lineWidth = 1;
      }
      graphCtx.stroke();
    });

    // Draw nodes
    graphNodes.forEach((node) => {
      const isHovered = graphHovered && node.id === graphHovered.id;
      const isConnected = hoveredConnections.has(node.id);
      const isDimmed = graphHovered && !isConnected;
      const color = categoryColors[node.category];

      // Glow for hovered
      if (isHovered) {
        graphCtx.beginPath();
        graphCtx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        graphCtx.fillStyle = color + "20";
        graphCtx.fill();
      }

      // Node circle
      graphCtx.beginPath();
      graphCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      graphCtx.fillStyle = isDimmed ? color + "30" : color;
      graphCtx.fill();
      graphCtx.strokeStyle = isDimmed ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)";
      graphCtx.lineWidth = 2;
      graphCtx.stroke();

      // Label
      const fontSize = node.radius > 20 ? 11 : 9;
      graphCtx.font = `500 ${fontSize}px 'Crimson Pro', serif`;
      graphCtx.textAlign = "center";
      graphCtx.textBaseline = "middle";
      graphCtx.fillStyle = isDimmed ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.95)";
      graphCtx.fillText(node.name, node.x, node.y);
    });
  }

  function getGraphNodeAt(x, y) {
    for (let i = graphNodes.length - 1; i >= 0; i--) {
      const n = graphNodes[i];
      const dx = x - n.x;
      const dy = y - n.y;
      if (dx * dx + dy * dy <= n.radius * n.radius) return n;
    }
    return null;
  }

  function getCanvasPos(e) {
    const rect = graphCanvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  }

  function bindGraphEvents() {
    // Mouse move / hover
    graphCanvas.addEventListener("mousemove", (e) => {
      const pos = getCanvasPos(e);
      const node = getGraphNodeAt(pos.x, pos.y);

      if (graphDragging) {
        graphDragMoved = true;
        graphDragging.x = pos.x;
        graphDragging.y = pos.y;
        graphDragging.vx = 0;
        graphDragging.vy = 0;
        drawGraph();
        return;
      }

      if (node !== graphHovered) {
        graphHovered = node;
        graphCanvas.style.cursor = node ? "pointer" : "default";

        if (node) {
          const connNames = [];
          graphEdges.forEach((e) => {
            if (e.source.id === node.id) connNames.push(e.target.name);
            if (e.target.id === node.id) connNames.push(e.source.name);
          });
          graphTooltip.innerHTML = `
            <div class="graph-tooltip-name">${node.name}</div>
            <div class="graph-tooltip-meta">${node.book.author} · ${node.book.date}</div>
            ${connNames.length ? `<div class="graph-tooltip-conn">Connected to: ${connNames.join(", ")}</div>` : ""}
          `;
          graphTooltip.classList.remove("hidden");
          const rect = graphCanvas.getBoundingClientRect();
          graphTooltip.style.left = Math.min(pos.x + 12, rect.width - 220) + "px";
          graphTooltip.style.top = pos.y - 10 + "px";
        } else {
          graphTooltip.classList.add("hidden");
        }
        drawGraph();
      }
    });

    // Mouse down — start drag
    graphCanvas.addEventListener("mousedown", (e) => {
      const pos = getCanvasPos(e);
      const node = getGraphNodeAt(pos.x, pos.y);
      if (node) {
        graphDragging = node;
        graphDragMoved = false;
        startGraphSimulation();
      }
    });

    // Mouse up — stop drag, maybe open book
    graphCanvas.addEventListener("mouseup", (e) => {
      if (graphDragging) {
        const node = graphDragging;
        const wasDrag = graphDragMoved;
        graphDragging = null;
        graphDragMoved = false;
        if (!wasDrag) {
          openBookDetail(node.book);
        }
        return;
      }
    });

    // Mouse leave
    graphCanvas.addEventListener("mouseleave", () => {
      graphHovered = null;
      graphTooltip.classList.add("hidden");
      drawGraph();
    });

    // Touch support
    graphCanvas.addEventListener("touchstart", (e) => {
      const pos = getCanvasPos(e);
      const node = getGraphNodeAt(pos.x, pos.y);
      if (node) {
        e.preventDefault();
        graphDragging = node;
        graphHovered = node;
        startGraphSimulation();
        drawGraph();
      }
    }, { passive: false });

    graphCanvas.addEventListener("touchmove", (e) => {
      if (graphDragging) {
        e.preventDefault();
        const pos = getCanvasPos(e);
        graphDragging.x = pos.x;
        graphDragging.y = pos.y;
        graphDragging.vx = 0;
        graphDragging.vy = 0;
        drawGraph();
      }
    }, { passive: false });

    graphCanvas.addEventListener("touchend", (e) => {
      if (graphDragging) {
        const node = graphDragging;
        graphDragging = null;
        graphHovered = null;
        drawGraph();
        // If it was a tap (not much movement), open detail
        openBookDetail(node.book);
      }
    });
  }

  // ─── SCRIPTURE TAB ───
  const scriptureCache = {};

  // Mapping from book ID to bolls.life numeric book number
  const bibleBookNums = {
    matthew: 40, mark: 41, luke: 42, john: 43, acts: 44,
    romans: 45, "1corinthians": 46, "2corinthians": 47,
    galatians: 48, ephesians: 49, philippians: 50,
    colossians: 51, "1thessalonians": 52, "2thessalonians": 53,
    "1timothy": 54, "2timothy": 55, titus: 56, philemon: 57,
    hebrews: 58, james: 59, "1peter": 60, "2peter": 61,
    "1john": 62, "2john": 63, "3john": 64, jude: 65, revelation: 66,
  };

  function renderScriptureTab(book) {
    const container = $("#tabScripture");
    const bookNum = bibleBookNums[book.id];

    let html = `<h3>Read ${book.name}</h3>`;
    html += `<p class="scripture-note">New International Version · Select a chapter to read</p>`;
    html += `<div class="chapter-grid">`;
    for (let i = 1; i <= book.chapters; i++) {
      html += `<button class="chapter-btn" data-chapter="${i}" data-book-num="${bookNum}">${i}</button>`;
    }
    html += `</div>`;
    html += `<div class="scripture-text" id="scriptureText"></div>`;

    container.innerHTML = html;

    // Bind chapter buttons
    container.querySelectorAll(".chapter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".chapter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        loadChapter(bookNum, parseInt(btn.dataset.chapter), book.name);
      });
    });
  }

  async function loadChapter(bookNum, chapter, bookName) {
    const textEl = $("#scriptureText");
    const cacheKey = `${bookNum}:${chapter}`;

    if (scriptureCache[cacheKey]) {
      renderVerses(scriptureCache[cacheKey]);
      return;
    }

    textEl.innerHTML = `<div class="scripture-loading"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;

    try {
      const ref = encodeURIComponent(`${bookName} ${chapter}`);
      const res = await fetch(`/api/bible/${bookNum}/${chapter}?ref=${ref}`);
      const data = await res.json();

      if (data.error) {
        textEl.innerHTML = `<p class="scripture-error">Unable to load scripture. Please try again.</p>`;
        return;
      }

      scriptureCache[cacheKey] = data;
      renderVerses(data);
    } catch {
      textEl.innerHTML = `<p class="scripture-error">Unable to connect. Please check your connection.</p>`;
    }
  }

  function renderVerses(data) {
    const textEl = $("#scriptureText");
    let html = `<div class="scripture-reference">${data.reference}</div>`;
    html += `<div class="scripture-verses">`;
    data.verses.forEach((v) => {
      html += `<span class="verse"><sup class="verse-num">${v.verse}</sup>${v.text} </span>`;
    });
    html += `</div>`;
    textEl.innerHTML = html;
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

  // ─── USER DATA & BOOKMARK ───
  async function loadUserData() {
    try {
      const res = await fetch("/api/me");
      if (!res.ok) return;
      const data = await res.json();
      currentUser = data.user;
      currentBookmark = data.bookmark;
      initBookmarkPanel();
      updateBookmarkUI();
    } catch { /* silent */ }
  }

  function initBookmarkPanel() {
    const bookSelect = $("#bookmarkBook");
    if (bookSelect.children.length > 0) return; // already initialized
    NT_BOOKS.forEach((book) => {
      const opt = document.createElement("option");
      opt.value = book.id;
      opt.textContent = book.name;
      bookSelect.appendChild(opt);
    });

    // Update max chapter when book changes
    bookSelect.addEventListener("change", () => {
      const book = NT_BOOKS.find((b) => b.id === bookSelect.value);
      if (book) {
        $("#bookmarkChapter").max = book.chapters;
      }
    });

    // Set initial max
    const firstBook = NT_BOOKS[0];
    if (firstBook) $("#bookmarkChapter").max = firstBook.chapters;
  }

  function updateBookmarkUI() {
    const dot = $("#bookmarkDot");
    const current = $("#bookmarkCurrent");

    if (currentBookmark) {
      dot.classList.remove("hidden");
      const book = NT_BOOKS.find((b) => b.id === currentBookmark.bookId);
      const bookName = book ? book.name : currentBookmark.bookId;
      const ref = `${bookName} ${currentBookmark.chapter}:${currentBookmark.verse}`;
      const raw = currentBookmark.updatedAt;
      const date = new Date(raw.includes("T") ? raw : raw + "Z").toLocaleDateString();
      current.innerHTML = `
        <div class="bookmark-current-ref">${ref}</div>
        ${currentBookmark.notes ? `<div class="bookmark-current-notes">${escapeHtml(currentBookmark.notes)}</div>` : ""}
        <div class="bookmark-current-date">Saved ${date}</div>
      `;

      // Pre-fill form
      $("#bookmarkBook").value = currentBookmark.bookId;
      $("#bookmarkChapter").value = currentBookmark.chapter;
      $("#bookmarkVerse").value = currentBookmark.verse;
      $("#bookmarkNotes").value = currentBookmark.notes || "";
      const bookData = NT_BOOKS.find((b) => b.id === currentBookmark.bookId);
      if (bookData) $("#bookmarkChapter").max = bookData.chapters;
    } else {
      dot.classList.add("hidden");
      current.innerHTML = `<div class="bookmark-current-empty">No bookmark set yet</div>`;
    }
  }

  async function saveBookmark() {
    const bookId = $("#bookmarkBook").value;
    const chapter = parseInt($("#bookmarkChapter").value) || 1;
    const verse = parseInt($("#bookmarkVerse").value) || 1;
    const notes = $("#bookmarkNotes").value.trim();

    if (!bookId || !chapter) return;

    try {
      const res = await fetch("/api/bookmark", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, chapter, verse, notes }),
      });
      if (res.ok) {
        currentBookmark = { bookId, chapter, verse, notes, updatedAt: new Date().toISOString() };
        updateBookmarkUI();
        // Flash saved confirmation
        const btn = $("#bookmarkSave");
        btn.textContent = "Saved!";
        btn.classList.add("saved");
        setTimeout(() => {
          btn.textContent = "Save Bookmark";
          btn.classList.remove("saved");
        }, 1500);
      }
    } catch { /* silent */ }
  }

  // Bookmark panel toggle
  $("#bookmarkBtn").addEventListener("click", () => {
    $("#bookmarkPanel").classList.toggle("hidden");
  });

  $("#bookmarkPanelClose").addEventListener("click", () => {
    $("#bookmarkPanel").classList.add("hidden");
  });

  $("#bookmarkSave").addEventListener("click", saveBookmark);

  // Close panel on outside click
  document.addEventListener("click", (e) => {
    const panel = $("#bookmarkPanel");
    const btn = $("#bookmarkBtn");
    if (!panel.classList.contains("hidden") && !panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.add("hidden");
    }
  });

  // ─── START ───
  init();
})();
