# Documentation Koursorr - Référencement Contextuel

Règles de consultation automatique de la documentation selon le contexte de travail.

---

## 📚 Index de la Documentation

Toute la documentation se trouve dans [`docs/`](./docs/).

### Sections Principales
- [`docs/architecture/`](./docs/architecture/) - Structure technique et organisation du code
- [`docs/design-system/`](./docs/design-system/) - Couleurs, typographie, thème
- [`docs/guides/`](./docs/guides/) - Workflows et guides pratiques
- [`docs/project/`](./docs/project/) - Contexte et historique du projet

---

## 🎯 Règles de Consultation Contextuelle

### Par Modification de Fichiers

#### Si modification dans `app/cours/**/*`
→ **Consulter OBLIGATOIREMENT** : [`docs/architecture/cours-structure.md`](./docs/architecture/cours-structure.md)

Contient :
- Structure d'un cours (CourseLayout, Sections, Catégories)
- Organisation des fichiers recommandée
- Composants disponibles
- Patterns de développement

---

#### Si modification dans `components/**/*`
→ **Consulter** : [`docs/design-system/README.md`](./docs/design-system/README.md)

Contient :
- Vue d'ensemble du design system
- Couleurs et variables CSS
- Typographie et polices
- Guidelines de cohérence

---

#### Si modification dans `app/styles/**/*`
→ **Consulter** :
- [`docs/design-system/colors.md`](./docs/design-system/colors.md) - Variables CSS et palette
- [`docs/design-system/typography.md`](./docs/design-system/typography.md) - Polices et radius

---

### Par Type de Tâche

#### Ajout d'un Nouveau Cours
→ **Consulter OBLIGATOIREMENT** : [`docs/guides/ajouter-un-cours.md`](./docs/guides/ajouter-un-cours.md)

Contient :
- Guide complet étape par étape
- Structure de fichiers requise
- Ajout à la navigation (page d'accueil + catalogue)
- Tests et validation
- Checklist complète

---

#### Ajout de Couleurs ou Travail sur le Thème
→ **Consulter** : [`docs/design-system/colors.md`](./docs/design-system/colors.md)

Contient :
- Palette complète (teal `#009688`, violet `#7c3aed`)
- Mode light et dark
- Variables CSS (`hsl(var(--primary))`)
- Couleurs de graphique, bordures, etc.

---

#### Travail Typographique
→ **Consulter** : [`docs/design-system/typography.md`](./docs/design-system/typography.md)

Contient :
- Polices (Inter par défaut)
- Radius (bordures arrondies)
- Hiérarchie typographique
- Bonnes pratiques de lisibilité

---

#### Création/Modification de Catégories de Cours
→ **Consulter** : [`docs/design-system/categories.md`](./docs/design-system/categories.md)

Contient :
- 5 gradients par catégorie (Fondamentaux, Rendering, etc.)
- Codes couleurs exacts
- Implémentation dans CourseLayout
- Guidelines d'accessibilité

---

#### Refonte UI ou Amélioration Visuelle
→ **Consulter** : [`docs/guides/impeccable-workflow.md`](./docs/guides/impeccable-workflow.md)

Contient :
- 15 skills Impeccable en 6 phases
- Workflow d'amélioration UI complet
- Commandes correctives
- Conseils d'exécution

Utilisation : `/impeccable:<skill>` dans Claude Code

---

#### Besoin de Contexte Projet ou Onboarding
→ **Consulter** : [`docs/project/import-summary.md`](./docs/project/import-summary.md)

Contient :
- Historique d'import depuis Scanorr
- État actuel du projet
- Ce qui a été importé
- Prochaines étapes
- Commandes utiles

---

### Par Mots-Clés dans le Prompt

| Mots-clés | Documentation à consulter |
|-----------|---------------------------|
| "nouveau cours", "ajouter cours", "créer cours", "navigation" | [`docs/guides/ajouter-un-cours.md`](./docs/guides/ajouter-un-cours.md) |
| "cours", "section", "catégorie", "CourseLayout" | [`docs/architecture/cours-structure.md`](./docs/architecture/cours-structure.md) |
| "couleur", "teal", "violet", "theme", "dark", "light" | [`docs/design-system/colors.md`](./docs/design-system/colors.md) |
| "police", "typographie", "Inter", "radius" | [`docs/design-system/typography.md`](./docs/design-system/typography.md) |
| "gradient", "fondamentaux", "rendering", "catégorie" | [`docs/design-system/categories.md`](./docs/design-system/categories.md) |
| "impeccable", "améliorer UI", "refonte", "audit" | [`docs/guides/impeccable-workflow.md`](./docs/guides/impeccable-workflow.md) |
| "qu'est-ce qui a été importé", "contexte", "historique" | [`docs/project/import-summary.md`](./docs/project/import-summary.md) |

---

## 📖 Documentation Complète

### Architecture
- [`docs/architecture/cours-structure.md`](./docs/architecture/cours-structure.md) - Structure des cours, composants, patterns

### Design System
- [`docs/design-system/colors.md`](./docs/design-system/colors.md) - Palette teal/violet, light/dark
- [`docs/design-system/typography.md`](./docs/design-system/typography.md) - Inter, hiérarchie typographique
- [`docs/design-system/categories.md`](./docs/design-system/categories.md) - Gradients par catégorie

### Guides
- [`docs/guides/ajouter-un-cours.md`](./docs/guides/ajouter-un-cours.md) - Guide complet pour créer un nouveau cours
- [`docs/guides/bonnes-pratiques-cours.md`](./docs/guides/bonnes-pratiques-cours.md) - Standards de qualité et recommandations
- [`docs/guides/impeccable-workflow.md`](./docs/guides/impeccable-workflow.md) - 15 skills en 6 phases

### Projet
- [`docs/project/import-summary.md`](./docs/project/import-summary.md) - Historique import Scanorr

---

## 🎨 Valeurs du Design System

### Couleurs Principales
- **Primary** : Teal `rgb(0, 150, 136)`
- **Brand Secondary** : Violet `rgb(124, 58, 237)`

### Police
- **Default** : Inter

### Gradients des Catégories
1. **Fondamentaux** : Teal → Violet
2. **Modes de Rendu** : Bleu → Cyan
3. **Optimisations** : Orange → Ambre
4. **Bonnes Pratiques** : Violet → Rose
5. **Avancé** : Rouge → Rose

---

## 🚀 Commandes Utiles

```bash
# Lancer le serveur de développement
npm run dev

# Ajouter un composant Shadcn UI
npx shadcn@latest add [component-name]

# Build pour production
npm run build

# Linter
npm run lint
```

---

## 🔧 Configuration

### Tailwind
Configuration dans `tailwind.config.ts`

### Variables CSS
Définies dans `app/styles/shadcn-ui.css`

### Thème
Provider dans `app/layout.tsx` via `ThemeProvider`

---

## 📝 Bonnes Pratiques

### Toujours
- ✅ Utiliser les variables CSS (`hsl(var(--primary))`)
- ✅ Respecter la hiérarchie typographique
- ✅ Tester en mode light et dark
- ✅ Vérifier l'accessibilité (ratio 4.5:1 minimum)
- ✅ Utiliser les gradients définis pour les catégories
- ✅ Privilégier les icônes SVG ou icons library (Lucide React)
- ✅ Utiliser un langage professionnel et précis

### Jamais
- ❌ Hard-coder les couleurs
- ❌ Créer de nouvelles couleurs sans justification
- ❌ Ignorer le responsive
- ❌ Oublier les tests sur mobile
- ❌ **UTILISER DES ÉMOJIS CLASSIQUES (🎯, 📚, ✅, ❌, etc.)** - Cela donne un aspect non professionnel et générique
- ❌ Mélanger émojis et texte dans l'interface utilisateur

---

## 🤝 Contribuer à la Documentation

La documentation évolue avec le projet. Pour ajouter/modifier :

1. Consulter la structure dans [`docs/README.md`](./docs/README.md)
2. Éditer les fichiers markdown concernés
3. Mettre à jour les liens si nécessaire
4. Ajouter des exemples concrets

---

Dernière mise à jour : Février 2026
