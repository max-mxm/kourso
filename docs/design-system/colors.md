# Palette de Couleurs - Koursorr

## Mode Light (Clair)

### Couleurs principales
- **Primary**: `rgb(0, 150, 136)` - Teal principal
- **Primary Foreground**: `rgb(255, 255, 255)` - Blanc
- **Secondary**: `rgb(241, 245, 249)` - Gris clair
- **Secondary Foreground**: `rgb(15, 23, 42)` - Gris très sombre
- **Brand Secondary**: `rgb(124, 58, 237)` - Violet
- **Brand Secondary Foreground**: `rgb(255, 255, 255)` - Blanc

### Couleurs de fond
- **Background**: `rgb(255, 255, 255)` - Blanc
- **Foreground**: `rgb(10, 10, 10)` - Noir quasi-pur
- **Card**: `rgb(255, 255, 255)` - Blanc
- **Card Foreground**: `rgb(10, 10, 10)` - Noir quasi-pur

### Couleurs d'accentuation
- **Muted**: `rgb(241, 245, 249)` - Gris clair
- **Muted Foreground**: `rgb(100, 116, 139)` - Gris moyen
- **Accent**: `rgb(224, 242, 241)` - Teal très clair
- **Accent Foreground**: `rgb(0, 77, 64)` - Teal sombre

### Couleurs de bordure et input
- **Border**: `rgb(226, 232, 240)` - Gris clair
- **Input**: `rgb(226, 232, 240)` - Gris clair
- **Ring**: `rgb(0, 150, 136)` - Teal (focus)

### Couleurs de graphique
- **Chart 1**: `rgb(0, 150, 136)` - Teal
- **Chart 2**: `rgb(0, 121, 107)` - Teal moyen
- **Chart 3**: `rgb(0, 105, 92)` - Teal sombre
- **Chart 4**: `rgb(0, 77, 64)` - Teal très sombre
- **Chart 5**: `rgb(56, 142, 60)` - Vert

### Couleurs destructives
- **Destructive**: `rgb(239, 68, 68)` - Rouge
- **Destructive Foreground**: `rgb(255, 255, 255)` - Blanc

---

## Mode Dark (Sombre)

### Couleurs principales
- **Primary**: `rgb(0, 150, 136)` - Teal (identique au light)
- **Primary Foreground**: `rgb(255, 255, 255)` - Blanc
- **Secondary**: `rgb(39, 39, 42)` - Gris sombre
- **Secondary Foreground**: `rgb(250, 250, 250)` - Blanc cassé
- **Brand Secondary**: `rgb(139, 92, 246)` - Violet plus clair
- **Brand Secondary Foreground**: `rgb(255, 255, 255)` - Blanc

### Couleurs de fond
- **Background**: `rgb(10, 10, 10)` - Noir quasi-pur
- **Foreground**: `rgb(250, 250, 250)` - Blanc cassé
- **Card**: `rgb(24, 24, 27)` - Gris très sombre
- **Card Foreground**: `rgb(250, 250, 250)` - Blanc cassé

### Couleurs d'accentuation
- **Muted**: `rgb(39, 39, 42)` - Gris sombre
- **Muted Foreground**: `rgb(161, 161, 170)` - Gris moyen
- **Accent**: `rgb(63, 63, 70)` - Gris moyen sombre
- **Accent Foreground**: `rgb(250, 250, 250)` - Blanc cassé

### Couleurs de bordure et input
- **Border**: `rgb(39, 39, 42)` - Gris sombre
- **Input**: `rgb(39, 39, 42)` - Gris sombre
- **Ring**: `rgb(0, 150, 136)` - Teal (focus)

### Couleurs de graphique
- **Chart 1**: `rgb(0, 150, 136)` - Teal
- **Chart 2**: `rgb(0, 169, 157)` - Teal clair
- **Chart 3**: `rgb(77, 182, 172)` - Teal moyen clair
- **Chart 4**: `rgb(128, 203, 196)` - Teal très clair
- **Chart 5**: `rgb(165, 214, 167)` - Vert clair

### Couleurs destructives
- **Destructive**: `rgb(127, 29, 29)` - Rouge sombre
- **Destructive Foreground**: `rgb(250, 250, 250)` - Blanc cassé

---

## Sidebar (pour référence future)

### Mode Light
- **Background**: `rgb(248, 250, 252)`
- **Foreground**: `rgb(10, 10, 10)`
- **Primary**: `rgb(0, 150, 136)`
- **Accent**: `rgb(224, 242, 241)`
- **Border**: `rgb(226, 232, 240)`

### Mode Dark
- **Background**: `rgb(24, 24, 27)`
- **Foreground**: `rgb(250, 250, 250)`
- **Primary**: `rgb(0, 150, 136)`
- **Accent**: `rgb(39, 39, 42)`
- **Border**: `rgb(39, 39, 42)`

---

## Variables CSS

Les variables CSS sont définies dans [app/styles/shadcn-ui.css](../../app/styles/shadcn-ui.css).

### Usage

```css
.mon-composant {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### Référence

Voir aussi :
- [typography.md](./typography.md) - Typographie et polices
- [categories.md](./categories.md) - Couleurs des catégories de cours
