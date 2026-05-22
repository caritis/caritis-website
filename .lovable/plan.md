## Contexte

Vous disposez d'une boîte **noreply@waspy.eu** hébergée sur **OVH Zimbra**. Plutôt que de configurer le domaine d'envoi Lovable (Mailgun) sur `wasptracker.com` — qui demande une délégation NS et jusqu'à 72h de propagation — on va brancher le formulaire directement sur le SMTP OVH. Avantage : ça marche tout de suite, sans toucher au DNS, et les emails partent réellement depuis votre adresse.

## Objectif

Quand un visiteur clique sur **Envoyer** dans le formulaire :
- Un email part de `noreply@waspy.eu` (SMTP OVH Zimbra)
- Destinataire : `richard.labrador@outlook.fr`
- `Reply-To` = email du visiteur (pour répondre directement depuis Outlook)
- Sujet : `Nouveau message via waspy.life — {sujet}`
- Corps : nom, société, email, sujet, message, horodatage

## Plan d'implémentation

### 1. Désactiver le setup Lovable Emails (optionnel mais propre)
On n'utilisera plus l'infra email Lovable. Je désactiverai le scaffolding qui a été préparé pour éviter toute confusion. **Le domaine `wasptracker.com` n'a pas encore été délégué** côté DNS donc rien à nettoyer chez le registrar.

### 2. Stocker les identifiants SMTP OVH comme secrets serveur
Quatre secrets à ajouter (jamais exposés au navigateur) :
- `SMTP_HOST` (ex. `ssl0.ovh.net`)
- `SMTP_PORT` (ex. `465` SSL ou `587` STARTTLS)
- `SMTP_USER` (`noreply@waspy.eu`)
- `SMTP_PASSWORD` (mot de passe de la boîte Zimbra)

Je vous demanderai chaque valeur via le dialogue sécurisé `add_secret`.

### 3. Brancher l'envoi SMTP dans `sendContactMessage`
Dans `src/lib/contact.functions.ts` (server function TanStack, exécuté côté serveur) :
- Garder la validation Zod existante
- Utiliser **`nodemailer`** (compatible avec le runtime Worker via `nodejs_compat` déjà activé dans `wrangler.jsonc`) pour ouvrir une connexion SMTP authentifiée
- Construire l'email (From, To, Reply-To, Subject, texte + HTML simple)
- Envoyer ; en cas d'erreur SMTP, remonter un message générique au visiteur et logger le détail côté serveur

### 4. Vérification de bout en bout
- Soumettre un test depuis le formulaire en preview
- Vérifier la réception sur `richard.labrador@outlook.fr` (et dossier spam au premier coup)
- Vérifier les logs serveur via `server-function-logs` si l'envoi échoue

## Hors périmètre
- Pas d'email de confirmation au visiteur
- Pas de stockage en base
- Pas de file de retry (un échec SMTP = erreur affichée au visiteur, qui peut renvoyer)
- Pas de changement UI

## Détails techniques

| Élément | Valeur |
|---|---|
| Lib | `nodemailer` (à installer) |
| Runtime | Cloudflare Worker + `nodejs_compat` (déjà actif) |
| Transport | SMTP OVH, TLS implicite (port 465) ou STARTTLS (587) |
| Auth | login + password de la boîte Zimbra |

> ⚠️ Limite OVH Zimbra : ~500 envois/jour par boîte. Largement suffisant pour un formulaire de contact.

## Questions avant de lancer

1. **Quel port SMTP** voulez-vous utiliser : `465` (SSL, recommandé) ou `587` (STARTTLS) ?
2. Avez-vous le **mot de passe** de la boîte `noreply@waspy.eu` sous la main pour le coller dans le dialogue secret ?
