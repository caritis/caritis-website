# Déploiement Vercel — CARITIS

## État actuel

| Élément | Statut |
| --- | --- |
| Dépôt GitHub | **`caritis/caritis-website`** — créé, public, branche `main` |
| Organisation GitHub `caritis` | Créée ; compte `rlabrador` administrateur |
| Application GitHub de Vercel | Installée sur l'organisation, en mode *selected repositories* — ⚠️ voir §1 |
| Projet Vercel | ⚠️ **À créer** — ne jamais réutiliser le projet `rlab-one` |
| Déploiement | **Aucun** à ce jour |
| Variables SMTP | ⚠️ **À créer** — voir §3 |
| Domaine `caritis.fr` | ⚠️ **À rattacher** — voir §4 |

Rien n'est déployé : ce document décrit la procédure, il ne constate pas un
déploiement existant.

Tant que les variables SMTP ne sont pas renseignées, le formulaire de contact
répond « Le service d'envoi n'est pas configuré. » ; le reste du site fonctionne.

## 1. Connexion du dépôt GitHub

L'application GitHub de Vercel est installée sur l'organisation `caritis`, mais
avec `repository_selection: selected` : elle ne voit que les dépôts explicitement
cochés. Tant que `caritis-website` n'y figure pas, l'import Vercel échoue avec le
même message que sur RLAB ONE :

```text
You need admin or write access to the repository "caritis-website" to link it.
```

1. https://github.com/organizations/caritis/settings/installations
   → **Vercel** → *Configure* → cocher le dépôt `caritis-website`.
2. Vercel → *Add New Project* → importer `caritis/caritis-website`,
   branche de production `main`.

Créer un **nouveau** projet. Réutiliser le projet `rlab-one` ferait qu'un
déploiement CARITIS écrase le site rlab-one.fr en production.

## 2. Réglages du projet

| Réglage | Valeur |
| --- | --- |
| Framework Preset | **Other** (détection Vite/Nitro automatique) |
| Build Command | `bun run build` (ou laisser la valeur détectée) |
| Install Command | `bun install` |
| Output Directory | **laisser vide** — Nitro produit `.vercel/output` (Build Output API) |
| Node.js Version | 22.x |
| Production Branch | `main` |

> Ne pas forcer d'Output Directory : le site est rendu côté serveur (SSR).
> Nitro détecte l'environnement Vercel au build et génère automatiquement la
> sortie Build Output API avec une fonction serverless Node.js.

## 3. Variables d'environnement

À créer dans `Project → Settings → Environment Variables`, scope **Production**
(et *Preview* si vous voulez tester le formulaire sur les previews).
**Noms uniquement — ne jamais committer les valeurs.**

```text
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
SMTP_FROM
CONTACT_TO_EMAIL
```

- `CONTACT_TO_EMAIL` : adresse de réception des messages. Elle n'apparaît jamais
  dans le HTML servi au navigateur. L'organisation publie `contact@caritis.fr`.
- `SMTP_FROM` : expéditeur affiché ; doit être autorisé par le fournisseur SMTP.
  À défaut, `SMTP_USER` est utilisé. Les messages partent sous l'identité
  « CARITIS — Formulaire de contact » (dérivée de `SITE_NAME`).
- Sans ces variables, le formulaire renvoie « Le service d'envoi n'est pas
  configuré. » — le reste du site fonctionne normalement.

Le runtime des Server Functions est **Node.js** (Nodemailer nécessite `net`/`tls`,
indisponibles en runtime Edge). Ne pas basculer le projet en Edge Runtime.

## 4. Domaine

`caritis.fr` est le domaine de production retenu. `Project → Settings → Domains` :

1. Ajouter `caritis.fr` → **Primary domain** (production).
2. Ajouter `www.caritis.fr` → configurer en **Redirect to `caritis.fr`** (308).

Puis, chez le registrar / fournisseur DNS, reporter **exactement** les valeurs
affichées par Vercel dans cet écran (enregistrement `A` pour l'apex, `CNAME` pour
le `www`). Ne pas utiliser de valeurs mémorisées ou supposées : Vercel indique
les cibles à jour pour chaque domaine, et elles peuvent différer d'un domaine à
l'autre.

Aucune modification de code n'est nécessaire : les URLs canoniques, OpenGraph et
le sitemap pointent déjà vers `https://caritis.fr` (constante `SITE_URL` dans
`src/lib/site.ts`). Seul `public/robots.txt` répète le domaine en dur, le fichier
étant statique.

Le sort de `rlab-one.fr` et `rlab-one.eu` est traité dans
[`docs/REDIRECT_PLAN.md`](./docs/REDIRECT_PLAN.md) — aucune redirection n'est
activée sans décision explicite.

Vérifications après propagation :

- [ ] `http://caritis.fr` → `https://caritis.fr` (301/308)
- [ ] `https://www.caritis.fr` → `https://caritis.fr` (308)
- [ ] Certificat TLS émis pour les deux entrées

## 5. Contrôles post-déploiement

À passer sur l'URL de préversion **avant** toute promotion en production :

```text
/                      accueil : hero, AIGMS, expertises, EFC, parcours
/realisations          WaspTracker · Howner · AIGMS
/contact               formulaire (test d'envoi réel)
/sitemap.xml           3 URLs en https://caritis.fr
/robots.txt            Sitemap: https://caritis.fr/sitemap.xml
/llms.txt
/favicon-32.png        favicon CARITIS
/brand/og-caritis.png  image OpenGraph 1200×630
une URL inexistante    page 404 personnalisée
```

Vérifier aussi le rendu à 390 px, 768 px et 1440 px, ainsi que la carte
OpenGraph via un validateur de partage social.

## 6. Rollback

`Project → Deployments` → sélectionner le déploiement précédent →
`Promote to Production` (aucune reconstruction nécessaire).
