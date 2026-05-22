## Constat actuel

Le formulaire de contact (`src/components/site/Contact.tsx` → `src/lib/contact.functions.ts`) **n'envoie aucun email aujourd'hui**. Le server function se contente d'un `console.log` côté serveur. Aucun service d'envoi n'est branché, donc rien n'arrive dans votre boîte.

## Objectif

Quand un visiteur clique sur **Envoyer** :
- Vous recevez une notification à **richard.labrador@outlook.fr** avec nom, email, société, sujet et message du visiteur
- L'email part de **noreply@wasptracker.com** (avec `Reply-To` = email du visiteur pour répondre directement)
- Le visiteur voit toujours le message de confirmation à l'écran

## Plan d'implémentation

### 1. Activer Lovable Cloud
Prérequis pour la file d'envoi, le suivi et la résilience (retries, anti-spam). Aucun compte externe, aucune config manuelle.

### 2. Configurer le domaine d'envoi `wasptracker.com`
Un sous-domaine `notify.wasptracker.com` sera délégué à Lovable pour signer SPF/DKIM. Vous devrez ajouter 2 enregistrements **NS** chez le registrar de `wasptracker.com` (étape guidée par une fenêtre dédiée — je vous donnerai les valeurs exactes).

L'adresse affichée dans la boîte du destinataire sera bien **noreply@wasptracker.com** (option *display from root* activée).

> ⚠️ Important : la vérification DNS peut prendre jusqu'à 72h. Le code est déployable avant — les envois démarreront automatiquement dès que la vérif passe au vert.

### 3. Scaffolder l'infra emails
Création des routes serveur (`send-transactional-email`, file `process-email-queue`, suppression, désinscription) et des tables associées.

### 4. Créer un template React Email `contact-notification`
- Destinataire : `richard.labrador@outlook.fr` (en dur dans `contact.functions.ts`)
- Sujet : `Nouveau message via waspy.life — {sujet}`
- Contenu : nom, société, email, sujet, message, horodatage
- Style aligné sur l'identité waspy

### 5. Brancher l'envoi dans `sendContactMessage`
- Garder la validation Zod existante
- Appeler le serveur d'envoi avec `templateName: 'contact-notification'`, `recipientEmail: 'richard.labrador@outlook.fr'`, `templateData` = champs du formulaire, `replyTo` = email du visiteur, `idempotencyKey` dérivée d'un UUID de soumission

### 6. Vérification de bout en bout
- Une fois Cloud + domaine actifs : envoyer un test depuis le formulaire en production
- Vérifier la réception sur `richard.labrador@outlook.fr` (incluant dossier spam le premier coup)
- Confirmer dans **Cloud → Emails** que le statut est `sent`

## Hors périmètre
- Pas d'email de confirmation au visiteur (à ajouter plus tard si souhaité)
- Pas de stockage des soumissions en base (à ajouter si vous voulez un historique consultable)
- Aucun changement UI sur le formulaire

## Question avant de lancer

Avez-vous accès au **registrar DNS de wasptracker.com** pour ajouter les 2 enregistrements NS sur `notify.wasptracker.com` ? Sans ça, les emails ne pourront pas partir (mais tout le reste peut être préparé).