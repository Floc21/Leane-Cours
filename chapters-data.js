// Source unique des chapitres publiés. Ajoute une ligne ici pour chaque
// nouveau chapitre : la page d'accueil ET la navigation de chaque chapitre
// s'appuient sur ce même fichier.
window.SITE_CHAPTERS = [
  { subject: "Mathématiques", title: "Chapitre 1 — Ensembles, logique, méthodes de raisonnement", url: "chapitre-1-ensembles-logique.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 2 — Calcul algébrique", url: "chapitre-2-calcul-algebrique.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 3 — Applications", url: "chapitre-3-applications.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 4 — Systèmes linéaires", url: "chapitre-4-systemes-lineaires.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 5 — Relations d'ordre, relations d'équivalence", url: "chapitre-5-relations.html", addedAt: "2026-09-20" },
  { subject: "Mathématiques", title: "Chapitre 6 — Propriétés de ℝ", url: "chapitre-6-proprietes-de-r.html", addedAt: "2026-09-27" },
  { subject: "Mathématiques", title: "Chapitre 7 — Trigonométrie", url: "chapitre-7-trigonometrie.html", addedAt: "2026-09-27" },
  { subject: "Mathématiques", title: "Chapitre 8 — Nombres complexes", url: "chapitre-8-nombres-complexes.html", addedAt: "2026-09-28" }
];

// Chapitres prévus mais pas encore rédigés, dans l'ordre de la progression
// du professeur. Quand un chapitre est publié, on retire sa ligne d'ici et
// on l'ajoute dans SITE_CHAPTERS ci-dessus.
window.SITE_UPCOMING = [
  { subject: "Mathématiques", num: 9, title: "Chapitre 9 — Structures algébriques" },
  { subject: "Mathématiques", num: 10, title: "Chapitre 10 — Fonctions usuelles et généralités" },
  { subject: "Mathématiques", num: 11, title: "Chapitre 11 — Dérivation" },
  { subject: "Mathématiques", num: 12, title: "Chapitre 12 — Primitives et intégrales" },
  { subject: "Mathématiques", num: 13, title: "Chapitre 13 — Équations différentielles linéaires du premier ordre" },
  { subject: "Mathématiques", num: 14, title: "Chapitre 14 — Équations différentielles linéaires du second ordre" },
  { subject: "Mathématiques", num: 15, title: "Chapitre 15 — Sommes doubles" },
  { subject: "Mathématiques", num: 16, title: "Chapitre 16 — Suites" },
  { subject: "Mathématiques", num: 17, title: "Chapitre 17 — Limites et continuité" },
  { subject: "Mathématiques", num: 18, title: "Chapitre 18 — Dérivabilité" },
  { subject: "Mathématiques", num: 19, title: "Chapitre 19 — Convexité" },
  { subject: "Mathématiques", num: 20, title: "Chapitre 20 — Calcul matriciel" },
  { subject: "Mathématiques", num: 21, title: "Chapitre 21 — Arithmétique" },
  { subject: "Mathématiques", num: 22, title: "Chapitre 22 — Polynômes et fractions rationnelles" },
  { subject: "Mathématiques", num: 23, title: "Chapitre 23 — Analyse asymptotique" },
  { subject: "Mathématiques", num: 24, title: "Chapitre 24 — Espaces vectoriels" },
  { subject: "Mathématiques", num: 25, title: "Chapitre 25 — Applications linéaires" },
  { subject: "Mathématiques", num: 26, title: "Chapitre 26 — Matrices d'applications linéaires" },
  { subject: "Mathématiques", num: 27, title: "Chapitre 27 — Déterminants" },
  { subject: "Mathématiques", num: 28, title: "Chapitre 28 — Intégration" },
  { subject: "Mathématiques", num: 29, title: "Chapitre 29 — Dénombrement" },
  { subject: "Mathématiques", num: 30, title: "Chapitre 30 — Probabilités sur un univers fini" },
  { subject: "Mathématiques", num: 31, title: "Chapitre 31 — Variables aléatoires" },
  { subject: "Mathématiques", num: 32, title: "Chapitre 32 — Espaces préhilbertiens réels" },
  { subject: "Mathématiques", num: 33, title: "Chapitre 33 — Séries numériques" },
  { subject: "Mathématiques", num: 34, title: "Chapitre 34 — Fonctions de deux variables" },
  { subject: "Mathématiques", num: 35, title: "Chapitre 35 — Familles sommables" }
];

// Chaque matière a sa propre couleur et son icône pour repérer d'un coup
// d'œil de quel domaine il s'agit, sur l'accueil comme dans la navigation.
window.SITE_SUBJECTS = [
  { key: "Mathématiques", short: "MATH", slug: "maths", color: "#3B82F6", icon: "🔢" },
  { key: "Physique", short: "PHYS", slug: "physique", color: "#8B5CF6", icon: "⚛️" },
  { key: "Sciences de l'Ingénieur", short: "SI", slug: "si", color: "#D97706", icon: "⚙️" }
];
