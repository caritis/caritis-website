# Plan de redirections

## Domaines CARITIS

| Source | Cible | Type | Où le configurer |
| --- | --- | --- | --- |
| `http://caritis.fr` | `https://caritis.fr` | 308 | Automatique (Vercel) |
| `www.caritis.fr` | `https://caritis.fr` | 308 | Vercel → Settings → Domains |

Objectif : une seule version indexable du site.

## Domaines RLAB ONE — décision en attente

| Source | Cible envisagée | Statut |
| --- | --- | --- |
| `rlab-one.fr` | `https://caritis.fr/` | **En attente de décision** |
| `www.rlab-one.fr` | `https://caritis.fr/` | **En attente de décision** |
| `rlab-one.eu` | `https://caritis.fr/` | **En attente de décision** |
| `www.rlab-one.eu` | `https://caritis.fr/` | **En attente de décision** |

Trois options, à trancher par Richard :

1. **Redirection 308 vers `caritis.fr`** — transfère l'antériorité SEO et évite
   deux sites concurrents. À retenir si RLAB ONE cesse d'exister comme marque.
2. **Maintien en l'état** — RLAB ONE reste en ligne le temps d'une transition.
   Dans ce cas, ajouter une mention de continuité sur rlab-one.fr plutôt que de
   laisser deux sites se cannibaliser dans l'index.
3. **Extinction sans redirection** — perte de l'antériorité ; non recommandé.

> Aucune redirection n'est activée tant que la décision n'est pas prise. Les
> domaines `rlab-one.fr` / `.eu` ne sont pas rattachés au projet Vercel CARITIS :
> les rattacher sans décision retirerait le site RLAB ONE de la production.

## Anciennes URLs détectées

| Ancienne URL | Cible recommandée | Statut |
| --- | --- | --- |
| `https://waspy.life/` | — | **Aucune redirection** — voir ci-dessous |
| `https://waspy.life/realisations` | — | **Aucune redirection** |
| `https://waspy-digital-boost.lovable.app` | `https://caritis.fr/` | Sans objet — l'aperçu Lovable n'est pas indexé comme site de production |

> `waspy.life` reste le domaine de la **réalisation** WaspTracker, distincte de
> la marque corporate CARITIS. Une redirection globale de ce domaine n'aurait de
> sens que si le site vitrine historique était réellement retiré — ce n'est pas
> le cas, et Waspy doit rester présenté comme une venture antérieure.

## Redirections internes

| Source | Cible | Raison |
| --- | --- | --- |
| `/#contact` | `/contact` | Le bloc contact est devenu une page dédiée |
| `/#case` | `/realisations` | Le bloc réalisations a quitté l'accueil |
| `/#services` | `/#expertises` | Section renommée lors du rebranding CARITIS |

Ces ancres ne renvoient jamais un code HTTP (fragments côté client) : plus aucun
lien du site ne les utilise, et un fragment inconnu se contente d'afficher le
haut de la page. Aucune règle serveur n'est nécessaire.
