# Déploiement Vercel — RLAB ONE

## État actuel

| Élément | Statut |
| --- | --- |
| Projet Vercel | **`rlab-one`** (équipe `richard-2575's projects`) — créé |
| Déploiement production | **En ligne** — https://rlab-one.vercel.app |
| Branche de production | `main` (dépôt `rlab-one/waspy-digital-boost`) |
| Connexion Git automatique | ⚠️ **À autoriser** — voir §1 |
| Variables SMTP | ⚠️ **À créer** — voir §3 |
| Domaines `rlab-one.fr` / `.eu` | ⚠️ **À rattacher** — voir §4 |

Tant que les variables SMTP ne sont pas renseignées, le formulaire de contact
répond « Le service d'envoi n'est pas configuré. » ; le reste du site fonctionne.

## 1. Connexion du dépôt GitHub

Le projet Vercel a été créé, mais la liaison automatique au dépôt a échoué :

```text
You need admin or write access to the repository "waspy-digital-boost" to link it.
```

L'application GitHub de Vercel n'est pas autorisée sur l'organisation `rlab-one`.
Pour activer les déploiements automatiques à chaque `git push` sur `main` :

1. https://github.com/organizations/rlab-one/settings/installations
   → **Vercel** → *Configure* → autoriser le dépôt `waspy-digital-boost`
   (ou installer l'application Vercel sur l'organisation si elle est absente).
2. Vercel → projet `rlab-one` → *Settings* → *Git* → **Connect Git Repository**
   → `rlab-one/waspy-digital-boost`, branche de production `main`.

En attendant, un déploiement production se lance depuis le poste local :

```sh
vercel deploy --prod --yes
```

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
  dans le HTML servi au navigateur.
- `SMTP_FROM` : expéditeur affiché ; doit être autorisé par le fournisseur SMTP.
  À défaut, `SMTP_USER` est utilisé.
- Sans ces variables, le formulaire renvoie « Le service d'envoi n'est pas
  configuré. » — le reste du site fonctionne normalement.

Le runtime des Server Functions est **Node.js** (Nodemailer nécessite `net`/`tls`,
indisponibles en runtime Edge). Ne pas basculer le projet en Edge Runtime.

## 4. Domaines

Les domaines `rlab-one.fr` et `rlab-one.eu` ne sont pas encore rattachés au
compte Vercel (seuls `howner.fr`, `affinityhouse.fr`, `affinityhome.fr` et
`affinityhousefactory.com` y figurent).

`Project → Settings → Domains` :

1. Ajouter `rlab-one.fr` → **Primary domain** (production).
2. Ajouter `www.rlab-one.fr` → configurer en **Redirect to `rlab-one.fr`** (308).
3. Ajouter `rlab-one.eu` et `www.rlab-one.eu` → **Redirect to `rlab-one.fr`** (308).

Puis, chez le registrar / fournisseur DNS, reporter **exactement** les valeurs
affichées par Vercel dans cet écran (enregistrement `A` pour l'apex, `CNAME` pour
le `www`). Ne pas utiliser de valeurs mémorisées ou supposées : Vercel indique
les cibles à jour pour chaque domaine, et elles peuvent différer d'un domaine à
l'autre.

Une fois `rlab-one.fr` défini comme domaine principal, aucune modification de
code n'est nécessaire : les URLs canoniques, OpenGraph et le sitemap pointent
déjà vers `https://rlab-one.fr` (constante `SITE_URL` dans `src/lib/site.ts`).

Vérifications après propagation :

- [ ] `http://rlab-one.fr` → `https://rlab-one.fr` (301/308)
- [ ] `https://www.rlab-one.fr` → `https://rlab-one.fr` (308)
- [ ] `https://rlab-one.eu` → `https://rlab-one.fr` (308)
- [ ] Certificat TLS émis pour les quatre entrées

## 5. Contrôles post-déploiement

Sur le déploiement actuel (`https://rlab-one.vercel.app`), ces contrôles sont
déjà passés — hormis l'envoi réel du formulaire, qui attend les variables SMTP.

```text
/                    page d'accueil (hero, services, parcours)
/realisations        WaspTracker · Howner · AIGMS
/contact             formulaire (test d'envoi réel)
/sitemap.xml         3 URLs en https://rlab-one.fr
/robots.txt          Sitemap: https://rlab-one.fr/sitemap.xml
/llms.txt
/favicon-32.png      favicon RLAB ONE
/brand/og-rlab-one.png   image OpenGraph 1200×630
une URL inexistante  page 404 personnalisée
```

Vérifier aussi le rendu à 390 px, 768 px et 1440 px, ainsi que la carte
OpenGraph via un validateur de partage social.

## 6. Rollback

`Project → Deployments` → sélectionner le déploiement précédent →
`Promote to Production` (aucune reconstruction nécessaire).
