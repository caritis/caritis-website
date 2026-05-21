
## Objectif

Repositionner le discours de waspy.life autour d'un angle unique : **conseil en IT intégré à l'EFC (Économie de la fonctionnalité et de la coopération)**, dédié aux TPE/PME du secteur de la protection de l'environnement et de l'éco-conception. Le SI n'est plus une fin en soi mais un levier de sobriété, mutualisation et coopération.

## Modifications proposées

### 1. Hero (`src/components/site/Hero.tsx`)
- **Badge** (déjà mis à jour) : conserver `Conseils & Audits techniques numériques pour Dirigeants de TPE/PME`, et lui adjoindre une précision sectorielle, par exemple : *« — environnement, éco-conception, EFC »*.
- **H1** : remplacer *« Transformer votre SI en avantage compétitif, sans renoncer à la conformité »* par un titre qui marie performance numérique et sobriété, par exemple :
  *« Faire de votre SI un levier de sobriété, de coopération et de performance durable. »*
- **Sous-titre** : reformuler pour expliciter la cible (TPE/PME environnement / éco-conception) et la méthode EFC : cadrer, mutualiser, prioriser ; allier conformité (RGPD, NIS2, ISO 42001) et éco-conception logicielle.
- **Stats** : conserver les 4 KPI actuels (pas de chiffre inventé).

### 2. Bandeau explicatif EFC (nouveau, court)
Insérer juste sous le Hero une bande discrète (1 ligne + définition courte) qui explique l'EFC pour un visiteur non initié, ex :
> **EFC — Économie de la Fonctionnalité et de la Coopération** : vendre l'usage plutôt que le bien, mutualiser les ressources, et coopérer entre acteurs pour réduire l'empreinte tout en créant de la valeur.

Implémentation : petit composant `EfcBanner.tsx` intégré dans `src/routes/index.tsx` entre `<Hero />` et `<Services />`.

### 3. Services (`src/components/site/Services.tsx`)
Réécrire les 3 cartes pour ancrer chaque service dans l'angle EFC + environnement, sans inventer de nouvelles offres :

1. **Transformation digitale & éco-conception du SI**
   *Cadrer une feuille de route numérique sobre : prioriser ce qui crée de la valeur d'usage, mutualiser les briques, mesurer l'impact.*
   Points : Diagnostic 360° SI & impact ; Roadmap Cloud / Data orientée sobriété ; Conduite du changement & adoption.

2. **Audit de dette technique & sobriété logicielle**
   *Réduire la dette qui alourdit coûts et empreinte : cartographier, prioriser, rationaliser.*
   Points : Cartographie applicative & risques ; Plan de remédiation chiffré (coût + empreinte) ; Standards DevOps / CI-CD Azure.

3. **Conformité IT, gouvernance & coopération**
   *Mettre votre SI en conformité (RGPD, NIS2, ISO 42001) avec une gouvernance qui favorise la coopération entre parties prenantes.*
   Points : Audits internes & cartographie risques ; Politiques RACI / RBAC / ITSM ; Sensibilisation & lead audit ISO 42001.

Le titre de section devient : *« Trois leviers pour aligner votre SI avec vos engagements environnementaux. »*
Le chapeau remplace l'argument générique TPE/PME par une mention explicite du secteur environnement / éco-conception / EFC.

### 4. Réalisation — WaspTracker (`src/components/site/CaseStudy.tsx`)
Conserver le cas Waspy comme unique référence. Ajuster légèrement le chapeau pour faire ressortir le lien avec le secteur environnement :
- ajouter une phrase courte du type *« Un projet à impact environnemental direct : outiller la lutte contre une espèce invasive menaçant la biodiversité et l'apiculture. »*
- Reste de la section inchangé (puces, image, lien wasptracker.com).

### 5. SEO (`src/routes/index.tsx`)
Mettre à jour `title` et `description` :
- **title** : `waspy.life — Conseil IT & EFC pour TPE/PME de l'environnement | Richard Labrador` (≤ 60 car. cible).
- **description** : reformuler autour de « Conseil et audits numériques pour TPE/PME de la protection de l'environnement et de l'éco-conception : transformation digitale sobre, dette technique, conformité IT (RGPD, NIS2, ISO 42001), Économie de la Fonctionnalité et de la Coopération. » (≤ 160 car. — à raccourcir).
- Mettre à jour `og:title` / `og:description` en cohérence.

### 6. Header & Footer
- **Header** : pas de changement structurel (nav déjà OK).
- **Footer** : si le pitch d'accroche y figure, le réaligner sur le nouveau positionnement (à confirmer en lecture rapide du fichier).

## Hors périmètre
- Pas de nouveau projet ajouté à la section Réalisation.
- Pas d'ajout d'images ni de changement de palette / typographie.
- Pas de modification du backend ni des routes.

## Détails techniques
- Tous les changements sont front-only (composants `src/components/site/*` + `src/routes/index.tsx`).
- Aucun nouveau package requis.
- Le nouveau `EfcBanner.tsx` utilise les tokens existants (`text-muted-foreground`, `border-border/60`, `bg-card-grad`) — aucune couleur en dur.
