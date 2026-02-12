# Typographie - Koursorr

## Polices

### Sans-Serif (par défaut)
```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
```

La police principale est **Inter**, une police sans-serif moderne et très lisible, optimale pour les interfaces web.

### Serif
```css
font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
```

Utilisée pour des contenus éditoriaux ou des titres stylisés.

### Monospace
```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas;
```

Utilisée pour le code et les éléments techniques.

---

## Radius (Bordures Arrondies)

Le système utilise une variable CSS `--radius` pour définir l'arrondi des bordures.

### Valeurs

- **Base**: `0.5rem` (8px)
- **Small**: `calc(var(--radius) - 4px)` = 4px
- **Medium**: `calc(var(--radius) - 2px)` = 6px
- **Large**: `var(--radius)` = 8px

### Usage

```css
/* Petit arrondi */
border-radius: calc(var(--radius) - 4px);

/* Arrondi moyen */
border-radius: calc(var(--radius) - 2px);

/* Grand arrondi (par défaut) */
border-radius: var(--radius);
```

---

## Hiérarchie Typographique

### Titres

Les titres suivent la hiérarchie standard HTML :

- **h1** : Titre principal de la page (ex: nom du cours)
- **h2** : Sections principales
- **h3** : Sous-sections
- **h4** : Sous-sous-sections
- **h5, h6** : Niveaux de détail supplémentaires

### Corps de Texte

- **Paragraphe standard** : Taille de base (1rem / 16px)
- **Small** : Texte secondaire ou notes (0.875rem / 14px)
- **Large** : Texte d'introduction (1.125rem / 18px)

### Code

```tsx
// Inline code
<code className="text-sm">console.log()</code>

// Code block
<pre className="bg-muted rounded-lg p-4">
  <code>const greeting = "Hello, World!";</code>
</pre>
```

---

## Configuration

### Tailwind CSS

La configuration typographique est définie dans `tailwind.config.ts` :

```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo'],
    },
  },
}
```

### Variables CSS

Les variables sont dans [app/styles/theme.css](../../app/styles/theme.css) :

```css
:root {
  --radius: 0.5rem;
}
```

---

## Bonnes Pratiques

### Lisibilité

- **Line height** : Utiliser `leading-relaxed` (1.625) pour les paragraphes
- **Largeur maximale** : Limiter à `max-w-prose` (~65ch) pour le contenu textuel
- **Contraste** : Assurer un ratio minimum de 4.5:1 (WCAG AA)

### Hiérarchie Visuelle

- Utiliser la taille pour l'importance (h1 > h2 > h3)
- Utiliser le poids pour l'emphase (`font-semibold`, `font-bold`)
- Utiliser la couleur pour le contexte (`text-muted-foreground`, `text-destructive`)

### Responsive

```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Titre Responsive
</h1>
```

---

## Référence

Voir aussi :
- [colors.md](./colors.md) - Palette de couleurs complète
- [categories.md](./categories.md) - Couleurs des catégories de cours
