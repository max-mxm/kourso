# Bonnes Pratiques - Demos Live et Simulateurs Interactifs

Standards de qualite et workflow pour creer, publier et maintenir des demos interactives sur maxpaths.

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
    title: 'Titre aguicheur de la demo',
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

#### Titre aguicheur (champ `title`)

Le champ `title` dans le tableau `DEMOS` est celui affiche sur la page d'accueil. Il doit etre **concu pour donner envie de cliquer** et est distinct du titre technique de la page de demo.

**Regles pour un titre efficace :**
- Mettre en avant les technologies cles (React.memo, SSR, useMemo...)
- Utiliser un verbe d'action ou une invitation ("teste en direct", "compare en live", "mesure maintenant")
- Rester concis : 5-8 mots maximum
- Ne pas utiliser le mot "guide" ou "cours"

**Les 3 titres d'une demo :**

| Emplacement | Champ | Style | Exemple |
|-------------|-------|-------|---------|
| Page d'accueil | `DEMOS[].title` dans `lib/content.ts` | Court, descriptif | "Simulateur de performance React" |
| Page catalogue | `courses[].title` dans `app/guides/page.tsx` | Aguicheur, incite a l'action | "useMemo, useCallback et React.memo teste en live" |
| Page demo (h1) | h1 dans la page `simulateur-*/page.tsx` | Technique, precis | "useMemo, useCallback et React.memo teste en live" |

**Mauvais exemples :**
- "Demo de test" -- trop generique
- "Simulateur" -- pas assez descriptif
- "Guide interactif React" -- le mot "guide" prete a confusion

**Bons exemples :**
- "Simulateur de performance React" -- technologie + concept
- "Comparateur de modes de rendering" -- action + sujet technique
- "Benchmark live : React.memo vs useMemo" -- action + comparaison technique

### 2. Landing Page (Carte de Demo)

La demo apparait automatiquement dans la section "Testez en direct" de la page d'accueil (`app/page.tsx`) via `getDemosForLanding()`.

**Regle de coherence** : Chaque demo utilise le composant partage `DemoCard` de `components/demo-card.tsx`. Ne jamais creer de carte custom pour une demo individuelle.

Le rendu est automatique :
```tsx
// app/page.tsx
{demos.map((demo, index) => (
  <RevealOnScroll key={demo.href} delay={index * 80}>
    <DemoCard {...demo} />
  </RevealOnScroll>
))}
```

Les props de `DemoCard` proviennent directement de l'entree `DEMOS` dans `lib/content.ts`. Le composant adapte ses couleurs (badge, icone, barre d'accent) selon `gradientFrom` :
- `from-orange-500` : badge et icone orange
- `from-blue-500` : badge et icone bleu
- Autre : fallback vers `text-primary`

Si une nouvelle palette de couleur est necessaire, etendre la logique conditionnelle dans `components/demo-card.tsx`.

### 3. Lien dans le Guide Parent

#### Trouver l'emplacement ideal

Avant de placer le CTA, parcourir systematiquement les sections du guide parent pour identifier la section qui traite de la **theorie correspondante** a ce que la demo permet de tester.

**Methode de selection :**
1. Lister toutes les sections du guide parent (fichier `page.tsx` du guide)
2. Identifier la ou les sections dont le contenu theorique est directement illustre par la demo
3. Privilegier la section qui introduit le concept principal de la demo (pas la conclusion ni l'introduction)
4. Si plusieurs sections sont pertinentes, placer le CTA dans la **premiere section pertinente** (chronologiquement dans le guide) et ajouter un lien secondaire dans les sections suivantes

**Demander confirmation a l'utilisateur** sur l'emplacement choisi avant d'inserer le CTA. Presenter :
- Le nom de la section selectionnee et son ID
- La justification (pourquoi cette section est la plus pertinente)
- Les alternatives eventuelles

**Exemples existants de placements :**

| Demo | Guide parent | Section du CTA | Justification |
|------|-------------|----------------|---------------|
| Simulateur Performance | react-memoization | `comparaison-complete` | Apres la comparaison theorique, la demo permet de tester en vrai |
| Simulateur Performance | nextjs-demo | `frontend-performance` | La section traite des optimisations frontend, la demo les mesure |
| Comparateur Rendering | nextjs-demo | `comparison` | La section compare les modes de rendu, la demo les visualise |

#### Code du CTA

Ajouter un CTA prominent dans la section selectionnee :

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

### 4. Page Catalogue des Guides (`app/guides/page.tsx`)

La page catalogue liste les demos et guides dans un tableau `courses` en dur. Pour chaque nouvelle demo, ajouter une entree :

```ts
// app/guides/page.tsx
{
  id: '[parent]/simulateur-[nom]',
  title: 'Titre aguicheur pour le catalogue',  // Engageant, incite a l'action
  description: 'Description engageante...',
  icon: Timer,  // ou icone Lucide pertinente
  tags: ['Tag1', 'Tag2', 'Interactif'],
  level: 'Tous niveaux',
  duration: '10min',
  gradient: 'from-orange-500 to-amber-500',
  color: 'rgb(249, 115, 22)',
  ribbon: 'Interactif'   // <-- Active le badge "Live" anime
}
```

#### Le badge "Live" anime

La propriete `ribbon` declenche l'affichage d'un badge orange avec point anime en haut a droite de la carte :

```tsx
{course.ribbon && (
  <div className="absolute right-4 top-4 z-10">
    <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      Live
    </span>
  </div>
)}
```

**Valeurs de `ribbon` utilisees :**
- `'Interactif'` : pour les demos standalone (ex: simulateur-performance)
- `'Testez en direct'` : pour les guides qui contiennent des demos liees (ex: nextjs-demo)

Le texte affiche dans le badge est toujours "Live" (hardcode dans le JSX), la valeur de `ribbon` sert de `title` accessible au survol.

### 5. Page Catalogue des Démos (`app/demos/page.tsx`)

La demo apparaitra automatiquement dans le catalogue dedié `/demos` des qu'elle est ajoutee au tableau `DEMOS` dans `lib/content.ts`.

**Verification :**
1. Aller sur `/demos`
2. Verifier que la demo apparait dans la grille
3. Tester le filtrage par tags (Performance, Next.js, React, SSR)
4. Verifier que le lien redirige correctement vers la demo

**Note** : Le catalogue `/demos` affiche uniquement les demos (simulateurs interactifs), contrairement au catalogue `/guides` qui affiche les guides complets sans les demos.

### 6. Badge dans la Sidebar du Guide Parent

Le composant `CourseLayout` (`components/course/course-layout.tsx`) supporte un champ `badge` sur chaque section. Utiliser ce champ pour signaler dans la sidebar que la section contient un lien vers la demo.

#### Ajouter le badge a la section du guide parent

Dans le fichier `page.tsx` du guide parent, ajouter `badge: 'LIVE'` a la section qui contient le CTA vers la demo :

```tsx
// app/guides/[parent]/page.tsx
{
  id: 'comparaison-complete',
  title: 'Comparaison Complete des Trois',
  icon: <Table2 className="w-4 h-4 flex-shrink-0" />,
  category: 'best-practices' as const,
  badge: 'LIVE',  // <-- Signale la demo dans la sidebar
  component: <ComparaisonCompleteSection />,
},
```

#### Rendu automatique dans la sidebar

Le badge s'affiche automatiquement a deux endroits :

**Sidebar desktop** (pilule orange a droite du titre de section) :
```tsx
{section.badge && (
  <span className="shrink-0 rounded-md bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
    {section.badge}
  </span>
)}
```

**Header de section** (pilule orange a droite du titre h2) :
```tsx
{section.badge && (
  <span className="rounded-lg bg-orange-500/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
    {section.badge}
  </span>
)}
```

Ce badge permet a l'utilisateur de reperer rapidement depuis la sidebar quelle section du guide donne acces a la demo interactive.

### 7. Generer les Keywords Techniques de Recherche

Apres avoir ajoute la demo a `lib/content.ts` et au guide parent, executer :

```
/generate-keywords demo:{parent}/simulateur-{nom}
```

Cette commande analyse la demo et genere des keywords **exclusivement techniques** pour la recherche Cmd+K :
- Noms de fonctions/API benchmarkees (ex: `React.memo`, `useMemo`, `useCallback`)
- Metriques mesurees (ex: "performance.now", "re-render count", "virtual dom diff")
- Termes techniques FR/EN (ex: "reconciliation" / "arbre de rendu")
- Acronymes (ex: CWV, LCP, CLS, INP)

Les keywords seront ajoutes dans `lib/search-index.ts`.

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

### Navigation & Recherche
- [ ] Entree dans le tableau `DEMOS` de `lib/content.ts`
- [ ] Titre landing aguicheur et distinct du titre technique de la page
- [ ] Carte landing coherente avec les autres (composant `DemoCard` partage, palette supportee)
- [ ] Demo visible dans le catalogue `/demos`
- [ ] Filtrage par tags fonctionne correctement dans `/demos`
- [ ] Entree dans le tableau `courses` de `app/guides/page.tsx` avec `ribbon` pour badge "Live"
- [ ] Emplacement du CTA dans le guide parent valide par l'utilisateur
- [ ] CTA dans le guide parent (section pertinente)
- [ ] Badge `'LIVE'` ajoute a la section du guide parent dans `CourseLayout`
- [ ] Liens fonctionnels (demo -> guide, guide -> demo)
- [ ] Commande `/generate-keywords` executee
- [ ] Keywords techniques ajoutes dans `lib/search-index.ts` (noms d'API, fonctions benchmarkees, metriques)
- [ ] Recherche Cmd+K testee avec les termes techniques de la demo

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

### 6. Carte Custom sur la Landing Page
- Toujours utiliser le composant partage `DemoCard` de `components/demo-card.tsx`
- Ne jamais creer de composant de carte specifique a une demo
- Verifier que `gradientFrom` correspond a une palette geree par `DemoCard` (orange ou bleu)

### 7. Oubli du Badge "Live" sur le Catalogue
- Ajouter systematiquement `ribbon: 'Interactif'` dans le tableau `courses` de `app/guides/page.tsx`
- Sans le `ribbon`, la demo n'est pas visuellement distinguee des guides dans le catalogue

### 8. Titre Generique ou Identique Partout
- Le titre dans `DEMOS` (landing) doit etre different du titre de la page de demo
- Eviter les titres generiques ("Demo", "Test", "Simulateur" seul)
- Mettre en avant la technologie et l'action dans chaque titre

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
