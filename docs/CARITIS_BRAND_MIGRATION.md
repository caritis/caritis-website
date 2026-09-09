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

Le design system est **conservé** : navy profond, emerald, warm gold,
`Instrument Serif` pour les titres, `Inter` pour le texte. `src/styles.css` n'a
pas été modifié.

Le logo CARITIS — monogramme circulaire de six silhouettes reliées, wordmark
géométrique — remplace les images RLAB ONE. Le wordmark source étant gris-bleu
foncé sur fond blanc, il est **détouré** (luminance convertie en canal alpha)
puis recolorisé en near-white pour rester lisible sur le fond sombre : il n'est
jamais redessiné. `scripts/generate-brand-assets.mjs` reproduit l'opération.

| Asset | Rôle |
| --- | --- |
| `src/assets/brand/caritis-mark.png` | monogramme d'interface (header, footer) |
| `public/brand/caritis-icon.png` | icône carrée 512 px, logo Schema.org |
| `public/brand/caritis-logo.png` | verrouillage horizontal sur fond transparent |
| `public/brand/og-caritis.png` | carte OpenGraph 1200×630 |
| `public/favicon-{32,192,512}.png`, `public/apple-touch-icon.png` | favicons |

## Ce qui est délibérément préservé

- les KPI (20+ ans, 150+ utilisateurs, 3 pays, 1,5 M€) et les certifications,
  inchangés faute de nouvelle source ;
- le parcours professionnel complet — seule la ligne d'activité actuelle passe
  de « Fondateur · RLAB ONE » à « Fondateur · CARITIS » ;
- Waspy / WaspTracker et Howner comme réalisations ;
- la profondeur transformation SI, EFC et sobriété numérique ;
- le design system et les primitives shadcn/ui.

## Ce qui reste à faire

- [ ] créer le projet Vercel et déployer une préversion (`README_DEPLOY.md`) ;
- [ ] rattacher `caritis.fr` ;
- [ ] trancher le sort de `rlab-one.fr` / `.eu` (`docs/REDIRECT_PLAN.md`) ;
- [ ] vérifier le rendu à 390 / 768 / 1440 px sur la préversion ;
- [ ] valider la carte OpenGraph via un validateur de partage social.
