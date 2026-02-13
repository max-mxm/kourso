# React 19 - Bonnes Pratiques Front-End pour Développeurs Seniors

Cours complet sur React 19 et les patterns avancés pour développeurs expérimentés.

---

## Structure du Cours

### 18 Sections Organisées en 5 Catégories

#### 1. Fondamentaux (2 sections)
- **Introduction à React 19** - Nouveautés, breaking changes, migration depuis React 18
- **Hook use() & Suspense 2.0** - Nouvelle API pour lire promises et context conditionnellement

#### 2. Rendering & Concurrent Features (5 sections)
- **React Compiler** - Optimisation automatique, memoization intelligente
- **React Server Components (RSC)** - Rendu serveur, zero-bundle architecture
- **Actions & Async Transitions** - useTransition, gestion automatique des états
- **useActionState & useOptimistic** - Forms et updates optimistes
- **Streaming & Partial Pre-rendering** - Progressive rendering, React 19.2

#### 3. Optimisations (4 sections)
- **Bundle Optimization** - Tree-shaking, code splitting, dynamic imports
- **Performance Hooks** - useMemo vs React Compiler, quand optimiser manuellement
- **Memory Management** - Prévention des fuites mémoire, cleanup patterns
- **Data Fetching Patterns** - use() + Suspense vs useEffect, TanStack Query

#### 4. Bonnes Pratiques (5 sections)
- **Architecture Scalable** - Feature-based structure, domain-driven design
- **Error Handling & Boundaries** - Gestion améliorée des erreurs en React 19
- **TypeScript Advanced Patterns** - Generics, conditional types, type guards
- **Testing Strategy** - Unit tests, integration tests, E2E avec Playwright
- **Accessibility (a11y)** - WCAG 2.2, ARIA, keyboard navigation

#### 5. Avancé (2 sections)
- **Custom Hooks Patterns** - Composition, réutilisabilité, type safety
- **Refs as Props & Document Metadata** - Nouvelles APIs React 19

---

## Nouveautés React 19 Couvertes

### APIs Principales
- ✅ Hook `use()` - Lire promises et context conditionnellement
- ✅ React Compiler - Memoization automatique
- ✅ Actions - Async functions dans transitions
- ✅ useActionState - Remplacement de useFormState
- ✅ useOptimistic - Updates optimistes avec rollback
- ✅ Refs as Props - Plus besoin de forwardRef
- ✅ Document Metadata - Tags title/meta/link dans composants
- ✅ Server Components - Foundation de React 19
- ✅ Partial Pre-rendering (React 19.2) - Pré-render + dynamic fill

### Breaking Changes Traités
- ❌ forwardRef déprécié → Refs directement en props
- ❌ useFormState renommé → useActionState
- ❌ ReactDOM.render déprécié → createRoot obligatoire
- ✅ Concurrent rendering activé par défaut

---

## Technologies et Outils Abordés

### Core
- React 19
- TypeScript 5+
- React Compiler (babel-plugin-react-compiler)

### Performance
- React DevTools Profiler
- Bundle Analyzer
- Core Web Vitals

### Data Fetching
- use() + Suspense
- TanStack Query v5
- Server Actions

### Testing
- Vitest / Jest
- React Testing Library
- Playwright (E2E)

### Architecture
- Next.js 16+ App Router (recommandé)
- Server Components
- Feature-based structure

---

## Public Visé

Ce cours s'adresse aux **développeurs React expérimentés** :
- Maîtrise de React 18 (hooks, context, Suspense)
- Connaissance de TypeScript
- Expérience en production
- Recherche de patterns avancés et best practices

**Pas pour débutants** : Les concepts de base de React ne sont pas réexpliqués.

---

## Objectifs Pédagogiques

À la fin de ce cours, vous serez capable de :

1. **Maîtriser React 19** : Utiliser toutes les nouvelles APIs avec confiance
2. **Optimiser les performances** : Comprendre le React Compiler et savoir quand optimiser manuellement
3. **Architécturer** : Structurer des applications scalables avec Server Components
4. **Type-safety** : Utiliser TypeScript de manière avancée avec React 19
5. **Tester efficacement** : Stratégie complète de tests (unit, integration, E2E)
6. **Accessibilité** : Créer des applications conformes WCAG 2.2

---

## Sources et Références

### Documentation Officielle
- [React v19 Blog Post](https://react.dev/blog/2024/12/05/react-19)
- [React 19.2 Updates](https://react.dev/blog/2025/10/01/react-19-2)
- [React Labs: Activity API](https://react.dev/blog/2025/04/23/react-labs-view-transitions-activity-and-more)

### Guides et Patterns
- [React Hooks Guide 2026](https://inhaq.com/blog/mastering-react-hooks-the-ultimate-guide-for-building-modern-performant-uis)
- [React Stack Patterns](https://www.patterns.dev/react/react-2026/)
- [React 19 Key Features](https://colorwhistle.com/latest-react-features/)

---

## Prérequis Techniques

### Minimum
- Node.js 18+
- npm/pnpm/yarn/bun
- Editor avec support TypeScript (VS Code recommandé)

### Recommandé
- Next.js 16+ pour tester Server Components
- React DevTools extension
- Git pour suivre les exemples

---

## Structure des Sections

Chaque section contient :
- **Introduction** : Contexte et problématique
- **ConceptCards** : Explications visuelles des concepts clés
- **CodeBlocks** : Exemples de code commentés avec syntax highlighting
- **ComparisonTables** : Comparaisons visuelles (React 18 vs 19, etc.)
- **Best Practices** : Recommandations pour développeurs seniors

---

## Utilisation

### Développement Local
```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Naviguer vers
http://localhost:3000/cours/react-19-advanced
```

### Navigation
- **Sidebar** : Navigation par catégories et sections
- **Scroll spy** : Détection automatique de la section active
- **Progress bar** : Barre de progression globale en haut
- **Responsive** : Adapté mobile/tablette/desktop

---

## Composants Utilisés

Ce cours utilise les composants du design system Koursorr :
- **CourseLayout** : Layout principal avec navigation
- **ConceptCard** : Cartes explicatives avec animations
- **CodeBlock** : Blocs de code avec syntax highlighting
- **ComparisonTable** : Tableaux comparatifs

Voir [`docs/architecture/cours-structure.md`](../../../docs/architecture/cours-structure.md) pour plus de détails.

---

## Contributeurs

Cours créé en février 2026 pour la plateforme Koursorr.

---

## License

Ce cours est fourni à titre éducatif.

---

**Bon apprentissage !** 🚀
