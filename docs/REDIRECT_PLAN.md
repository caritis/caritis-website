# Plan de redirections

## Domaines

| Source | Cible | Type | Où le configurer |
| --- | --- | --- | --- |
| `http://rlab-one.fr` | `https://rlab-one.fr` | 308 | Automatique (Vercel) |
| `www.rlab-one.fr` | `https://rlab-one.fr` | 308 | Vercel → Settings → Domains |
| `rlab-one.eu` | `https://rlab-one.fr` | 308 | Vercel → Settings → Domains |
| `www.rlab-one.eu` | `https://rlab-one.fr` | 308 | Vercel → Settings → Domains |

Objectif : une seule version indexable du site. Le `.eu` pourra devenir plus tard
le domaine d'une déclinaison anglaise/européenne.

## Anciennes URLs détectées

| Ancienne URL | Cible recommandée | Statut |
| --- | --- | --- |
| `https://waspy.life/` | `https://rlab-one.fr/` | **En attente** — nécessite l'accès DNS/hébergement de `waspy.life` |
| `https://waspy.life/realisations` | `https://rlab-one.fr/realisations` | **En attente** — même prérequis |
| `https://waspy-digital-boost.lovable.app` | `https://rlab-one.fr/` | Sans objet — l'aperçu Lovable n'est pas indexé comme site de production |

> Aucune redirection n'est créée depuis `waspy.life` tant que le DNS et
> l'hébergement correspondants ne sont pas accessibles. `waspy.life` reste par
> ailleurs le domaine de la **réalisation** WaspTracker, distincte de la marque
> corporate RLAB ONE : une redirection globale du domaine n'est pertinente que si
> le site vitrine historique est réellement retiré.

## Redirections internes

| Source | Cible | Raison |
| --- | --- | --- |
| `/#contact` | `/contact` | Le bloc contact est devenu une page dédiée |
| `/#case` | `/realisations` | Le bloc réalisations a quitté l'accueil |

Ces deux ancres ne renvoyaient jamais un code HTTP (fragments côté client) : plus
aucun lien du site ne les utilise, et un fragment inconnu se contente d'afficher
le haut de la page d'accueil. Aucune règle serveur n'est nécessaire.
