# Guide : Ajouter un Nouveau Guide Pratique

Guide complet pour documenter et publier un nouveau guide pratique sur Koursorr.

---

## Vue d'Ensemble

Ajouter un guide pratique implique 4 étapes principales :
1. Créer la structure de fichiers
2. Développer les sections du guide
3. Ajouter le guide à la navigation
4. Tester et valider

---

## Étape 1 : Créer la Structure de Fichiers

### 1.1 Créer le Dossier du Guide

```bash
# Créer la structure
mkdir -p app/cours/[slug-du-guide]/_sections
```

**Règles de nommage du slug :**
- Tout en minuscules
- Mots séparés par des tirets `-`
- Descriptif et court (2-3 mots max)
- Exemples : `nextjs-demo`, `react-19-advanced`, `typescript-fundamentals`

### 1.2 Créer le Point d'Entrée (`page.tsx`)

Créer `app/cours/[slug-du-guide]/page.tsx` :

```tsx
import { CourseLayout } from '@/components/course/course-layout';

// Imports des sections (default ou named exports)
import IntroductionSection from './_sections/introduction';
import Section2 from './_sections/section-2';
// ... autres imports

export default function MonGuide() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      iconName: 'Rocket', // Icône Lucide React
      category: 'fundamentals' as const,
      component: <IntroductionSection />
    },
    {
      id: 'section-2',
      title: 'Titre Section 2',
      iconName: 'Package',
      category: 'rendering' as const,
      component: <Section2 />
    },
    // ... autres sections
  ];

  return (
    <CourseLayout
      title="Titre de Mon Guide"
      subtitle="Description courte - X sections"
      sections={sections}
    />
  );
}
```

### 1.3 Créer les Sections

Chaque section = 1 fichier dans `_sections/` :

```tsx
// app/cours/[slug]/_sections/ma-bonne-pratique.tsx
import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function MaSection() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Introduction de la section...
        </p>
      </div>

      {/* Cartes conceptuelles */}
      <ConceptCard
        title="Concept Principal"
        description="Description..."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Point clé 1</li>
          <li>Point clé 2</li>
        </ul>
      </ConceptCard>

      {/* Blocs de code */}
      <CodeBlock
        code={`// Exemple de code
const example = 'Hello World';`}
        language="tsx"
        filename="example.ts"
        highlightLines={[2]}
        category="fundamentals"
      />
    </div>
  );
}
```

### 1.4 Créer le README.md

Créer `app/cours/[slug-du-guide]/README.md` avec :
- Description du guide
- Structure des sections
- Prérequis
- Objectifs pédagogiques
- Références

Voir [`app/cours/react-19-advanced/README.md`](../../app/cours/react-19-advanced/README.md) comme exemple.

---

## Étape 2 : Développer les Sections du Guide

### 2.1 Catégories Disponibles

Utiliser **STRICTEMENT** l'une des 5 catégories :

| Catégorie | Gradient | Usage |
|-----------|----------|-------|
| `fundamentals` | Teal → Violet | Concepts de base, introduction |
| `rendering` | Bleu → Cyan | Rendu, modes de rendu, architecture |
| `optimization` | Orange → Ambre | Performance, optimisations |
| `best-practices` | Violet → Rose | Bonnes pratiques, patterns |
| `advanced` | Rouge → Rose | Techniques avancées |

**Référence :** [`docs/design-system/categories.md`](../design-system/categories.md)

### 2.2 Composants Disponibles

#### CourseLayout
Layout principal avec navigation, scroll spy, progress bar.

**Props :**
- `title` : Titre du guide
- `subtitle` : Sous-titre (optionnel)
- `sections` : Array des sections

#### ConceptCard
Carte explicative avec animations au scroll.

**Props :**
- `title` : Titre du concept
- `description` : Description
- `category` : Catégorie (fundamentals, rendering, etc.)
- `children` : Contenu additionnel (listes, exemples)
- `visual` : Élément visuel optionnel (SVG, diagramme)

#### CodeBlock
Bloc de code avec syntax highlighting.

**Props :**
- `code` : Code source (string)
- `language` : Langage (tsx, javascript, python, etc.)
- `filename` : Nom du fichier (optionnel)
- `highlightLines` : Array des lignes à surligner (optionnel)
- `category` : Catégorie pour la couleur de bordure

#### ComparisonTable
Tableau comparatif.

**Props :**
- `modes` : Array d'objets avec structure :
  ```ts
  {
    name: string;
    description: string;
    pros: string[];
    cons: string[];
    useCases: string[];
    color: string; // Hex ou rgb()
  }
  ```

#### InteractiveDemo
Démo interactive avec états.

**Props :**
- `title` : Titre de la démo
- `description` : Description
- `demoType` : Type de démo
- `onRun` : Fonction async qui retourne le résultat

### 2.3 Icônes Lucide React

Icônes disponibles via `iconName` dans CourseLayout :

- `Rocket`, `Package`, `Server`, `Zap`, `Activity`
- `RefreshCw`, `Gauge`, `Database`, `Shield`, `Code`
- `TestTube`, `Eye`, `Sparkles`, `Layers`, `Building`
- `Cpu`, `Trash2`, `Monitor`, `Component`, `FileText`

[Liste complète sur lucide.dev](https://lucide.dev/icons/)

### 2.4 Standards de Qualité

**Design System :**
- ✅ Utiliser variables CSS : `hsl(var(--primary))`
- ✅ Respecter hiérarchie typographique (Inter)
- ✅ Tester mode light/dark
- ✅ Accessibilité : ratio contraste 4.5:1 minimum
- ✅ Responsive design (mobile-first)
- ❌ **JAMAIS d'émojis classiques** - Utiliser icônes Lucide React
- ❌ Pas de hard-coding des couleurs

**Contenu :**
- Langage professionnel et précis
- Exemples de code réels et testables
- Comparaisons pertinentes
- Références à la documentation officielle

---

## Étape 3 : Ajouter le Guide à la Navigation

### 3.1 Page d'Accueil (`app/page.tsx`)

Ajouter une carte du guide dans la section "Guides pratiques" :

```tsx
{/* Votre nouveau guide */}
<Link
  href="/cours/[slug-du-guide]"
  className="group relative rounded-2xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] overflow-hidden"
>
  <div className="absolute inset-0 bg-gradient-to-br from-[couleur]/5 to-[couleur]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

  <div className="relative space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[couleur]/10 to-[couleur]/10 flex items-center justify-center">
        <IconeChoisie className="w-6 h-6 text-[couleur]" />
      </div>
      <div className="text-xs font-bold px-2 py-1 rounded bg-[couleur]/10 text-[couleur]">
        NOUVEAU
      </div>
    </div>

    <div>
      <h4 className="text-2xl font-black mb-2 group-hover:text-[couleur] transition-colors">
        Titre du Guide
      </h4>
      <p className="text-muted-foreground leading-relaxed">
        Description courte du guide (1-2 phrases).
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
        Tag 1
      </span>
      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
        Tag 2
      </span>
    </div>

    <div className="pt-4 flex items-center justify-between text-sm">
      <span className="text-muted-foreground">X sections</span>
      <span className="text-[couleur] group-hover:translate-x-1 transition-transform duration-200">
        Explorer le guide →
      </span>
    </div>
  </div>
</Link>
```

**Mettre à jour les stats :**

```tsx
<div className="text-3xl font-black text-foreground">X</div>
<div className="text-sm text-muted-foreground">Guides pratiques</div>
```

### 3.2 Page Catalogue (`app/cours/page.tsx`)

Ajouter le guide dans l'array `courses` :

```tsx
const courses = [
  // ... guides existants
  {
    id: 'slug-du-guide',
    title: 'Titre du Guide',
    description: 'Description complète du guide.',
    icon: IconeChoisie,
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    sections: X,
    level: 'Débutant' | 'Intermédiaire' | 'Avancé',
    duration: 'Xh',
    gradient: 'from-[couleur] to-[couleur]'
  }
];
```

---

## Étape 4 : Tester et Valider

### 4.1 Lancer le Serveur de Développement

```bash
npm run dev
```

### 4.2 Tests Visuels

Naviguer vers `http://localhost:3000/cours/[slug-du-guide]` et vérifier :

- ✅ Progress bar fonctionne
- ✅ Scroll spy détecte section active
- ✅ Sidebar affiche toutes les sections
- ✅ Navigation entre sections fluide
- ✅ Mode dark/light fonctionne
- ✅ Responsive (mobile/tablette/desktop)

### 4.3 Tests Contenu

- ✅ CodeBlocks affichent le code correctement
- ✅ Syntax highlighting fonctionne
- ✅ Bouton copier fonctionne
- ✅ ConceptCards s'animent au scroll
- ✅ ComparisonTables sont scrollables sur mobile
- ✅ Pas d'erreurs console

### 4.4 Tests Accessibilité

- ✅ Navigation clavier fonctionne (Tab, Enter)
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Contraste suffisant (ratio 4.5:1)
- ✅ Alt text sur images si utilisées
- ✅ ARIA labels corrects

### 4.5 Tests Performance

```bash
# Build de production
npm run build

# Tester la build
npm start
```

Vérifier :
- ✅ Temps de chargement initial < 2s
- ✅ Pas de layout shifts (CLS < 0.1)
- ✅ Interactivité rapide (INP < 200ms)

---

## Checklist Complète

Avant de considérer votre guide de bonnes pratiques terminé :

### Structure
- [ ] Dossier `app/cours/[slug]/` créé
- [ ] Fichier `page.tsx` créé
- [ ] Toutes les sections dans `_sections/` créées
- [ ] `README.md` complété avec contexte/REX

### Contenu
- [ ] 2-20 sections (recommandé : 8-15)
- [ ] Chaque section documente une bonne pratique testée
- [ ] Pas d'émojis classiques (utiliser icônes Lucide)
- [ ] Code examples issus de projets réels et testés
- [ ] Pas de hard-coding de couleurs

### Navigation
- [ ] Guide ajouté à `app/page.tsx`
- [ ] Guide ajouté à `app/cours/page.tsx`
- [ ] Stats mises à jour (nombre de guides, sections)
- [ ] Gradient et couleur cohérents

### Tests
- [ ] Guide accessible via l'URL
- [ ] Toutes les sections s'affichent
- [ ] Navigation fonctionne (scroll spy, sidebar)
- [ ] Mode dark/light OK
- [ ] Responsive OK (mobile/tablette/desktop)
- [ ] Pas d'erreurs console
- [ ] Accessibilité validée

### Documentation
- [ ] README.md du guide complété avec contexte et REX
- [ ] Références et sources ajoutées
- [ ] Prérequis documentés

---

## Conseils et Bonnes Pratiques

### Organisation du Contenu

1. **Contexte d'abord** : Expliquer le problème/contexte qui a mené à cette bonne pratique
2. **Du problème à la solution** : Montrer l'évolution et le raisonnement
3. **Exemples terrain réels** : Code issu de vrais projets, pas d'exemples théoriques
4. **Comparaisons** : Utiliser ComparisonTable pour les alternatives testées
5. **Retour d'expérience** : Section finale avec apprentissages et pièges à éviter

### Taille des Sections

- **Minimum** : 5 sections
- **Recommandé** : 10-15 sections
- **Maximum** : 20 sections (au-delà, découper en plusieurs guides)

### Durée Estimée

- **Débutant** : 1-2h pour 8-10 sections
- **Intermédiaire** : 2-3h pour 12-15 sections
- **Avancé** : 3-5h pour 15-20 sections

### Nommage des Fichiers

- Sections : `kebab-case.tsx` (ex: `server-components.tsx`)
- Exports : Préférer `default export` pour cohérence
- Composants internes : PascalCase

---

## Exemples de Référence

### Guides Existants

- **Next.js Demo** : [`app/cours/nextjs-demo/`](../../app/cours/nextjs-demo/)
  - 21 sections couvrant les patterns testés
  - Exemple de guide complet avec REX

- **React 19 Advanced** : [`app/cours/react-19-advanced/`](../../app/cours/react-19-advanced/)
  - 18 sections, niveau avancé
  - Exemple de contenu issu du terrain

### Documentation de Référence

- [`docs/architecture/cours-structure.md`](../architecture/cours-structure.md) - Architecture des guides
- [`docs/design-system/categories.md`](../design-system/categories.md) - Catégories et couleurs
- [`docs/design-system/README.md`](../design-system/README.md) - Design system complet

---

## Aide et Support

### Composants

Voir [`components/course/`](../../components/course/) pour les implémentations.

### Design System

Consulter [`docs/design-system/`](../design-system/) pour les couleurs, typographie, etc.

### Questions Fréquentes

**Q : Combien de sections minimum ?**
R : Minimum 5, recommandé 10-15 pour un guide REX complet.

**Q : Dois-je inclure du contexte/REX ?**
R : OUI - C'est essentiel ! Expliquez le problème, la solution, et vos apprentissages terrain.

**Q : Puis-je utiliser des émojis ?**
R : NON. Utiliser uniquement les icônes Lucide React via `iconName`.

**Q : Comment choisir la catégorie ?**
R : Voir [`docs/design-system/categories.md`](../design-system/categories.md) - 5 catégories strictes.

**Q : Les sections doivent-elles être des default exports ?**
R : Préféré pour cohérence, mais named exports fonctionnent aussi.

---

**Dernière mise à jour** : Février 2026
