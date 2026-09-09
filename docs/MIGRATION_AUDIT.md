# Audit de migration — Lovable/Cloudflare → Vercel

Date : 2026-09-09 · Dépôt : `rlab-one/waspy-digital-boost`

## Runtime initial

- TanStack Start `1.167` + TanStack Router `1.168`, React 19, Vite 7, Tailwind 4.
- `vite.config.ts` déléguait toute la configuration à `@lovable.dev/vite-tanstack-config`,
  preset qui embarque **le plugin Cloudflare** (`@cloudflare/vite-plugin`), le
  `componentTagger` Lovable et la détection de sandbox.
- Point d'entrée serveur `src/server.ts` : handler `fetch(request, env, ctx)` de
  forme Workers, désigné par `wrangler.jsonc` (`main: src/server.ts`).
- Gestionnaire de paquets : Bun (`bun.lock`, `bunfig.toml`).

## Dépendances Lovable

| Élément | Statut |
| --- | --- |
| `@lovable.dev/vite-tanstack-config` | Retiré — remplacé par une configuration Vite explicite |
| `.lovable/` (plan.md, project.json) | Retiré |
| `src/assets/*.asset.json` | Retiré — pointaient vers `/__l5e/assets-v1/…`, URLs servies uniquement par l'infrastructure Lovable |
| `bunfig.toml` → `minimumReleaseAgeExcludes` | Exception supply-chain devenue inutile, retirée |

**Point critique** : le logo RLAB ONE du header et du footer était chargé depuis
un `.asset.json` Lovable. Hors de Lovable, ces URLs renvoient 404 — le logo
n'apparaissait donc pas sur un déploiement Vercel.

## Dépendances Cloudflare

| Élément | Statut |
| --- | --- |
| `@cloudflare/vite-plugin` | Retiré des dépendances |
| `wrangler.jsonc` | Supprimé |
| `src/server.ts` (wrapper `fetch` Workers) | Supprimé — Nitro fournit l'entrée serveur ; la page d'erreur brandée reste servie par le middleware de `src/start.ts` |
| `worker-mailer` (SMTP pour Workers) | Retiré — Nodemailer suffit en runtime Node.js |

## Supabase

Analyse de `src/integrations/supabase/` et `supabase/config.toml` :

- `types.ts` déclare `Tables: { [_ in never]: never }` — **aucune table**, aucune
  vue, aucune fonction, aucun enum.
- Aucun composant ni route n'importe le client Supabase.
- Seul point de contact : `attachSupabaseAuth`, middleware global enregistré dans
  `src/start.ts`, qui appelait `supabase.auth.getSession()` avant chaque server
  function — et qui aurait donc **jeté une exception en production** faute de
  variables `SUPABASE_*` définies sur Vercel.
- `previewAuthStorage.ts` : passerelle `postMessage` réservée aux domaines de
  prévisualisation Lovable (`lovable.app`, `gpt-eng.com`…), sans objet hors Lovable.

**Conclusion : Supabase n'était pas utilisé fonctionnellement.** L'intégration a
été retirée (voir `MIGRATION_CHANGES.md`). Aucune donnée n'est perdue : il n'y
avait pas de schéma.

## Fonctions serveur

- `src/lib/contact.functions.ts` — `createServerFn({ method: "POST" })`, validation
  Zod, envoi SMTP via Nodemailer. Nécessite un **runtime Node.js** (`net`/`tls`).
- `src/routes/sitemap[.]xml.ts` — handler `GET` générant le sitemap.

## Formulaire de contact

État initial :

- destinataire **en dur dans le code source** (`const RECIPIENT = "…@outlook.fr"`) ;
- pas de honeypot, pas de limitation de débit ;
- corps de message et objet référençant `waspy.life`.

## Routes

| Route | Avant | Après |
| --- | --- | --- |
| `/` | Hero, EFC, Services, **Réalisations**, Parcours, **Contact** | Hero, EFC, Services, Parcours |
| `/realisations` | WaspTracker · Howner · AIGMS | Inchangé (CTA harmonisés, SEO corrigé) |
| `/contact` | — | **Nouvelle page dédiée** |
| `/sitemap.xml` | 2 URLs `waspy.life` | 3 URLs `rlab-one.fr` |

## Variables d'environnement

`.env` **était versionné dans Git**. Contenu : `SUPABASE_PROJECT_ID`,
`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` et leurs équivalents `VITE_*`.

Ce sont des identifiants **publics** au sens du modèle Supabase (clé
*publishable* / anon, destinée au navigateur). **Aucune clé `service_role`,
aucun mot de passe SMTP, aucun token OAuth n'a été versionné.**

Actions menées :

1. `.env` retiré du suivi Git (`git rm --cached`) ;
2. `.gitignore` complété (`.env`, `.env.*`, `.vercel`) ;
3. `.env.example` créé avec les seuls noms de variables ;
4. l'intégration Supabase étant supprimée, ces identifiants ne sont plus utilisés.

> Recommandation : le projet Supabase associé n'ayant aucun schéma ni usage, il
> peut être supprimé côté Supabase. Aucune rotation de secret n'est requise, la
> clé exposée étant publique par conception. Les valeurs restent néanmoins
> présentes dans l'historique Git : ne pas les réutiliser pour un projet privé.

## Risques de migration identifiés

| Risque | Traitement |
| --- | --- |
| Plugin Cloudflare incompatible avec la sortie Vercel | Configuration Vite explicite `tanstackStart() + nitro() + viteReact()` |
| Logos servis par des URLs Lovable → images cassées | Logos importés comme assets du dépôt (`src/assets/brand/`, `public/brand/`) |
| Middleware Supabase levant une exception sur toute server function | Intégration retirée |
| Nodemailer incompatible avec un runtime Edge | Runtime Node.js conservé, documenté dans `README_DEPLOY.md` |
| Canonical / OpenGraph pointant vers `waspy.life` | Centralisés dans `src/lib/site.ts` (`https://rlab-one.fr`) |
| Adresse email personnelle dans le bundle | Déplacée dans `CONTACT_TO_EMAIL` (variable serveur) |

## Plan de migration retenu

1. Sécurisation de l'environnement (`.env`, `.gitignore`, `.env.example`).
2. Retrait Lovable / Cloudflare / Supabase, configuration Vite standard.
3. Intégration des logos réels et des favicons RLAB ONE.
4. Réorganisation éditoriale : accueil allégé, `/realisations` et `/contact` séparées.
5. Harmonisation des CTA (composant partagé).
6. SEO production `rlab-one.fr` (canonical, OpenGraph, sitemap, robots, `lang="fr"`).
7. Durcissement du formulaire (honeypot, limitation de débit, destinataire en variable).
8. `lint` + `build` locaux, puis déploiement Vercel sur la branche de production.
