// Barre de navigation compacte, injectée en haut de chaque page de chapitre.
// Permet de : revenir à l'accueil, sauter au chapitre précédent/suivant
// du même domaine, et ouvrir un panneau listant tous les chapitres par
// domaine (maths / physique / SI) pour changer de domaine en un clic.
(function () {
  "use strict";

  var scriptTag = document.currentScript;
  var currentUrl = (scriptTag && scriptTag.getAttribute("data-current")) || "";

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function init() {
    var CHAPTERS = window.SITE_CHAPTERS || [];
    var SUBJECTS = window.SITE_SUBJECTS || [];
    if (!CHAPTERS.length) return;

    var current = null;
    for (var i = 0; i < CHAPTERS.length; i++) {
      if (CHAPTERS[i].url === currentUrl) { current = CHAPTERS[i]; break; }
    }

    var style = document.createElement("style");
    style.textContent = [
      ".site-nav{position:sticky;top:0;z-index:50;background:var(--surface);border-bottom:1px solid var(--border);font-family:\"Public Sans\",-apple-system,BlinkMacSystemFont,sans-serif;margin:-28px -20px 24px -20px;padding-inline:20px;box-shadow:var(--shadow);}",
      ".site-nav-bar{max-width:780px;margin:0 auto;display:flex;align-items:center;gap:10px;padding:10px 0;flex-wrap:wrap;}",
      ".site-nav-home{font-family:\"Spectral\",Georgia,serif;font-weight:700;font-size:.92rem;color:var(--accent-ink);text-decoration:none;white-space:nowrap;}",
      ".site-nav-sep{color:var(--ink-muted);}",
      ".site-nav-current{display:flex;align-items:center;gap:8px;flex:1;min-width:0;}",
      ".site-nav-badge{font-family:\"JetBrains Mono\",monospace;font-size:.68rem;font-weight:600;letter-spacing:.04em;padding:2px 7px;border-radius:5px;border:1px solid var(--accent);color:var(--accent-ink);background:var(--accent-soft);white-space:nowrap;}",
      ".site-nav-title{font-size:.83rem;color:var(--ink-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
      ".site-nav-actions{display:flex;align-items:center;gap:6px;margin-left:auto;}",
      ".site-nav-btn{font-family:\"JetBrains Mono\",monospace;font-size:.75rem;border:1px solid var(--border);background:var(--surface-2);color:var(--ink);border-radius:6px;padding:5px 9px;cursor:pointer;line-height:1;}",
      ".site-nav-btn:hover{border-color:var(--accent);}",
      ".site-nav-btn:disabled{opacity:.35;cursor:default;}",
      ".site-nav-btn:disabled:hover{border-color:var(--border);}",
      ".site-nav-panel{max-width:780px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:6px 0 16px;border-top:1px solid var(--border);}",
      "@media (max-width:640px){.site-nav-panel{grid-template-columns:1fr;}}",
      ".site-nav-panel[hidden]{display:none;}",
      ".site-nav-col-head{font-family:\"JetBrains Mono\",monospace;font-size:.66rem;font-weight:600;letter-spacing:.04em;color:var(--ink-muted);margin:10px 0 6px;}",
      ".site-nav-link{display:block;padding:6px 8px;border-radius:6px;text-decoration:none;color:var(--ink);font-size:.82rem;line-height:1.35;}",
      ".site-nav-link:hover{background:var(--surface-2);}",
      ".site-nav-link.is-current{background:var(--accent-soft);color:var(--accent-ink);font-weight:600;}",
      ".site-nav-empty{font-size:.78rem;color:var(--ink-muted);padding:6px 8px;}"
    ].join("\n");
    document.head.appendChild(style);

    var root = document.createElement("div");
    root.className = "site-nav";

    var bar = document.createElement("div");
    bar.className = "site-nav-bar";

    var home = document.createElement("a");
    home.className = "site-nav-home";
    home.href = "index.html";
    home.textContent = "📓 Le Cahier de Léane";
    bar.appendChild(home);

    var curWrap = document.createElement("div");
    curWrap.className = "site-nav-current";
    if (current) {
      var subj = null;
      for (var j = 0; j < SUBJECTS.length; j++) {
        if (SUBJECTS[j].key === current.subject) { subj = SUBJECTS[j]; break; }
      }
      curWrap.innerHTML =
        '<span class="site-nav-sep">/</span>' +
        '<span class="site-nav-badge">' + escapeHtml(subj ? subj.short : current.subject) + '</span>' +
        '<span class="site-nav-title">' + escapeHtml(current.title) + '</span>';
    }
    bar.appendChild(curWrap);

    var actions = document.createElement("div");
    actions.className = "site-nav-actions";

    var sameSubject = current
      ? CHAPTERS.filter(function (c) { return c.subject === current.subject; })
          .sort(function (a, b) { return (a.addedAt || "").localeCompare(b.addedAt || ""); })
      : [];
    var idx = current ? sameSubject.indexOf(current) : -1;
    var prevChap = idx > 0 ? sameSubject[idx - 1] : null;
    var nextChap = idx >= 0 && idx < sameSubject.length - 1 ? sameSubject[idx + 1] : null;

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "site-nav-btn";
    prevBtn.textContent = "←";
    prevBtn.title = prevChap ? "Précédent : " + prevChap.title : "Pas de chapitre précédent";
    if (!prevChap) prevBtn.disabled = true;
    prevBtn.addEventListener("click", function () { if (prevChap) window.location.href = prevChap.url; });
    actions.appendChild(prevBtn);

    var toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "site-nav-btn";
    toggleBtn.textContent = "Chapitres ▾";
    toggleBtn.setAttribute("aria-expanded", "false");
    actions.appendChild(toggleBtn);

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "site-nav-btn";
    nextBtn.textContent = "→";
    nextBtn.title = nextChap ? "Suivant : " + nextChap.title : "Pas de chapitre suivant";
    if (!nextChap) nextBtn.disabled = true;
    nextBtn.addEventListener("click", function () { if (nextChap) window.location.href = nextChap.url; });
    actions.appendChild(nextBtn);

    bar.appendChild(actions);
    root.appendChild(bar);

    var panel = document.createElement("div");
    panel.className = "site-nav-panel";
    panel.hidden = true;

    SUBJECTS.forEach(function (subj) {
      var chapters = CHAPTERS.filter(function (c) { return c.subject === subj.key; })
        .sort(function (a, b) { return (a.addedAt || "").localeCompare(b.addedAt || ""); });
      var col = document.createElement("div");
      var head = document.createElement("div");
      head.className = "site-nav-col-head";
      head.style.marginTop = "0";
      head.textContent = subj.short + " · " + chapters.length + " chapitre" + (chapters.length === 1 ? "" : "s");
      col.appendChild(head);
      if (!chapters.length) {
        var empty = document.createElement("div");
        empty.className = "site-nav-empty";
        empty.textContent = "Rien pour l'instant";
        col.appendChild(empty);
      } else {
        chapters.forEach(function (c) {
          var a = document.createElement("a");
          a.className = "site-nav-link" + (c.url === currentUrl ? " is-current" : "");
          a.href = c.url;
          a.textContent = c.title;
          col.appendChild(a);
        });
      }
      panel.appendChild(col);
    });

    root.appendChild(panel);
    document.body.insertBefore(root, document.body.firstChild);

    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = panel.hidden;
      panel.hidden = !willOpen;
      toggleBtn.setAttribute("aria-expanded", String(willOpen));
    });
    document.addEventListener("click", function (e) {
      if (!panel.hidden && !root.contains(e.target)) {
        panel.hidden = true;
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) {
        panel.hidden = true;
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
