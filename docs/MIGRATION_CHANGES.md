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

---

# Rebranding CARITIS (branche `migration/caritis-rebrand`)

## Suppressions

| Élément supprimé | Raison | Alternative | Impact utilisateur |
| --- | --- | --- | --- |
| `src/assets/brand/rlab-one-mark.png` | Monogramme RLAB ONE | `src/assets/brand/caritis-mark.png` | Logo CARITIS dans le header et le footer |
| `public/brand/rlab-one-{icon,logo}.png`, `public/brand/og-rlab-one.png` | Assets de marque RLAB ONE | `public/brand/caritis-{icon,logo}.png`, `og-caritis.png` | Carte de partage et logo Schema.org à l'identité CARITIS |

Aucun contenu éditorial n'a été supprimé.

## Contenu déplacé, pas retiré

- Les puces de la carte **« Audit de dette technique & sobriété logicielle »**
  rejoignent la carte *Transformation & éco-conception du SI* (cartographie
  applicative, plan de remédiation chiffré, standards DevOps & CI/CD). Le sujet
  reste traité, sous un autre regroupement.
- Les puces **conformité** de l'ancienne carte « Conformité IT, gouvernance de
  l'IA & coopération » se répartissent entre *Gouvernance de l'IA* (ISO 42001,
  cartographie des usages, contrôles et preuves) et *Risque & conformité*
  (audits internes, RACI/RBAC/ITSM, RGPD/NIS2/ISO 27001).
- Le bloc **« Savoir-faire clé en Transformation SI »** du hero est conservé à
  l'identique, renommé *Socle opérationnel — direction et transformation SI*.

## Ajouts

| Changement | Détail |
| --- | --- |
| Section AIGMS sur l'accueil | `src/components/site/Aigms.tsx` — produit, cycle DISCOVERY → RE-ASSESS, statut *In development* |
| `SITE_SIGNATURE` | « Govern AI with care. », employée seule pour éviter l'empilement de slogans |
| `scripts/generate-brand-assets.mjs` | Génération reproductible des logos, favicons et carte OpenGraph |
| `docs/CARITIS_BRAND_MIGRATION.md` | Journal de la bascule de marque |

## Ce qui reste inchangé

`src/styles.css` n'a toujours pas été modifié : palette navy/emerald/gold,
typographies `Instrument Serif` / `Inter`, dégradés et utilitaires sont
identiques. Les KPI, les certifications, le parcours et les réalisations sont
conservés à l'identique — seule la ligne d'activité actuelle passe de
« Fondateur · RLAB ONE » à « Fondateur · CARITIS ».

## Ajustements demandés après relecture (2026-09-10)

| Élément supprimé | Raison | Alternative | Impact utilisateur |
| --- | --- | --- | --- |
| Frise « Parcours » de la section À propos — 6 jalons de SAP BusinessObjects à CARITIS | Contenu déjà publié sur le profil LinkedIn du dirigeant ; le dupliquer n'apporte rien | Lien « Parcours détaillé sur LinkedIn » à la place ; le paragraphe de synthèse (IBM, SAP BO, Prodware, Waspy, CARITIS) est conservé | Accueil allégé, parcours toujours accessible en un clic |

Le socle opérationnel du hero, les chiffres clés, les certifications et les puces
des cartes d'expertise ont été **conservés** : seule la frise était visée.

| Ajout | Détail |
| --- | --- |
| Section « Confiance » | `src/components/site/Partners.tsx` — Guillaume Lujan et Conquistadors.io, liens vers leurs pages LinkedIn |
| Légende du portrait | « Parcours du dirigeant : Richard Labrador » remplace le nom seul |
| Portrait | Affiché en 240 px de large au lieu de la pleine colonne ; forme, cadre et fond inchangés |
| Envoi du formulaire | Bascule sur l'API HTTP **Resend**, destinataire `contact@caritis.fr` ; le SMTP devient un repli |
| Champs obligatoires | Astérisque sur Nom, Email, Sujet et Message ; « Société (optionnel) » explicite |
