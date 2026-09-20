// Barre de navigation compacte, injectée en haut de chaque page de chapitre.
// Permet de : revenir à l'accueil, sauter au chapitre précédent/suivant
// du même domaine, et ouvrir un panneau listant tous les chapitres par
// domaine (maths / physique / SI) pour changer de domaine en un clic.
(function () {
  "use strict";

  var scriptTag = document.currentScript;
  var currentUrl = (scriptTag && scriptTag.getAttribute("data-current")) || "";

  var ICON_HOME =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9"></path></svg>';
  var ICON_CHEVRON_LEFT =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
  var ICON_CHEVRON_RIGHT =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  var ICON_GRID =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg>';

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
      ".site-nav{position:sticky;top:0;z-index:50;background:color-mix(in srgb, var(--surface) 92%, transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--border);font-family:\"Public Sans\",-apple-system,BlinkMacSystemFont,sans-serif;margin:-28px -20px 28px -20px;padding-inline:16px;}",
      ".site-nav-bar{max-width:780px;margin:0 auto;display:flex;align-items:center;gap:8px;padding:12px 0;min-height:52px;}",
      ".site-nav-home{display:flex;align-items:center;gap:6px;font-family:\"Spectral\",Georgia,serif;font-weight:700;font-size:.92rem;color:var(--accent-ink);text-decoration:none;white-space:nowrap;flex-shrink:0;}",
      ".site-nav-home svg{flex-shrink:0;opacity:.8;}",
      ".site-nav-current{display:none;align-items:baseline;gap:8px;flex:1;min-width:0;margin-left:6px;padding-left:12px;border-left:1px solid var(--border);}",
      "@media (min-width:560px){.site-nav-current{display:flex;}}",
      ".site-nav-badge{font-family:\"JetBrains Mono\",monospace;font-size:.65rem;font-weight:600;letter-spacing:.04em;padding:2px 7px;border-radius:5px;background:var(--subject-color, var(--accent));color:#fff;white-space:nowrap;flex-shrink:0;}",
      ".site-nav-title{font-size:.82rem;color:var(--ink-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
      ".site-nav-actions{display:flex;align-items:center;gap:6px;margin-left:auto;flex-shrink:0;}",
      ".site-nav-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:\"JetBrains Mono\",monospace;font-size:.72rem;font-weight:600;border:1px solid var(--border);background:var(--surface-2);color:var(--ink);border-radius:8px;padding:0 11px;height:36px;cursor:pointer;letter-spacing:.02em;}",
      ".site-nav-btn.icon-only{width:36px;padding:0;}",
      ".site-nav-btn:hover{border-color:var(--accent);color:var(--accent-ink);}",
      ".site-nav-btn:disabled{opacity:.3;cursor:default;}",
      ".site-nav-btn:disabled:hover{border-color:var(--border);color:var(--ink);}",
      ".site-nav-btn[aria-expanded=true]{background:var(--accent-soft);border-color:var(--accent);color:var(--accent-ink);}",
      ".site-nav-panel-wrap{max-height:0;overflow:hidden;transition:max-height .22s ease;}",
      ".site-nav-panel-wrap.is-open{max-height:70vh;overflow-y:auto;}",
      ".site-nav-panel{max-width:780px;margin:0 auto;padding:4px 0 18px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:22px;}",
      ".site-nav-col-head{display:flex;align-items:center;gap:8px;font-family:\"JetBrains Mono\",monospace;font-size:.7rem;font-weight:600;letter-spacing:.05em;color:var(--ink);text-transform:uppercase;margin:14px 0 8px;}",
      ".site-nav-col-head:first-child{margin-top:14px;}",
      ".site-nav-col-head .dot{width:9px;height:9px;border-radius:50%;background:var(--subject-color, var(--accent));flex-shrink:0;}",
      ".site-nav-col-head .count{margin-left:auto;color:var(--ink-muted);font-weight:500;text-transform:none;}",
      ".site-nav-link{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;text-decoration:none;color:var(--ink);font-size:.85rem;line-height:1.35;min-height:40px;}",
      ".site-nav-link:hover{background:var(--surface-2);}",
      ".site-nav-link.is-current{background:color-mix(in srgb, var(--subject-color, var(--accent)) 16%, var(--surface));color:var(--ink);font-weight:600;}",
      ".site-nav-link .n{flex-shrink:0;width:22px;height:22px;border-radius:6px;background:var(--surface-2);color:var(--ink-muted);font-family:\"JetBrains Mono\",monospace;font-size:.65rem;display:flex;align-items:center;justify-content:center;}",
      ".site-nav-link.is-current .n{background:var(--subject-color, var(--accent));color:#fff;}",
      ".site-nav-empty{font-size:.8rem;color:var(--ink-muted);padding:6px 10px;}"
    ].join("\n");
    document.head.appendChild(style);

    var root = document.createElement("div");
    root.className = "site-nav";

    var bar = document.createElement("div");
    bar.className = "site-nav-bar";

    var home = document.createElement("a");
    home.className = "site-nav-home";
    home.href = "index.html";
    home.innerHTML = ICON_HOME + "<span>Le Cahier de Léane</span>";
    bar.appendChild(home);

    if (current) {
      var subj = null;
      for (var j = 0; j < SUBJECTS.length; j++) {
        if (SUBJECTS[j].key === current.subject) { subj = SUBJECTS[j]; break; }
      }
      var curWrap = document.createElement("div");
      curWrap.className = "site-nav-current";
      if (subj) curWrap.style.setProperty("--subject-color", subj.color);
      curWrap.innerHTML =
        '<span class="site-nav-badge">' + escapeHtml(subj ? subj.short : current.subject) + '</span>' +
        '<span class="site-nav-title">' + escapeHtml(current.title) + '</span>';
      bar.appendChild(curWrap);
    }

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
    prevBtn.className = "site-nav-btn icon-only";
    prevBtn.innerHTML = ICON_CHEVRON_LEFT;
    prevBtn.title = prevChap ? "Précédent : " + prevChap.title : "Pas de chapitre précédent";
    if (!prevChap) prevBtn.disabled = true;
    prevBtn.addEventListener("click", function () { if (prevChap) window.location.href = prevChap.url; });
    actions.appendChild(prevBtn);

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "site-nav-btn icon-only";
    nextBtn.innerHTML = ICON_CHEVRON_RIGHT;
    nextBtn.title = nextChap ? "Suivant : " + nextChap.title : "Pas de chapitre suivant";
    if (!nextChap) nextBtn.disabled = true;
    nextBtn.addEventListener("click", function () { if (nextChap) window.location.href = nextChap.url; });
    actions.appendChild(nextBtn);

    var toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "site-nav-btn";
    toggleBtn.innerHTML = ICON_GRID + "<span>Sommaire</span>";
    toggleBtn.setAttribute("aria-expanded", "false");
    actions.appendChild(toggleBtn);

    bar.appendChild(actions);
    root.appendChild(bar);

    var panelWrap = document.createElement("div");
    panelWrap.className = "site-nav-panel-wrap";
    var panel = document.createElement("div");
    panel.className = "site-nav-panel";

    SUBJECTS.forEach(function (subj) {
      var chapters = CHAPTERS.filter(function (c) { return c.subject === subj.key; })
        .sort(function (a, b) { return (a.addedAt || "").localeCompare(b.addedAt || ""); });
      var head = document.createElement("div");
      head.className = "site-nav-col-head";
      head.style.setProperty("--subject-color", subj.color);
      head.innerHTML = '<span class="dot"></span><span>' + escapeHtml(subj.key) + '</span><span class="count">' +
        chapters.length + " chapitre" + (chapters.length === 1 ? "" : "s") + "</span>";
      panel.appendChild(head);
      if (!chapters.length) {
        var empty = document.createElement("div");
        empty.className = "site-nav-empty";
        empty.textContent = "Rien pour l'instant";
        panel.appendChild(empty);
      } else {
        chapters.forEach(function (c, i) {
          var a = document.createElement("a");
          a.className = "site-nav-link" + (c.url === currentUrl ? " is-current" : "");
          a.style.setProperty("--subject-color", subj.color);
          a.href = c.url;
          a.innerHTML = '<span class="n">' + String(i + 1).padStart(2, "0") + '</span><span>' + escapeHtml(c.title) + '</span>';
          panel.appendChild(a);
        });
      }
    });

    panelWrap.appendChild(panel);
    root.appendChild(panelWrap);
    document.body.insertBefore(root, document.body.firstChild);

    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = !panelWrap.classList.contains("is-open");
      panelWrap.classList.toggle("is-open", willOpen);
      toggleBtn.setAttribute("aria-expanded", String(willOpen));
    });
    document.addEventListener("click", function (e) {
      if (panelWrap.classList.contains("is-open") && !root.contains(e.target)) {
        panelWrap.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panelWrap.classList.contains("is-open")) {
        panelWrap.classList.remove("is-open");
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
