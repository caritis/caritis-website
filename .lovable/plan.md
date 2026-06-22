## Objectif
Renforcer la page `/realisations` en s'appuyant sur le parcours LinkedIn de Richard Labrador, en gardant un ton sobre et factuel (pas de remplissage).

## Source
Profil public : https://www.linkedin.com/in/rlabrador2000/
Croisé avec les jalons déjà présents dans `src/components/site/About.tsx` (Prodware, IBM, SAP BusinessObjects, Waspy).

## Modifications dans `src/routes/realisations.tsx`

### 1. Nouveau bandeau "Adossé à 20+ ans d'expérience SI"
Inséré entre le hero WaspTracker et la section visuels (ou juste après les visuels), bref et factuel :
- Une phrase d'intro : *"WaspTracker s'appuie sur une expérience structurée de pilotage SI, conformité et transformation."*
- 3–4 chips/badges concis tirés du profil :
  - DSI Adjoint & PMO Compliance · Prodware Group (RGPD / NIS2 / ISO 42001, 3 pays)
  - Responsable Projets R&D · Dynamics 365 (budget 1,5 M€, équipes de 20)
  - Consultant SI · IBM — DataMart CMA-CGM
  - Architecte BI · SAP BusinessObjects (France Télécom)

### 2. Nouvelle mini-section "Ce que j'apporte sur ce type de projet"
Avant la CTA finale, 3 puces courtes (une ligne chacune) :
- Cadrage métier + gouvernance projet (PMO, RACI, conformité).
- Pilotage budget, prestataires et delivery multi-pays.
- Conduite du changement et adoption terrain.

### 3. Lien LinkedIn discret
Petit lien "Voir le parcours détaillé sur LinkedIn →" sous le bandeau, vers `https://www.linkedin.com/in/rlabrador2000/` (target _blank, rel noopener).

## Ce que je ne fais pas
- Pas de refonte du hero ni des 4 cartes existantes.
- Pas de nouvel appel API LinkedIn (contenu statique tiré du profil public, cohérent avec `About.tsx`).
- Pas d'ajout de dépendances.

Confirme et je passe en build.