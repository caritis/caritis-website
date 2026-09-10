import { SITE_URL } from "./site";

/**
 * Fil d'Ariane structuré. Chaque page projet en pose un : c'est ce qui permet
 * aux moteurs de rattacher les pages filles à /realisations plutôt que de les
 * traiter comme des pages isolées.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  });
}
