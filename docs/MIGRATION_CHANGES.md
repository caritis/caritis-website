# Journal des suppressions et changements

## Suppressions

| Élément supprimé | Raison | Alternative | Impact utilisateur |
| --- | --- | --- | --- |
| `@lovable.dev/vite-tanstack-config` | Preset propriétaire embarquant le plugin Cloudflare, incompatible avec la sortie Vercel | `vite.config.ts` explicite : `tsConfigPaths + tailwindcss + tanstackStart + nitro + viteReact` | Aucun |
| `@cloudflare/vite-plugin`, `wrangler.jsonc` | Cible Cloudflare Workers non utilisée | Nitro (runtime Node.js sur Vercel) | Aucun |
| `src/server.ts` | Wrapper `fetch(request, env, ctx)` propre au runtime Workers | Entrée serveur Nitro par défaut ; la page d'erreur brandée reste servie par le middleware de `src/start.ts` | Aucun — page d'erreur conservée |
| `src/lib/error-capture.ts` | Utilisé uniquement par `src/server.ts` | — | Aucun |
| `worker-mailer` | Client SMTP pour Workers | Nodemailer (déjà présent) | Aucun |
| `src/integrations/supabase/**`, `supabase/config.toml`, `@supabase/supabase-js` | Aucune table, aucune vue, aucun usage métier ; le middleware global aurait fait échouer toutes les server functions faute de variables `SUPABASE_*` sur Vercel | — | Aucun — aucune fonctionnalité ne s'appuyait dessus |
| `.lovable/` | Métadonnées de l'éditeur Lovable | — | Aucun |
| `src/assets/rlabone-{mark,wordmark}.png.asset.json` | Pointaient vers `/__l5e/assets-v1/…`, servi uniquement par Lovable → **logo cassé hors Lovable** | PNG réels dans `src/assets/brand/` et `public/brand/` | **Correction** : le logo s'affiche |
| `src/components/site/CaseStudy.tsx` | Composant orphelin (remplacé par la page `/realisations`) | `/realisations` | Aucun |
| `src/components/site/CaseStudyTeaser.tsx` | Bloc réalisations retiré de l'accueil (demande client) | Page `/realisations`, accessible par le menu et un CTA du hero | Accueil allégé |
| `public/favicon.png` | Ancien favicon | `favicon-32/192/512.png`, `apple-touch-icon.png` RLAB ONE | **Correction** : favicon de marque |
| `bunfig.toml` → `minimumReleaseAgeExcludes` | Exception supply-chain pour le paquet Lovable, devenue sans objet | Garde de 24 h conservée pour tous les paquets | Aucun |

## Contenu retiré de la page d'accueil

- **Bloc « Réalisations »** (`CaseStudyTeaser`) : retiré à la demande du client.
  Le contenu n'est pas perdu — il vit en entier sur `/realisations`, atteignable
  depuis le menu, le pied de page et un CTA du hero.
- **Bloc « Contact »** : déplacé sur la page dédiée `/contact`. Le formulaire est
  identique, enrichi d'un honeypot et d'une limitation de débit.

Aucun texte métier n'a été supprimé : services, EFC, parcours, certifications,
chiffres et réalisations sont conservés à l'identique.

## Ajouts et corrections

| Changement | Détail |
| --- | --- |
| Page `/contact` | Nouvelle route dédiée, formulaire + engagements de réponse + lien LinkedIn |
| CTA harmonisés | `src/components/site/Cta.tsx` — hauteur, rayon, typographie et anneau de focus communs à tous les boutons du site (hero, réalisations, contact, header) |
| Logos | Monogramme transparent dans l'UI, badge sombre en favicon, logo horizontal et image OpenGraph 1200×630 dans `public/brand/` |
| SEO | `src/lib/site.ts` centralise `https://rlab-one.fr` ; canonical, OpenGraph, Twitter Card, JSON-LD Organization/WebSite, `lang="fr"`, `theme-color` |
| Sitemap | 3 URLs (`/`, `/realisations`, `/contact`) sur `rlab-one.fr` |
| `robots.txt`, `llms.txt` | Réécrits pour RLAB ONE |
| Pages 404 / 500 | Traduites en français |
| Formulaire | Destinataire via `CONTACT_TO_EMAIL`, honeypot, limitation à 3 messages / 10 min par IP, `aria-live` sur le statut, `autoComplete` sur les champs |
| Parcours | Ajout du jalon « Fondateur · RLAB ONE » ; Waspy conservé comme réalisation |
| Sécurité | `.env` retiré du suivi Git, `.gitignore` complété, `.env.example` créé |

## Ce qui reste inchangé

Le design system (`src/styles.css`) n'a pas été touché : palette navy/emerald/gold,
typographies `Instrument Serif` / `Inter`, dégradés, ombres et utilitaires
(`bg-hero`, `text-gradient`, `ring-glow`, `shadow-elev`) sont identiques.
Les primitives `src/components/ui/**` (shadcn/ui) sont conservées telles quelles.
