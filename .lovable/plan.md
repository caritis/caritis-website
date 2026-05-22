## Objectif
Créer un 4ème service dédié à l'accompagnement IA et à la maîtrise des coûts tokens dans la section `Services`.

## Fichier concerné
- `src/components/site/Services.tsx`

## Détails d'implémentation

### 1. Nouveau service
Ajouter au tableau `services` un 4ème objet :
- **Icône** : `Brain` (lucide-react) — symbolise l'intelligence artificielle
- **Titre** : « Accompagnement projets IA & maîtrise des coûts »
- **Pitch** : « Structurer vos projets d'IA en entreprise tout en maîtrisant les coûts cachés liés à la facturation au token. »
- **Points** :
  - « Optimisation : modèles plus légers, caching, prompts structurés, agents hybrides. »
  - « Gouvernance : budgets par équipe, dashboards de consommation et règles d'usage. »

### 2. Mise à jour des imports
Ajouter `Brain` à l'import depuis `lucide-react`.

### 3. Adaptation de la grille
La grille actuelle utilise `md:grid-cols-3`. Pour 4 cartes, passer à :
- `grid md:grid-cols-2 lg:grid-cols-4 gap-6` (2 colonnes sur tablette, 4 sur desktop)

### 4. Vérifications
- Compilation TypeScript
- Rendu visuel équilibré des 4 cartes