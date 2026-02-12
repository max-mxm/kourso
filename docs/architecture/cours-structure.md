# Architecture des Guides Pratiques - Koursorr

Documentation technique de la structure pour partager bonnes pratiques et retours d'expérience.

---

## 📚 Structure d'un Guide Pratique

### Composants Principaux

#### 1. **CourseLayout** - Layout principal du cours

Le composant `CourseLayout` gère :
- **Navigation par type de pratique** - Organisation hiérarchique des sections
- **Scroll spy** - Détection automatique de la section active
- **Progress tracker** - Barre de progression globale
- **Sidebar fixe** - Navigation persistante avec liens vers sections
- **Design responsive** - Adaptation mobile/tablette/desktop

#### 2. **Catégories de Sections**

```typescript
const categories = [
  {
    id: 'fundamentals',
    label: 'Fondamentaux',
    color: 'from-primary to-brand-secondary',
  },
  {
    id: 'rendering',
    label: 'Modes de Rendu',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'optimization',
    label: 'Optimisations',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'best-practices',
    label: 'Bonnes Pratiques',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'advanced',
    label: 'Avancé',
    color: 'from-red-500 to-rose-500'
  },
];
```

#### 3. **Structure d'une Section**

```typescript
interface Section {
  id: string;              // Identifiant unique pour ancres
  title: string;           // Titre affiché
  emoji: string;           // Emoji optionnel
  category: string;        // Catégorie (fundamentals, rendering, etc.)
  component: React.ReactNode; // Contenu de la section
}
```

---

## 🎨 Design System

### Hiérarchie Visuelle

1. **Header fixe** avec titre du cours et progress
2. **Sidebar catégorisée** avec navigation
3. **Contenu principal** avec sections scrollables
4. **Progress bar** en haut de page

### Animations et Interactions

- Scroll smooth automatique
- Détection active de la section visible
- Transitions fluides sur navigation
- Feedback visuel sur section active

---

## 📖 Exemple de Cours : Guide Next.js

### Sections du cours

#### Fondamentaux
- Comprendre les concepts de base

#### Modes de Rendu (7 sections)
1. **Server-Side Rendering (SSR)** - Contenu dynamique
2. **Static Site Generation (SSG)** - Contenu statique
3. **Incremental Static Regeneration (ISR)** - Revalidation
4. **Client-Side Rendering (CSR)** - Rendu client
5. **Hybrid** - Combinaison Server + Client
6. **Dynamic Import** - Code splitting
7. **Server Actions** - Mutations côté serveur

#### Optimisations (2 sections)
1. **Performance Frontend** - Optimisations React
2. **Performance Backend** - Cache et database

#### Bonnes Pratiques (4 sections)
1. **Sécurité** - CSRF, XSS, injection
2. **React Best Practices** - Patterns React
3. **Architecture** - Organisation du code
4. **Accessibilité** - WCAG et ARIA

#### Avancé (1 section)
1. **Patterns Avancés** - Techniques expertes

---

## 🏗️ Structure de Fichiers Recommandée

```
app/
├── cours/
│   ├── [slug]/
│   │   ├── page.tsx                    # Point d'entrée du cours
│   │   ├── _components/
│   │   │   ├── course-layout.tsx       # Layout principal
│   │   │   ├── section-1.tsx           # Sections du cours
│   │   │   ├── section-2.tsx
│   │   │   └── ...
│   │   ├── _lib/
│   │   │   └── server/
│   │   │       └── actions.ts          # Server actions si besoin
│   │   └── README.md                   # Documentation du cours
```

---

## 🎯 Fonctionnalités Clés

### 1. Navigation Intelligente
- Scroll spy automatique
- Highlight de la section active
- Navigation par ancres
- Responsive (mobile menu à implémenter)

### 2. Progress Tracking
- Barre de progression en haut
- Pourcentage de completion
- Visuel sur défilement

### 3. Organisation par Catégories
- Regroupement logique des sections
- Couleurs distinctives par catégorie
- Navigation hiérarchique

### 4. Responsive Design
- Sidebar cachée sur mobile
- Layout adaptatif
- Touch-friendly

---

## 🔧 Composants à Créer pour Koursorr

### Priorité 1 - MVP
- [ ] CourseLayout (layout principal)
- [ ] Section (composant de section générique)
- [ ] CourseCard (pour liste des cours)
- [ ] ProgressBar (barre de progression)

### Priorité 2 - Améliorations
- [ ] CourseNav (navigation mobile)
- [ ] Breadcrumb (fil d'ariane)
- [ ] TableOfContents (table des matières)
- [ ] CourseSearch (recherche dans le cours)

### Priorité 3 - Enrichissements
- [ ] CodeBlock (avec syntax highlighting)
- [ ] ExplanationCard (cartes explicatives)
- [ ] Quiz (questions interactives)
- [ ] ProgressSaver (sauvegarde progression)

---

## 📝 Exemple d'Utilisation

```tsx
// app/cours/nextjs/page.tsx
import { CourseLayout } from '@/components/course-layout';
import { FundamentalsSection } from './_components/fundamentals';
import { SSRDemo } from './_components/ssr-demo';
// ... autres imports

export default function NextJSCourse() {
  const sections = [
    {
      id: 'fundamentals',
      title: 'Fondamentaux',
      category: 'fundamentals',
      component: <FundamentalsSection />
    },
    {
      id: 'ssr',
      title: 'Server-Side Rendering',
      category: 'rendering',
      component: <SSRDemo />
    },
    // ... autres sections
  ];

  return <CourseLayout sections={sections} title="Guide Next.js" />;
}
```

---

## 🎨 Guidelines de Contenu

### Structure d'une Section

Chaque section devrait contenir :

1. **Contexte Réel** - Le problème/situation rencontré
2. **Pourquoi Cette Pratique** - Justification basée sur expérience
3. **Implémentation** - Code et approche utilisée
4. **Résultats Mesurables** - Impact mesuré
5. **Pièges et Limitations** - Ce qui ne marche pas toujours
6. **Alternatives** - Autres approches considérées et pourquoi pas

### Ton et Style

- **Honnête** - Phrases courtes
- **Du spécifique au général** - Du simple au complexe
- **Pragmatique** - Focus sur ce qui marche réellement
- **Chiffré** - Donner des métriques quand possible
- **Interactif** - Démos fonctionnelles

---

## 📊 Métriques de Succès

### Engagement
- Temps passé par cours
- Taux de complétion
- Sections les plus consultées

### Qualité
- Feedback utilisateurs
- Questions fréquentes
- Taux d'abandon

---

## 🚀 Prochaines Étapes

1. ✅ Import de la structure depuis Scanorr
2. ✅ Documentation de l'architecture
3. [ ] Création des composants de base
4. [ ] Première version d'un cours
5. [ ] Tests et itérations
6. [ ] Déploiement

---

**Source** : Importé depuis Scanorr (nextjs-demo)
**Adapté pour** : Koursorr - Plateforme de cours simple
**Dernière mise à jour** : Février 2026
