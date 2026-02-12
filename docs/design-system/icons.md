# Guide d'Utilisation des Icônes

**RÈGLE ABSOLUE : Aucun émoji classique (🚀, 📚, ✅, etc.) ne doit être utilisé dans l'interface.**

---

## Bibliothèque d'Icônes

Koursorr utilise **Lucide React** comme bibliothèque d'icônes officielle.

- **Site officiel** : [lucide.dev](https://lucide.dev)
- **Package** : `lucide-react`
- **Style** : Minimaliste, cohérent, professionnel
- **Avantages** :
  - Rendu vectoriel parfait sur tous les écrans
  - Personnalisable (couleur, taille)
  - Accessible
  - Cohérent entre navigateurs et OS

---

## Installation

```bash
npm install lucide-react
```

---

## Utilisation de Base

```tsx
import { Rocket, Check, X } from 'lucide-react';

export function MyComponent() {
  return (
    <div>
      <Rocket className="w-6 h-6 text-primary" />
      <Check className="w-4 h-4 text-green-600" />
      <X className="w-4 h-4 text-red-600" />
    </div>
  );
}
```

---

## Règles de Taille

| Contexte | Classe Tailwind | Taille (px) |
|----------|----------------|-------------|
| Petite icône inline | `w-3.5 h-3.5` | 14px |
| Icône standard | `w-4 h-4` | 16px |
| Icône moyenne | `w-5 h-5` | 20px |
| Icône grande | `w-6 h-6` | 24px |
| Icône hero/illustration | `w-8 h-8` à `w-16 h-16` | 32-64px |

---

## Icônes par Catégorie

### Navigation & Structure

```tsx
import { Home, Menu, ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';
```

**Usage** : Navigation, menus, breadcrumbs, flèches directionnelles

### Actions Utilisateur

```tsx
import { Plus, Edit, Trash2, Save, Download, Upload } from 'lucide-react';
```

**Usage** : Boutons d'action, CRUD operations

### Statut & Feedback

```tsx
import { Check, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';
```

**Usage** : Messages de succès/erreur, notifications, alertes

### Cours & Contenu

```tsx
import { BookOpen, FileText, Code2, Layers, Zap } from 'lucide-react';
```

**Usage** : Représenter le contenu pédagogique

### Performance & Technique

```tsx
import { Rocket, Zap, RefreshCw, Monitor, Target } from 'lucide-react';
```

**Usage** : Concepts techniques, performance, fonctionnalités

### Analytics & Progression

```tsx
import { BarChart3, TrendingUp, Clock, Calendar } from 'lucide-react';
```

**Usage** : Tableaux de bord, statistiques, progression

---

## Correspondance Émojis → Icônes

| Émoji Interdit | Icône Lucide | Import |
|----------------|--------------|--------|
| 🚀 | `Rocket` | `import { Rocket } from 'lucide-react'` |
| 📚 | `BookOpen` | `import { BookOpen } from 'lucide-react'` |
| 🎯 | `Target` | `import { Target } from 'lucide-react'` |
| ⚡ | `Zap` | `import { Zap } from 'lucide-react'` |
| 🎨 | `Palette` | `import { Palette } from 'lucide-react'` |
| 📊 | `BarChart3` | `import { BarChart3 } from 'lucide-react'` |
| 💻 | `Monitor` | `import { Monitor } from 'lucide-react'` |
| 🔄 | `RefreshCw` | `import { RefreshCw } from 'lucide-react'` |
| 📄 | `FileText` | `import { FileText } from 'lucide-react'` |
| ✓ | `Check` | `import { Check } from 'lucide-react'` |
| ✗ | `X` | `import { X } from 'lucide-react'` |
| 🔓 | `Unlock` | `import { Unlock } from 'lucide-react'` |

---

## Patterns d'Utilisation

### 1. Icône dans un Bouton

```tsx
import { Rocket } from 'lucide-react';

<button className="flex items-center gap-2">
  <Rocket className="w-4 h-4" />
  Lancer
</button>
```

### 2. Icône avec Badge de Couleur

```tsx
import { Zap } from 'lucide-react';

<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 border border-primary/20 flex items-center justify-center">
  <Zap className="w-6 h-6 text-primary" />
</div>
```

### 3. Icône dans une Liste

```tsx
import { Check } from 'lucide-react';

<li className="flex items-start gap-2">
  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
  <span>Item de la liste</span>
</li>
```

### 4. Icône Conditionnelle (Succès/Erreur)

```tsx
import { Check, X } from 'lucide-react';

{state === 'success' ? (
  <Check className="w-5 h-5 text-green-600" />
) : (
  <X className="w-5 h-5 text-red-600" />
)}
```

---

## Couleurs Recommandées

```tsx
// Primary (actions principales)
<Rocket className="w-6 h-6 text-primary" />

// Success
<Check className="w-4 h-4 text-green-600 dark:text-green-400" />

// Error
<X className="w-4 h-4 text-red-600 dark:text-red-400" />

// Warning
<AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />

// Info
<Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />

// Muted (secondaire)
<BookOpen className="w-6 h-6 text-muted-foreground" />
```

---

## Accessibilité

### 1. Icônes Décoratives

Si l'icône est purement décorative (le texte adjacent porte le sens) :

```tsx
<button>
  <Rocket className="w-4 h-4" aria-hidden="true" />
  Lancer
</button>
```

### 2. Icônes Fonctionnelles (sans texte)

Si l'icône est seule sans texte visible :

```tsx
<button aria-label="Fermer">
  <X className="w-5 h-5" />
</button>
```

---

## Bonnes Pratiques

### À FAIRE

- ✅ Utiliser Lucide React pour toutes les icônes
- ✅ Respecter les tailles standard (w-4, w-5, w-6)
- ✅ Utiliser `flex-shrink-0` dans les listes pour éviter la déformation
- ✅ Ajouter `aria-label` sur les icônes seules
- ✅ Utiliser les couleurs du design system

### À NE PAS FAIRE

- ❌ **Utiliser des émojis classiques** (🚀, 📚, etc.)
- ❌ Mélanger plusieurs bibliothèques d'icônes
- ❌ Hard-coder les couleurs (toujours utiliser les classes Tailwind)
- ❌ Oublier les états dark mode
- ❌ Utiliser des tailles non standard arbitraires

---

## Exemples Réels du Projet

### Hero Section (page.tsx)

```tsx
import { Rocket } from 'lucide-react';

<div className="absolute inset-24 rounded-full bg-gradient-to-br from-primary/30 to-brand-secondary/30 backdrop-blur-xl flex items-center justify-center">
  <Rocket className="w-16 h-16 text-primary" />
</div>
```

### Carte de Fonctionnalité (page.tsx)

```tsx
import { Zap } from 'lucide-react';

<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 flex items-center justify-center border border-primary/20">
  <Zap className="w-7 h-7 text-primary" />
</div>
```

### Navigation de Cours (course-layout.tsx)

```tsx
import { LucideIcon } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon?: LucideIcon;
  // ...
}

// Dans le rendu :
{section.icon && <section.icon className="w-4 h-4 flex-shrink-0" />}
```

---

## Recherche d'Icônes

1. Visitez [lucide.dev](https://lucide.dev)
2. Utilisez la barre de recherche (en anglais)
3. Cliquez sur l'icône pour voir les variantes
4. Copiez le nom de l'import

**Astuce** : Les icônes Lucide sont nommées en PascalCase (ex: `ArrowRight`, `CheckCircle`)

---

## Migration d'Émojis Existants

Si vous trouvez des émojis dans le code :

1. Identifiez la signification de l'émoji
2. Cherchez une icône équivalente sur lucide.dev
3. Importez l'icône : `import { IconName } from 'lucide-react'`
4. Remplacez :
   ```tsx
   // Avant
   <span>🚀</span>

   // Après
   <Rocket className="w-6 h-6 text-primary" />
   ```

---

## Support

- Documentation Lucide : [lucide.dev/docs](https://lucide.dev/docs)
- GitHub Lucide : [github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide)
- Recherche d'icônes : [lucide.dev](https://lucide.dev)

---

**Dernière mise à jour** : Février 2026
