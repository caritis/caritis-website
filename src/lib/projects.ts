/**
 * Les trois réalisations, chacune sur sa propre page pour être indexable
 * séparément. Source unique : le bandeau, la page d'index et le sitemap en
 * dépendent.
 */
export const projects = [
  {
    to: "/realisations/wasptracker",
    name: "WaspTracker",
    tag: "SaaS · Environnement",
    summary:
      "Plateforme SaaS et service pour les collectivités et les entreprises spécialisées dans la lutte contre le frelon asiatique.",
  },
  {
    to: "/realisations/howner",
    name: "Howner",
    tag: "Industrie · ERP/MRP",
    summary:
      "Structuration du système d'information d'une activité de fabrication hors-site, puis architecture technique, backend et agents IA de la plateforme.",
  },
  {
    to: "/realisations/aigms",
    name: "AIGMS",
    tag: "Gouvernance IA · ISO 42001",
    summary:
      "Le registre unique des usages d'IA : leurs risques, les décisions qui les autorisent, les contrôles qui les encadrent et les preuves qui le démontrent.",
  },
] as const;
