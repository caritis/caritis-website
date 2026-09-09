# CARITIS — site corporate

Site officiel de **CARITIS** — *Responsible AI Governance*. « Govern AI with care. »

- Production : https://caritis.fr (à rattacher — voir `README_DEPLOY.md`)
- Dépôt : https://github.com/caritis/caritis-website
- Origine du code : `rlab-one/waspy-digital-boost`, historique Git conservé

## Stack

| Élément | Choix |
| --- | --- |
| Framework | TanStack Start (React 19, SSR) |
| Bundler | Vite 7 |
| Serveur | Nitro (runtime Node.js) |
| Styles | Tailwind CSS 4 + Radix UI |
| Formulaire | Server Function TanStack + Zod + Nodemailer (SMTP) |
| Hébergement | Vercel — branche de production `main` |

## Développement

Le projet utilise **Bun**.

```sh
bun install
bun run dev      # http://localhost:3000
bun run lint
bun run build    # sortie .output (Node) ou .vercel/output (sur Vercel)
bun run start    # sert le build Node local
```

Copier `.env.example` vers `.env` et renseigner les variables SMTP pour tester le
formulaire de contact en local. **`.env` n'est jamais versionné.**

## Structure

```text
src/
  routes/          # /, /contact, /realisations, /sitemap.xml
  components/site/ # Header, Hero, Aigms, Services, EfcBanner, About, Contact, Footer, Cta
  components/ui/   # primitives shadcn/ui
  lib/             # site.ts (constantes), contact.functions.ts (server fn)
  assets/brand/    # monogramme CARITIS utilisé dans l'UI
public/
  brand/           # logo, icône, image OpenGraph
  favicon-*.png    # favicons
scripts/
  generate-brand-assets.mjs  # régénère logos, favicons et carte OpenGraph
```

Le nom de marque, la signature et l'URL canonique sont centralisés dans
`src/lib/site.ts` : c'est le seul endroit à modifier pour changer de domaine.

## Marque

L'identité corporate est CARITIS. **AIGMS** est le produit stratégique — « AIGMS —
AI Governance Management System by CARITIS » — et non la raison sociale.
**Waspy / WaspTracker** et **Howner** restent des réalisations et ventures
antérieures : ils ne sont jamais présentés comme des marques CARITIS.

Détail de la bascule : [`docs/CARITIS_BRAND_MIGRATION.md`](./docs/CARITIS_BRAND_MIGRATION.md).

## Déploiement

Voir [`README_DEPLOY.md`](./README_DEPLOY.md).
