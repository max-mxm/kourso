# Guide : Ajouter un Nouveau Guide Pratique

Guide complet pour documenter et publier un nouveau guide pratique sur maxpaths.

---

## Vue d'Ensemble

Ajouter un guide pratique implique 6 étapes principales :
1. Créer la structure de fichiers
2. Développer les sections du guide
3. SEO, GEO et Metadata (schemas JSON-LD, OG images, meta tags)
4. Ajouter le guide à la navigation
5. Tester et valider (dont tests SEO/GEO)
6. Générer les keywords techniques de recherche

---

## Étape 1 : Créer la Structure de Fichiers

### 1.1 Créer le Dossier du Guide

```bash
# Créer la structure
mkdir -p app/guides/[slug-du-guide]/_sections
```

**Règles de nommage du slug :**
- Tout en minuscules
- Mots séparés par des tirets `-`
- Descriptif et court (2-3 mots max)
- Exemples : `nextjs-demo`, `react-19-advanced`, `typescript-fundamentals`

### 1.2 Créer le Point d'Entrée (`page.tsx`)

Créer `app/guides/[slug-du-guide]/page.tsx` :

```tsx
import type { Metadata } from 'next';
import { CourseLayout } from '@/components/course/course-layout';

// Imports des sections (default ou named exports)
import IntroductionSection from './_sections/introduction';
import Section2 from './_sections/section-2';
// ... autres imports

// --- SEO Metadata (OBLIGATOIRE) ---
export const metadata: Metadata = {
  title: 'Titre SEO du Guide (50-70 caracteres, avec mots-cles)',
  description: 'Description SEO (150-160 caracteres). Inclure mots-cles principaux et proposition de valeur.',
  openGraph: {
    title: 'Titre OG (peut etre different du title SEO, plus engageant)',
    description: 'Description OG pour les reseaux sociaux (max 200 caracteres).',
    type: 'article',
    images: [{ url: '/api/og?title=Titre+Encode+URL&category=fundamentals', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titre Twitter Card',
    description: 'Description Twitter Card (max 200 caracteres).',
    images: ['/api/og?title=Titre+Encode+URL&category=fundamentals'],
  },
};

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

  // --- JSON-LD Course Schema (OBLIGATOIRE pour GEO) ---
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Titre complet du guide',
    description: 'Description du guide (meme que metadata.description)',
    provider: { '@type': 'Organization', name: 'Maxpaths', url: 'https://www.maxpaths.dev' },
    educationalLevel: 'Intermediaire', // ou 'Debutant', 'Avance'
    inLanguage: 'fr',
    numberOfCredits: sections.length, // Nombre de sections
    timeRequired: 'PT3H', // Format ISO 8601 (PT2H = 2h, PT3H30M = 3h30)
    author: { '@type': 'Person', name: 'Maxime Morellon', url: 'https://www.maxpaths.dev/about' },
    isAccessibleForFree: true,
  };

  // --- JSON-LD BreadcrumbList (OBLIGATOIRE pour SEO) ---
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.maxpaths.dev' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.maxpaths.dev/guides' },
      { '@type': 'ListItem', position: 3, name: 'Nom Court du Guide' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CourseLayout
        title="Titre de Mon Guide"
        subtitle="Description courte - X sections"
        sections={sections}
      />
    </>
  );
}
```

### 1.3 Créer les Sections

Chaque section = 1 fichier dans `_sections/` :

```tsx
// app/guides/[slug]/_sections/ma-bonne-pratique.tsx
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

Créer `app/guides/[slug-du-guide]/README.md` avec :
- Description du guide
- Structure des sections
- Prérequis
- Objectifs pédagogiques
- Références

Voir [`app/guides/react-19-advanced/README.md`](../../app/guides/react-19-advanced/README.md) comme exemple.

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

## Etape 3 : SEO, GEO et Metadata (OBLIGATOIRE)

Chaque guide doit avoir une couverture SEO/GEO complete pour etre correctement indexe par Google ET cite par les moteurs IA (ChatGPT, Perplexity, Claude, Copilot).

### 3.1 Metadata dans `page.tsx`

L'export `metadata` est **obligatoire** dans chaque `page.tsx` de guide. Voir le template a l'etape 1.2.

**Regles pour les metadata :**

| Champ | Longueur | Contenu |
|-------|----------|---------|
| `title` | 50-70 caracteres | Mot-cle principal + sujet technique. Sera affiche comme `{title} \| Maxpaths` |
| `description` | 150-160 caracteres | Proposition de valeur + mots-cles secondaires |
| `openGraph.title` | 60-90 caracteres | Titre engageant pour les reseaux sociaux (peut differer du title SEO) |
| `openGraph.description` | max 200 caracteres | Description pour LinkedIn, Slack, Discord |
| `twitter.title` | max 70 caracteres | Titre optimise pour Twitter/X |
| `twitter.description` | max 200 caracteres | Description optimise pour Twitter/X |

**Regles pour l'image OG :**
- Utiliser l'API dynamique : `/api/og?title=Titre+Encode+URL&category=categorie`
- Categories disponibles : `fundamentals`, `rendering`, `optimization`, `best-practices`, `advanced`
- Format genere : 1200x630px avec gradient de la categorie
- Encoder le titre avec `+` pour les espaces et `%26` pour `&`

### 3.2 JSON-LD Course Schema

Le schema `Course` est **obligatoire** pour chaque guide. Il permet :
- Les rich results Google (affichage enrichi dans les resultats de recherche)
- La citation par les moteurs IA qui exploitent les donnees structurees
- Le format ISO 8601 pour `timeRequired` : `PT2H` (2h), `PT3H30M` (3h30)

### 3.3 JSON-LD BreadcrumbList

Le schema `BreadcrumbList` est **obligatoire**. Il :
- Aide Google a comprendre la hierarchie du site
- Genere les breadcrumbs dans les resultats de recherche
- Ameliore la citabilite par les IA (structure claire)

### 3.4 Ajouter dans `lib/content.ts`

Ajouter le guide dans le tableau `GUIDES` avec **tous les champs SEO** :

```typescript
{
  href: '/guides/slug-du-guide',
  type: 'guide',
  title: 'Titre engageant du guide',
  description: 'Description (2-3 phrases).',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  accentColor: 'rgb(0, 150, 136)', // Couleur d'accent
  sections: 12,
  duration: '3h',
  level: 'Intermediaire',
  publishedAt: '2026-02-14', // Date ISO

  // SEO (OBLIGATOIRE)
  seoTitle: 'Titre SEO : Mot-Cle Principal - Sous-titre',
  seoDescription: 'Description SEO 150-160 caracteres avec mots-cles.',

  // Open Graph (OBLIGATOIRE)
  ogTitle: 'Titre OG engageant pour les reseaux sociaux',
  ogDescription: 'Description OG (max 200 caracteres).',
  ogImage: '/og-images/guides/slug-du-guide.jpg', // Optionnel si on utilise /api/og

  // Twitter Card (OBLIGATOIRE)
  twitterCard: 'summary_large_image',
  twitterTitle: 'Titre Twitter optimise',
  twitterDescription: 'Description Twitter (max 200 caracteres).',
},
```

Le champ `publishedAt` alimente aussi la rubrique "Nouveauté" de l'accueil.
Si le guide est le contenu le plus récent publié, il doit apparaître sous
l'écran d'accueil après son ajout dans `GUIDES`.

### 3.5 Bonnes Pratiques GEO (Generative Engine Optimization)

Pour maximiser la visibilite dans les moteurs IA (ChatGPT, Perplexity, Claude) :

1. **Reponse directe en debut de section** : Chaque section du guide devrait commencer par une reponse synthetique avant de developper
2. **Statistiques et donnees chiffrees** (+37% visibilite IA) : Inclure des metriques concretes quand possible
3. **Citations de sources** (+40% visibilite IA) : Citer la documentation officielle, des benchmarks, des etudes
4. **Ton autoritaire** (+25%) : Utiliser un langage d'expert confiant
5. **Termes techniques precis** (+18%) : Inclure la terminologie exacte du domaine

---

## Etape 4 : Ajouter le Guide à la Navigation

### 4.1 Page d'Accueil (`app/page.tsx`)

Ajouter une carte du guide dans la section "Guides pratiques" :

```tsx
{/* Votre nouveau guide */}
<Link
  href="/guides/[slug-du-guide]"
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

### 4.2 Index de Recherche (`lib/search-index.ts`)

Ajouter le guide et chacune de ses sections dans l'index de recherche pour qu'ils soient trouvables via la commande Cmd+K :

```typescript
// Dans lib/search-index.ts, ajouter dans SEARCH_INDEX :

// Le guide lui-meme
{
  type: 'guide',
  title: 'Titre du Guide',
  description: 'Description courte.',
  href: '/guides/slug-du-guide',
  tags: ['Tag 1', 'Tag 2'],
  keywords: ['mot-cle 1', 'synonyme', 'acronyme', 'terme EN'],
},

// Chaque section du guide
{
  type: 'guide-section',
  title: 'Titre de la Section',
  href: '/guides/slug-du-guide#section-id',
  tags: ['Tag'],
  parentTitle: 'Titre du Guide',
  keywords: ['synonyme', 'terme alternatif', 'nom API ou fonction'],
},
```

**Bonnes pratiques pour les `keywords` :**
- Inclure les acronymes (SSR, SSG, ISR, RSC, etc.)
- Inclure les traductions FR/EN des concepts ("rendu serveur" pour "Server-Side Rendering")
- Inclure les noms d'API/fonctions associes (`getServerSideProps`, `generateStaticParams`)
- Penser aux termes que les utilisateurs taperaient naturellement
- Pas de doublons avec le `title` (deja indexe automatiquement)

### 4.3 Page Catalogue (`app/guides/page.tsx`)

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

## Etape 5 : Tester et Valider

### 5.1 Lancer le Serveur de Développement

```bash
npm run dev
```

### 5.2 Tests Visuels

Naviguer vers `http://localhost:3000/guides/[slug-du-guide]` et vérifier :

- ✅ Progress bar fonctionne
- ✅ Scroll spy détecte section active
- ✅ Sidebar affiche toutes les sections
- ✅ Navigation entre sections fluide
- ✅ Mode dark/light fonctionne
- ✅ Responsive (mobile/tablette/desktop)

### 5.3 Tests Contenu

- ✅ CodeBlocks affichent le code correctement
- ✅ Syntax highlighting fonctionne
- ✅ Bouton copier fonctionne
- ✅ ConceptCards s'animent au scroll
- ✅ ComparisonTables sont scrollables sur mobile
- ✅ Pas d'erreurs console

### 5.4 Tests SEO/GEO

- Verifier les balises `<meta>` dans le `<head>` (title, description, og:*, twitter:*)
- Verifier les schemas JSON-LD (Course + BreadcrumbList) dans le `<head>`
- Tester l'image OG : naviguer vers `/api/og?title=Titre+Du+Guide&category=fundamentals`
- Valider avec [Rich Results Test](https://search.google.com/test/rich-results)
- Verifier que le guide est dans le sitemap (`/sitemap.xml`)

### 5.5 Tests Accessibilité

- ✅ Navigation clavier fonctionne (Tab, Enter)
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Contraste suffisant (ratio 4.5:1)
- ✅ Alt text sur images si utilisées
- ✅ ARIA labels corrects

### 5.6 Tests Performance

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

## Etape 6 : Générer les Keywords Techniques de Recherche

### 6.1 Exécuter la commande generate-keywords

Après avoir complété les étapes 1-4, exécuter la commande Claude Code :

```
/generate-keywords guide:{slug-du-guide}
```

Cette commande analyse en profondeur le contenu du guide (page.tsx, toutes les sections, README) et génère des keywords **exclusivement techniques** pour la recherche Cmd+K :
- Noms d'API, fonctions, hooks, méthodes (ex: `useQuery`, `safeParse`, `generateStaticParams`)
- Noms de librairies et outils (ex: "tanstack query", "valibot", "prisma")
- Acronymes techniques (ex: SSR, RSC, ISR, CWV)
- Concepts techniques FR/EN (ex: "rendu serveur" / "server rendering")
- Patterns et design patterns (ex: "stale-while-revalidate", "optimistic update")

### 6.2 Vérifier les keywords générés

Après exécution, vérifier dans `lib/search-index.ts` :
- Le guide principal a 7-15 keywords techniques
- Chaque section a 5-12 keywords techniques
- Les noms d'API/fonctions mentionnés dans le code sont tous présents
- Les keywords incluent des termes FR et EN
- Les acronymes pertinents sont présents
- Aucun keyword ne duplique le titre

### 6.3 Tester la recherche

Lancer `npm run dev` et tester la recherche Cmd+K avec :
- Un nom de fonction (ex: "useQuery", "safeParse")
- Un acronyme (ex: "SSR", "RSC")
- Un terme technique en français (ex: "rendu serveur")
- Un nom de librairie (ex: "tanstack", "valibot")

---

## Checklist Complète

Avant de considérer votre guide de bonnes pratiques terminé :

### Structure
- [ ] Dossier `app/guides/[slug]/` créé
- [ ] Fichier `page.tsx` créé
- [ ] Toutes les sections dans `_sections/` créées
- [ ] `README.md` complété avec contexte/REX

### SEO / GEO (OBLIGATOIRE)
- [ ] `export const metadata: Metadata` dans `page.tsx` (title, description, OG, Twitter)
- [ ] JSON-LD `Course` schema dans le return du composant
- [ ] JSON-LD `BreadcrumbList` schema dans le return du composant
- [ ] Image OG via `/api/og?title=...&category=...` (pas d'image statique inexistante)
- [ ] Guide ajoute dans `lib/content.ts` avec **tous les champs SEO** (seoTitle, seoDescription, ogTitle, ogDescription, twitterCard, twitterTitle, twitterDescription)
- [ ] Guide ajoute dans `app/sitemap.ts` avec la bonne URL `https://www.maxpaths.dev/guides/{slug}`
- [ ] Title SEO : 50-70 caracteres, mot-cle principal en premier
- [ ] Description SEO : 150-160 caracteres, proposition de valeur claire
- [ ] Domaine canonique : toujours `https://www.maxpaths.dev` (jamais `maxpaths.com`)

### Contenu
- [ ] 2-20 sections (recommandé : 8-15)
- [ ] Chaque section documente une bonne pratique testée
- [ ] Pas d'émojis classiques (utiliser icônes Lucide)
- [ ] Code examples issus de projets réels et testés
- [ ] Pas de hard-coding de couleurs

### Navigation & Recherche
- [ ] Guide ajouté à `app/page.tsx`
- [ ] Guide ajouté à `app/guides/page.tsx`
- [ ] Guide et sections ajoutés à `lib/search-index.ts`
- [ ] Guide visible dans la rubrique "Nouveauté" de l'accueil si son `publishedAt` est le plus récent
- [ ] Commande `/generate-keywords` exécutée
- [ ] Keywords techniques vérifiés (noms d'API, fonctions, librairies, acronymes, FR/EN)
- [ ] Recherche Cmd+K testée avec des termes techniques variés
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
- [ ] Schemas JSON-LD valides (verifier dans le `<head>` ou via Rich Results Test)
- [ ] Image OG generee correctement (`/api/og?title=...&category=...`)
- [ ] Guide present dans `/sitemap.xml`

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

- **Next.js Demo** : [`app/guides/nextjs-demo/`](../../app/guides/nextjs-demo/)
  - 21 sections couvrant les patterns testés
  - Exemple de guide complet avec REX

- **React 19 Advanced** : [`app/guides/react-19-advanced/`](../../app/guides/react-19-advanced/)
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

**Q : Comment ajouter mon guide à la recherche ?**
R : Mettre à jour `lib/search-index.ts` : ajouter une entrée pour le guide et une entrée par section, avec des `keywords` pertinents (acronymes, traductions FR/EN, noms de fonctions/API). Voir l'étape 3.2 ci-dessus.

---

**Dernière mise à jour** : Février 2026
