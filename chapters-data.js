// Source unique des chapitres publiés. Ajoute une ligne ici pour chaque
// nouveau chapitre : la page d'accueil ET la navigation de chaque chapitre
// s'appuient sur ce même fichier.
window.SITE_CHAPTERS = [
  { subject: "Mathématiques", title: "Chapitre 1 — Ensembles, logique, méthodes de raisonnement", url: "chapitre-1-ensembles-logique.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 2 — Calcul algébrique", url: "chapitre-2-calcul-algebrique.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 3 — Applications", url: "chapitre-3-applications.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 4 — Systèmes linéaires", url: "chapitre-4-systemes-lineaires.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 5 — Relations d'ordre, relations d'équivalence", url: "chapitre-5-relations.html", addedAt: "2026-09-20" }
];

// Chaque matière a sa propre couleur et son icône pour repérer d'un coup
// d'œil de quel domaine il s'agit, sur l'accueil comme dans la navigation.
window.SITE_SUBJECTS = [
  { key: "Mathématiques", short: "MATH", slug: "maths", color: "#3B82F6", icon: "🔢" },
  { key: "Physique", short: "PHYS", slug: "physique", color: "#8B5CF6", icon: "⚛️" },
  { key: "Sciences de l'Ingénieur", short: "SI", slug: "si", color: "#D97706", icon: "⚙️" }
];
