# Couleurs des Catégories de Cours - Koursorr

Les catégories de cours utilisent des gradients distinctifs pour créer une identité visuelle forte et faciliter la navigation.

---

## Gradients par Catégorie

### 1. Fondamentaux
```css
background: linear-gradient(to right, var(--primary), var(--brand-secondary));
/* Teal → Violet */
```

**Codes couleurs** :
- `from-primary` : `rgb(0, 150, 136)` (Teal)
- `to-brand-secondary` : `rgb(124, 58, 237)` (Violet)

**Usage** : Concepts de base, introduction, prérequis

---

### 2. Modes de Rendu
```css
background: linear-gradient(to right, #3b82f6, #06b6d4);
/* Bleu → Cyan */
```

**Codes couleurs** :
- `from-blue-500` : `#3b82f6` (Bleu)
- `to-cyan-500` : `#06b6d4` (Cyan)

**Usage** : SSR, SSG, ISR, CSR, Hybrid

---

### 3. Optimisations
```css
background: linear-gradient(to right, #f97316, #f59e0b);
/* Orange → Ambre */
```

**Codes couleurs** :
- `from-orange-500` : `#f97316` (Orange)
- `to-amber-500` : `#f59e0b` (Ambre)

**Usage** : Performance, optimisation frontend/backend, caching

---

### 4. Bonnes Pratiques
```css
background: linear-gradient(to right, #a855f7, #ec4899);
/* Violet → Rose */
```

**Codes couleurs** :
- `from-purple-500` : `#a855f7` (Violet)
- `to-pink-500` : `#ec4899` (Rose)

**Usage** : Sécurité, accessibilité, patterns, architecture

---

### 5. Avancé
```css
background: linear-gradient(to right, #ef4444, #f43f5e);
/* Rouge → Rose */
```

**Codes couleurs** :
- `from-red-500` : `#ef4444` (Rouge)
- `to-rose-500` : `#f43f5e` (Rose)

**Usage** : Techniques expertes, patterns avancés, edge cases

---

## Implémentation

### Dans le CourseLayout

```tsx
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

### Application du Gradient

Les gradients sont appliqués via Tailwind avec `bg-gradient-to-r` et `bg-clip-text` pour créer des titres colorés :

```tsx
<h2 className={`
  text-transparent
  bg-gradient-to-r
  ${category.color}
  bg-clip-text
  font-bold
`}>
  {category.label}
</h2>
```

---

## Accessibilité

### Contraste

Les gradients sont principalement décoratifs. Assurez-vous de :
- Utiliser un texte standard avec bon contraste pour le contenu
- Réserver les gradients aux titres et éléments visuels
- Tester avec les outils d'accessibilité (Lighthouse, axe DevTools)

### Mode Sombre

Les gradients fonctionnent automatiquement en mode sombre car ils utilisent des couleurs absolues (pas de variables CSS). Vérifier visuellement que le contraste reste suffisant.

---

## Extension

Pour ajouter une nouvelle catégorie :

1. Choisir un gradient cohérent avec la palette existante
2. Ajouter dans le tableau `categories` du CourseLayout
3. Utiliser des couleurs Tailwind standard (`from-{color}-500 to-{color}-500`)
4. Tester en mode light et dark
5. Documenter ici

---

## Référence

Voir aussi :
- [colors.md](./colors.md) - Palette de couleurs complète
- [cours-structure.md](../architecture/cours-structure.md) - Architecture des cours
