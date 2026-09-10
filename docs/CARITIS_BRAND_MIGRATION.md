# Migration de marque RLAB ONE → CARITIS

Bascule de l'identité corporate menée sur la branche `migration/caritis-rebrand`
du dépôt `caritis/caritis-website`. Le code provient de
`rlab-one/waspy-digital-boost` et son historique Git est conservé.

## Principe

C'est **l'identité corporate** qui change, pas la couche métier. Aucun contenu
d'expertise, aucun chiffre et aucune réalisation n'a été supprimé.

| | Avant | Après |
| --- | --- | --- |
| Marque | RLAB ONE | CARITIS |
| Signature | Technology · Governance · Transformation | Responsible AI Governance |
| Signature de marque | — | Govern AI with care. |
| Domaine | rlab-one.fr | caritis.fr |
| Produit | AIGMS, présenté comme projet | AIGMS — AI Governance Management System **by CARITIS** |
| Ventures | Waspy, Howner | inchangés — réalisations antérieures |

## Philosophie de marque

CARITIS se lit comme un rétro-acronyme — **C**are, **A**ccountability,
**R**esponsibility, **I**ntegrity, **T**rust, **I**mpact, **S**ustainability —
et non comme une étymologie. Ce cadre n'est pas affiché tel quel sur le site :
il oriente le ton, pas la mise en page.

## Ce qui a changé dans le code

| Élément | Fichier |
| --- | --- |
| Nom, signature, URL canonique | `src/lib/site.ts` — `SITE_NAME`, `SITE_TAGLINE`, `SITE_URL`, `SITE_SIGNATURE` |
| Wordmark, navigation, copyright | `src/components/site/Header.tsx`, `Footer.tsx` |
| Positionnement d'accueil | `src/components/site/Hero.tsx` |
| Section produit | `src/components/site/Aigms.tsx` *(nouveau)* |
| Domaines d'expertise | `src/components/site/Services.tsx` |
| Ligne d'activité actuelle | `src/components/site/About.tsx` |
| Métadonnées, OpenGraph, JSON-LD | `src/routes/__root.tsx`, `index.tsx`, `contact.tsx`, `realisations.tsx` |
| Textes hors application | `public/robots.txt`, `public/llms.txt`, `README.md`, `README_DEPLOY.md` |
| Assets de marque | `src/assets/brand/`, `public/brand/`, `public/favicon-*.png`, `public/apple-touch-icon.png` |

Ancres renommées : `#services` devient `#expertises`, `#aigms` est ajoutée.

## Architecture éditoriale de l'accueil

Ordre retenu, conforme au cahier des charges :

1. **Hero** — Responsible AI Governance, CTA vers AIGMS / expertises / contact,
   socle opérationnel SI, KPI, certifications ;
2. **AIGMS** — produit, cycle de management, statut *In development* ;
3. **Expertises** — Gouvernance de l'IA · Risque & conformité · Transformation &
   éco-conception du SI · IA responsable & frugale ;
4. **EFC** — bandeau de définition ;
5. **Parcours** — portrait et jalons, de SAP BusinessObjects à CARITIS.

## Identité visuelle

Les **typographies sont conservées** — `Instrument Serif` pour les titres,
`Inter` pour le texte — ainsi que le logo. La **palette, elle, a basculé en
thème clair** le 2026-09-10, sur décision de Richard : « le fond noir n'est pas
percutant ». Cela s'écarte du §15 du cahier des charges, qui demandait de
préserver l'univers dark premium de RLAB ONE ; l'arbitrage appartient au
commanditaire.

| Token | Valeur | Rôle |
| --- | --- | --- |
| `--background` | `#fafcfe` | fond de page |
| `--card` | `#ffffff` | cartes et formulaires |
| `--surface` | `#f1f6fa` | bandes de section alternées |
| `--foreground` | `#0c2036` | encre navy |
| `--muted-foreground` | `#4b5c6b` | texte secondaire (6,8:1 sur le fond) |
| `--primary` | `#00787d` | teal du monogramme : eyebrows, icônes, focus |
| `--cta` | `#0c2036` | bouton principal, navy plein |
| `--header` | `#016287` | bandeau de navigation, lettrage blanc (6,9:1) |
| `--accent` | `#a15c07` | ambre : statuts (« In development ») |
| `--border` / `--input` | `#dde4ea` / `#cbd6e0` | filets et champs |

`src/assets/hero-bg.jpg` a été supprimé : cette image noire, pensée pour le
thème sombre, devenait un rectangle opaque sur fond clair.

Le logo CARITIS — monogramme circulaire de **sept** silhouettes reliées,
wordmark géométrique — remplace les images RLAB ONE. Le wordmark source étant
gris-bleu foncé sur fond blanc, il est **détouré** (luminance convertie en canal
alpha) puis reteinté : navy pour les fonds clairs du site, near-white pour les
fonds sombres. Il n'est jamais redessiné.
`scripts/generate-brand-assets.mjs` reproduit l'opération depuis `logos/new/`.

| Asset | Rôle |
| --- | --- |
| `src/assets/brand/caritis-mark.png` | monogramme d'interface (header, footer) |
| `public/brand/caritis-icon.png` | icône carrée 512 px sur fond clair, logo Schema.org |
| `public/brand/caritis-logo.png` | verrouillage horizontal, wordmark navy, fond transparent |
| `public/brand/caritis-wordmark-light.png` | wordmark near-white pour fonds sombres |
| `public/brand/og-caritis.png` | carte OpenGraph 1200×630, fond clair |
| `public/favicon-{32,192,512}.png`, `public/apple-touch-icon.png` | favicons, fond navy |

## Ce qui est délibérément préservé

- les KPI (20+ ans, 150+ utilisateurs, 3 pays, 1,5 M€) et les certifications,
  inchangés faute de nouvelle source ;
- le parcours professionnel complet — seule la ligne d'activité actuelle passe
  de « Fondateur · RLAB ONE » à « Fondateur · CARITIS » ;
- Waspy / WaspTracker et Howner comme réalisations ;
- la profondeur transformation SI, EFC et sobriété numérique ;
- les typographies et les primitives shadcn/ui.

## Ce qui reste à faire

- [ ] créer le projet Vercel et déployer une préversion (`README_DEPLOY.md`) ;
- [ ] rattacher `caritis.fr` ;
- [ ] trancher le sort de `rlab-one.fr` / `.eu` (`docs/REDIRECT_PLAN.md`) ;
- [ ] vérifier le rendu à 390 / 768 / 1440 px sur la préversion ;
- [ ] valider la carte OpenGraph via un validateur de partage social.
