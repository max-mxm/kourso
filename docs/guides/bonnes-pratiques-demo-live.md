# Bonnes Pratiques - Demos Live et Simulateurs Interactifs

Standards de qualite et workflow pour creer, publier et maintenir des demos interactives sur Koursorr.

---

## Vue d'Ensemble

### Qu'est-ce qu'une Demo Live ?

Une demo live est une page interactive standalone qui permet aux utilisateurs de manipuler, tester et observer des concepts en temps reel directement dans leur navigateur. Contrairement a un guide (qui est pedagogique et lineaire), une demo live est experiential : l'utilisateur interagit avec du vrai code et voit les resultats immediatement.

### Difference avec un Guide

| Critere | Guide | Demo Live |
|---------|-------|-----------|
| Format | Lineaire, lecture progressive | Interactif, manipulation directe |
| Composant layout | `CourseLayout` avec sections | Page standalone avec composant custom |
| Contenu | Theorie + code + comparaisons | Interface interactive + mesures reelles |
| Duree | 1h-4h de lecture | 5-15min d'experimentation |
| Lien | Autonome | Toujours liee a un guide parent |
| Navigation landing | Section "Guides" | Section "Testez en direct" |

### Demos Existantes

| Demo | Route | Guide parent | Theme couleur |
|------|-------|-------------|---------------|
| Simulateur Performance React | `/guides/nextjs-demo/simulateur-performance` | react-memoization | Orange/Ambre |
| Comparateur Modes de Rendering | `/guides/nextjs-demo/simulateur-rendering` | nextjs-demo | Bleu/Cyan |

---

## Structure de Fichiers

### Convention de Nommage

```
app/guides/[guide-parent]/simulateur-[nom]/
  page.tsx          # Page principale (client component)
```

Les composants specifiques a la demo vivent dans le dossier `_components/` du guide parent :

```
app/guides/[guide-parent]/
  _components/
    performance-demo.tsx       # Composant de demo
    heavy-list-examples.tsx    # Scenarios de test
  _constants/
    performance-code-tabs.ts   # Onglets code source
  simulateur-[nom]/
    page.tsx                   # Point d'entree
```

**Regles de nommage :**
- Prefixe obligatoire : `simulateur-`
- Slug en kebab-case
- Descriptif et court : `simulateur-performance`, `simulateur-rendering`

---

## Design Obligatoire

### Structure de Page

Chaque demo live doit suivre cette structure exacte :

```tsx
'use client';

export default function SimulateurPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container max-w-5xl py-8 md:py-12 space-y-8">

        {/* 1. Navigation retour (obligatoire) */}
        <Link href="/guides/[parent]#[section]" className="...">
          <ArrowLeft /> Retour au guide [Nom]
        </Link>

        {/* 2. Header */}
        <div className="space-y-4">
          {/* Eyebrow gradient + badge INTERACTIF */}
          {/* Titre h1 */}
          {/* Description */}
          {/* Callout mesures reelles (si applicable) */}
        </div>

        {/* 3. Demo interactive (carte glassmorphique) */}
        <div className="rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm md:p-8 dark:bg-slate-900/50 dark:shadow-slate-950/50">
          {/* Composant interactif */}
          {/* Onglets code source */}
        </div>

        {/* 4. CTA retour vers la theorie */}
        <Link href="/guides/[parent]#[section]" className="group block rounded-2xl ...">
          {/* Icone + titre + description */}
        </Link>

      </div>
    </div>
  );
}
```

### Elements Visuels Obligatoires

#### Fond de page
```tsx
className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
```

#### Eyebrow avec gradient de categorie
```tsx
<span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
  Optimisations
</span>
```

Utiliser le gradient correspondant a la categorie du guide parent :
- Optimisations : `from-orange-500 to-amber-500`
- Modes de Rendu : `from-blue-500 to-cyan-500`
- Fondamentaux : `from-primary to-brand-secondary`

#### Badge INTERACTIF
```tsx
<span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
  Interactif
</span>
```

#### Carte glassmorphique (conteneur de demo)
```tsx
className="rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm md:p-8 dark:bg-slate-900/50 dark:shadow-slate-950/50"
```

#### Callout "Mesures reelles" (si la demo utilise performance.now())
```tsx
<div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 max-w-3xl">
  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
    <div className="h-2 w-2 rounded-full bg-green-500" />
  </div>
  <div className="space-y-1">
    <p className="text-sm font-semibold text-green-700 dark:text-green-400">
      Mesures reelles, pas de simulation
    </p>
    <p className="text-sm text-muted-foreground">
      Description des mesures...
    </p>
  </div>
</div>
```

---

## Standards Interactifs

### Mesures Reelles

- Utiliser `performance.now()` pour les mesures de temps
- Ne jamais simuler des resultats fictifs
- Afficher clairement que les resultats varient selon la machine

### Controles Utilisateur

Chaque demo doit inclure au minimum :
- Un bouton d'action principal ("Lancer le test", "Comparer")
- Au moins un parametre ajustable (slider, toggle)
- Un feedback visuel immediat apres chaque action

### Feedback Visuel

- Barres de progression colorees selon la performance :
  - Vert : excellent (< seuil bas)
  - Orange : acceptable (entre les 2 seuils)
  - Rouge : a optimiser (> seuil haut)
- Animations de transition fluides
- Indicateurs de tendance (icones TrendingUp/TrendingDown)

### Onglets Code Source

Chaque demo doit montrer le code de chaque approche comparee :
```tsx
<div className="border-t border-border pt-6">
  <h3 className="font-semibold text-foreground mb-4">
    Code source de chaque approche
  </h3>
  {/* Tabs + CodeBlock pour chaque variante */}
</div>
```

---

## Ajout a la Navigation

### 1. Ajouter dans `lib/content.ts`

Ajouter l'entree dans le tableau `DEMOS` :

```ts
const DEMOS: LandingDemoItem[] = [
  {
    href: '/guides/[parent]/simulateur-[nom]',
    title: 'Titre de la demo',
    description: 'Description concise...',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    accentColor: 'rgb(249, 115, 22)',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-500',
    badge: 'INTERACTIF',
    duration: '10min',
    relatedGuide: '/guides/[parent]',
  },
];
```

### 2. Landing Page

La demo apparaitra automatiquement dans la section "Testez en direct" via `getDemosForLanding()`.

### 3. Lien dans le Guide Parent

Ajouter un CTA prominent dans la section la plus pertinente du guide parent :

```tsx
<Link
  href="/guides/[parent]/simulateur-[nom]"
  className="group block p-6 rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-amber-500/5 hover:from-orange-500/10 hover:to-amber-500/10 hover:border-orange-500/30 hover:shadow-lg transition-all duration-300"
>
  <div className="flex items-center justify-between gap-4">
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Timer className="w-5 h-5 text-orange-500" />
        <span className="text-lg font-semibold text-foreground">
          Testez en live
        </span>
        <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
          Interactif
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        Description de ce que la demo permet de tester...
      </p>
    </div>
    <ArrowRight className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
  </div>
</Link>
```

---

## Checklist de Validation

### Structure
- [ ] Page dans `app/guides/[parent]/simulateur-[nom]/page.tsx`
- [ ] Composants dans `_components/` du guide parent
- [ ] Convention `'use client'` en haut du fichier
- [ ] Navigation retour vers le guide parent

### Design
- [ ] Fond gradient slate (light + dark)
- [ ] Header : eyebrow gradient + badge INTERACTIF + titre + description
- [ ] Carte glassmorphique pour le conteneur de demo
- [ ] CTA retour vers la theorie en bas de page
- [ ] Pas d'emojis classiques

### Interactivite
- [ ] Mesures reelles (pas de simulations fictives)
- [ ] Au moins un controle utilisateur (slider, toggle, bouton)
- [ ] Feedback visuel immediat (couleurs, animations)
- [ ] Onglets code source pour chaque approche

### Navigation
- [ ] Entree dans le tableau `DEMOS` de `lib/content.ts`
- [ ] CTA dans le guide parent (section pertinente)
- [ ] Liens fonctionnels (demo -> guide, guide -> demo)

### Qualite
- [ ] Dark mode OK
- [ ] Responsive (mobile / tablette / desktop)
- [ ] Accessibilite clavier
- [ ] Contraste suffisant (4.5:1)
- [ ] Pas d'erreurs console
- [ ] Build production reussit

---

## Erreurs Courantes a Eviter

### 1. Simulations Fictives
- Ne jamais hardcoder des temps de rendu ou des metriques
- Utiliser `performance.now()` pour des mesures reelles
- Indiquer clairement que les resultats varient selon la machine

### 2. Pas de Lien Retour
- Toujours inclure un lien de navigation retour en haut de page
- Toujours inclure un CTA vers la theorie en bas de page
- La demo n'est pas autonome : elle complete un guide

### 3. Oubli du Dark Mode
- Tester systematiquement `dark:` pour tous les fonds, textes et bordures
- Le fond glassmorphique necessite `dark:bg-slate-900/50`
- Les gradients de texte fonctionnent en dark mode (verifier le contraste)

### 4. Demo Sans Code Source
- Toujours montrer le code de chaque approche comparee
- Utiliser le composant `CodeBlock` avec syntax highlighting
- Permettre a l'utilisateur de comprendre ce qui est teste

### 5. Pas de CTA dans le Guide Parent
- La demo doit etre decouvrable depuis le guide parent
- Placer le CTA dans la section la plus pertinente (apres la theorie correspondante)
- Utiliser le design de CTA standard (gradient subtil + badge INTERACTIF)

---

## Exemples de Reference

### Simulateur Performance React
- **Route** : `/guides/nextjs-demo/simulateur-performance`
- **Fichier** : `app/guides/nextjs-demo/simulateur-performance/page.tsx`
- **Composants** : `performance-demo.tsx`, `heavy-list-examples.tsx`
- **Theme** : Orange/Ambre (categorie optimization)

### Comparateur Modes de Rendering
- **Route** : `/guides/nextjs-demo/simulateur-rendering`
- **Fichier** : `app/guides/nextjs-demo/simulateur-rendering/page.tsx`
- **Composant** : `rendering-simulator.tsx`
- **Theme** : Bleu/Cyan (categorie rendering)

---

**Derniere mise a jour** : Fevrier 2026
