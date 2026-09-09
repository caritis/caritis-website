# RLAB ONE — site corporate

Site officiel de **RLAB ONE** — *Technology · Governance · Transformation*.

- Production : https://rlab-one.fr
- Domaine secondaire : https://rlab-one.eu (redirection permanente vers `.fr`)

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
  components/site/ # Header, Hero, Services, About, Contact, Footer, Cta
  components/ui/   # primitives shadcn/ui
  lib/             # site.ts (constantes), contact.functions.ts (server fn)
  assets/brand/    # monogramme RLAB ONE utilisé dans l'UI
public/
  brand/           # logo, icône, image OpenGraph
  favicon-*.png    # favicons
```

## Déploiement

Voir [`README_DEPLOY.md`](./README_DEPLOY.md).
