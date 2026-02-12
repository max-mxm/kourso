# Architecture - Koursorr

Documentation technique sur la structure du code, l'organisation des guides pratiques, et les patterns de développement.

---

## 📄 Fichiers

### [cours-structure.md](./cours-structure.md)
Documentation complète sur la structure des cours.

**Contenu** :
- Composants principaux (CourseLayout, Sections, Catégories)
- Structure d'un cours
- Design system intégré
- Organisation des fichiers recommandée
- Fonctionnalités clés (navigation, progress tracking, scroll spy)
- Guidelines de contenu

**Quand consulter** :
- Création d'un nouveau cours
- Modification d'un cours existant
- Ajout de sections ou catégories
- Travail sur `app/cours/**/*`
- Questions sur l'organisation du code

---

## 🎯 Concepts Clés

### CourseLayout
Le composant central qui gère :
- Navigation par catégories
- Scroll spy automatique
- Barre de progression
- Sidebar fixe
- Responsive design

### Catégories de Sections
Les cours sont organisés en 5 catégories standard :
1. **Fondamentaux** - Concepts de base
2. **Modes de Rendu** - SSR, SSG, ISR, CSR
3. **Optimisations** - Performance frontend/backend
4. **Bonnes Pratiques** - Sécurité, accessibilité, patterns
5. **Avancé** - Techniques expertes

### Structure de Fichiers
```
app/cours/[slug]/
├── page.tsx                 # Point d'entrée
├── _components/
│   ├── course-layout.tsx    # Layout du cours
│   └── section-*.tsx        # Sections individuelles
├── _lib/server/
│   └── actions.ts           # Server actions
└── README.md                # Documentation du cours
```

---

## 🏗️ Patterns de Développement

### Création d'une Section

```tsx
interface Section {
  id: string;              // Ancre unique
  title: string;           // Titre affiché
  emoji: string;           // Emoji (optionnel)
  category: string;        // Catégorie
  component: ReactNode;    // Contenu
}
```

### Utilisation du CourseLayout

```tsx
import { CourseLayout } from '@/components/course/course-layout';

export default function MonCours() {
  const sections = [
    {
      id: 'intro',
      title: 'Introduction',
      category: 'fundamentals',
      component: <IntroSection />
    },
    // ... autres sections
  ];

  return <CourseLayout sections={sections} title="Mon Cours" />;
}
```

---

## 📚 Bonnes Pratiques

### Organisation
- Une section = un composant séparé
- Regrouper par catégorie logique
- Utiliser des noms de fichiers explicites (`section-ssr.tsx`)

### Performance
- Lazy loading des composants lourds
- Optimisation des images avec `next/image`
- Code splitting par section

### Accessibilité
- Hiérarchie de titres cohérente (h1 > h2 > h3)
- Navigation au clavier
- ARIA labels appropriés
- Bon contraste des couleurs

---

## 🔗 Voir Aussi

- [Design System](../design-system/) - Couleurs et typographie
- [Guides](../guides/) - Workflows pratiques
- [Projet](../project/) - Contexte et historique

---

Dernière mise à jour : Février 2026
