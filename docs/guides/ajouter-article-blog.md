# Guide : Ajouter un Article au Blog

Guide complet pour créer et publier un nouvel article sur le blog maxpaths.

---

## Vue d'ensemble

Le blog utilise une architecture **TypeScript pure (TSX)** sans MDX, avec :
- **Server Components** pour le contenu (SEO, performance)
- **Client Components** pour l'interactivité (scroll spy, progress bar)
- **Registre manuel** pour les articles (pas de file-system routing)

---

## Étape 1 : Créer la Structure de l'Article

### 1.1 Créer le Dossier

```bash
mkdir -p app/blog/_articles/nom-de-votre-article
```

**Convention de nommage** :
- Utiliser le kebab-case : `tdd-frontend-vs-backend`, `react-server-components`
- Slug = nom du dossier = URL finale
- Éviter les accents et caractères spéciaux

### 1.2 Créer les Fichiers

Votre dossier doit contenir **exactement 2 fichiers** :

```
app/blog/_articles/nom-de-votre-article/
├── metadata.ts    # Métadonnées de l'article
└── content.tsx    # Contenu de l'article
```

---

## Étape 2 : Définir les Métadonnées

Créer `metadata.ts` :

```typescript
import { ArticleMetadata } from '@/lib/blog/types';

export const metadata: ArticleMetadata = {
  // Identifiant unique (= nom du dossier)
  slug: 'nom-de-votre-article',

  // SEO : Titre et description
  title: 'Titre de votre article',
  description: 'Description courte pour les cartes et le SEO (150-200 caractères)',

  // Auteur et dates
  author: 'Votre Nom',
  publishedAt: '2025-02-12',
  updatedAt: '2025-02-12', // Optionnel

  // Métadonnées pratiques
  readingTime: 15, // Temps de lecture estimé en minutes
  category: 'testing', // Voir catégories ci-dessous

  // Tags pour filtres et SEO
  tags: ['TDD', 'Testing', 'Frontend', 'React'],

  // Featured article (optionnel, max 1 par catégorie)
  featured: true,

  // Table des matières (MANUELLE)
  tableOfContents: [
    { id: 'introduction', title: 'Introduction', level: 2 },
    { id: 'probleme-visuel', title: 'Le problème du rendu visuel', level: 2 },
    { id: 'solutions', title: 'Solutions pratiques', level: 2 },
    { id: 'exemple-hook', title: 'Exemple : Tester un hook', level: 3 },
    { id: 'conclusion', title: 'Conclusion', level: 2 },
  ],

  // SEO (OBLIGATOIRE pour le referencement)
  seoTitle: 'Titre SEO personnalisé | Blog maxpaths', // 50-70 caracteres, mots-cles en premier
  seoDescription: 'Description SEO personnalisée', // 150-160 caracteres, proposition de valeur
  keywords: ['Keyword 1', 'Keyword 2', 'Keyword 3'], // Mots-cles techniques pour le referencement

  // Open Graph (OBLIGATOIRE pour les partages sociaux)
  ogTitle: 'Titre engageant pour LinkedIn/Slack/Discord',
  ogDescription: 'Description OG (max 200 caracteres). Differente du seoDescription, plus engageante.',
  ogImage: '/og-images/articles/nom-article.jpg', // Optionnel : l'API /api/og est utilisee par defaut

  // Twitter Card (OBLIGATOIRE)
  twitterCard: 'summary_large_image',
  twitterTitle: 'Titre optimise pour Twitter/X',
  twitterDescription: 'Description Twitter (max 200 caracteres).',
};
```

### Catégories Disponibles

| Catégorie | Label | Gradient |
|-----------|-------|----------|
| `fundamentals` | Fondamentaux | Teal → Violet |
| `architecture` | Architecture | Bleu → Cyan |
| `testing` | Testing | Orange → Ambre |
| `best-practices` | Bonnes Pratiques | Violet → Rose |
| `advanced` | Avancé | Rouge → Rose |

---

## Étape 3 : Écrire le Contenu

Créer `content.tsx` :

```tsx
import { CodeBlock } from '@/components/course/code-block';
import { ConceptCard } from '@/components/course/concept-card';
import { ComparisonTable } from '@/components/course/comparison-table';
import { InteractiveDemo } from '@/components/course/interactive-demo';

export default function NomArticleContent() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>

      <p>
        Premier paragraphe de votre article. Utilisez des paragraphes courts
        et bien espacés pour faciliter la lecture.
      </p>

      <p>
        Deuxième paragraphe avec du <strong>texte en gras</strong> et du{' '}
        <code>code inline</code>.
      </p>

      <ConceptCard
        title="Concept Clé"
        description="Expliquer un concept important avec une carte visuelle."
        category="testing"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Point 1</li>
          <li>Point 2</li>
          <li>Point 3</li>
        </ul>
      </ConceptCard>

      <h2 id="exemple-code">Exemple de Code</h2>

      <CodeBlock
        code={`// Exemple de code TypeScript
function exemple() {
  console.log('Hello World');
}`}
        language="typescript"
        filename="exemple.ts"
        category="testing"
      />

      <ComparisonTable
        modes={[
          {
            name: 'Option A',
            description: 'Description de l\'option A',
            pros: ['Avantage 1', 'Avantage 2'],
            cons: ['Inconvénient 1'],
            useCases: ['Cas d\'usage 1', 'Cas d\'usage 2'],
          },
          {
            name: 'Option B',
            description: 'Description de l\'option B',
            pros: ['Avantage 1', 'Avantage 2'],
            cons: ['Inconvénient 1'],
            useCases: ['Cas d\'usage 1'],
          },
        ]}
      />

      <h2 id="conclusion">Conclusion</h2>

      <p>
        Paragraphe de conclusion pour résumer les points clés de l'article.
      </p>
    </>
  );
}
```

### Composants Disponibles

#### 1. CodeBlock
```tsx
<CodeBlock
  code={`const exemple = 'code';`}
  language="typescript" // typescript, javascript, jsx, tsx, css, bash
  filename="exemple.ts" // Optionnel
  category="testing" // Pour le gradient de bordure
/>
```

#### 2. ConceptCard
```tsx
<ConceptCard
  title="Titre du concept"
  description="Description courte"
  category="testing"
>
  {/* Contenu optionnel (liste, code, etc.) */}
</ConceptCard>
```

#### 3. ComparisonTable
```tsx
<ComparisonTable
  modes={[
    {
      name: 'Mode A',
      description: 'Description',
      pros: ['Avantage 1', 'Avantage 2'],
      cons: ['Inconvénient 1'],
      useCases: ['Usage 1', 'Usage 2'],
    },
  ]}
/>
```

#### 4. InteractiveDemo
```tsx
<InteractiveDemo
  title="Démo Interactive"
  description="Description de la démo"
>
  {/* Votre démo React interactive */}
</InteractiveDemo>
```

---

## Étape 4 : Enregistrer l'Article

### 4.1 Mettre à jour `lib/blog/get-articles.ts`

```typescript
// 1. Importer les métadonnées
import { metadata as tddMetadata } from '@/app/blog/_articles/tdd-frontend-vs-backend/metadata';
import { metadata as votreArticleMetadata } from '@/app/blog/_articles/nom-de-votre-article/metadata';

// 2. Ajouter au registre
const metadataRegistry: ArticleMetadata[] = [
  tddMetadata,
  votreArticleMetadata, // ← Ajouter ici
];

// 3. Ajouter le case dans loadArticleContent
async function loadArticleContent(slug: string): Promise<React.ComponentType | null> {
  switch (slug) {
    case 'tdd-frontend-vs-backend':
      const { default: TDDContent } = await import('@/app/blog/_articles/tdd-frontend-vs-backend/content');
      return TDDContent;
    case 'nom-de-votre-article': // ← Ajouter ici
      const { default: VotreContent } = await import('@/app/blog/_articles/nom-de-votre-article/content');
      return VotreContent;
    default:
      return null;
  }
}
```

### 4.2 Mettre à jour `app/blog/_articles/index.ts` (optionnel)

```typescript
export { metadata as tddMetadata } from './tdd-frontend-vs-backend/metadata';
export { default as TDDContent } from './tdd-frontend-vs-backend/content';

export { metadata as votreArticleMetadata } from './nom-de-votre-article/metadata';
export { default as VotreContent } from './nom-de-votre-article/content';
```

---

## Étape 5 : Tester l'Article

### 5.1 Lancer le serveur

```bash
pnpm dev
```

### 5.2 Vérifier les URLs

- **Liste des articles** : `http://localhost:3002/blog`
  - Votre article doit apparaître dans la liste
  - Tester les filtres par catégorie
  - Vérifier la carte featured si activée

- **Accueil** : `http://localhost:3002/`
  - Si l'article est le contenu le plus récent publié, il doit apparaître dans
    la rubrique "Nouveauté" sous l'écran d'accueil
  - Vérifier que le badge, la date, le temps de lecture et les tags sont lisibles
    en desktop et mobile

- **Page article** : `http://localhost:3002/blog/nom-de-votre-article`
  - Vérifier le contenu complet
  - Tester la table des matières (scroll spy)
  - Vérifier la progress bar au scroll
  - Tester le responsive (mobile, tablet, desktop)

- **Sitemap** : `http://localhost:3002/sitemap.xml`
  - Vérifier que l'article est bien référencé

### 5.3 Tests de SEO

- Vérifier les balises `<meta>` dans le `<head>`
- Tester l'Open Graph avec [OpenGraph.xyz](https://www.opengraph.xyz/)
- Vérifier Twitter Card preview

---

## Étape 6 : Générer les Keywords Techniques de Recherche

### 6.1 Exécuter la commande generate-keywords

Après avoir enregistré et testé l'article, exécuter :

```
/generate-keywords article:{slug}
```

Cette commande analyse le contenu de l'article (metadata.ts + content.tsx) et génère des keywords **exclusivement techniques** pour la recherche Cmd+K :
- Noms de fonctions/API mentionnées dans les exemples de code
- Noms de librairies et outils abordés ou comparés
- Acronymes techniques du domaine
- Concepts techniques FR/EN
- Patterns et design patterns décrits

Les keywords sont ajoutés dans `lib/search-index.ts` pour l'article principal ET chaque heading.

### 6.2 Vérifier

- [ ] Entrée article dans `lib/search-index.ts` avec keywords techniques
- [ ] Entrées article-heading pour chaque H2/H3 avec keywords techniques
- [ ] Tags du metadata.ts complets (3-7 tags)
- [ ] Recherche Cmd+K testée avec des noms de fonctions et termes techniques

---

## Bonnes Pratiques

### Contenu

- **Paragraphes courts** : 2-4 phrases maximum
- **Titres descriptifs** : H2 pour sections principales, H3 pour sous-sections
- **Code commenté** : Toujours expliquer le code
- **Visuels** : Utiliser ConceptCard pour concepts clés
- **Comparaisons** : ComparisonTable pour comparer 2-3 options

### SEO / GEO (OBLIGATOIRE)

- **seoTitle** : titre unique, descriptif, avec la requete principale au debut quand c'est naturel. Viser un affichage lisible dans Google, sans forcer un nombre exact de caracteres.
- **seoDescription** : description unique, concise et fidele au contenu visible. Elle doit donner envie de cliquer, mais ne doit pas etre rembourree ou coupee uniquement pour atteindre une longueur fixe.
- **keywords** : array focalise sur les termes techniques utiles a la recherche interne Cmd+K (noms d'API, librairies, acronymes, termes FR/EN). Ne pas utiliser ce champ comme substitut a du contenu visible.
- **ogTitle** : Titre engageant pour les reseaux sociaux (peut differer du seoTitle)
- **ogDescription** : Description pour LinkedIn/Slack/Discord (max 200 caracteres)
- **twitterCard** : Toujours `'summary_large_image'`
- **twitterTitle/Description** : Optimises pour Twitter/X
- **Tags** : 3-7 tags pertinents (affiches sur la page blog et utilises pour le filtrage)
- **URL** : Kebab-case, sans accents, maximum 5 mots
- **Requete principale** : La faire apparaitre naturellement dans le titre, l'introduction, certains intertitres, les ancres de liens, les textes alternatifs d'images pertinents et le corps du texte.
- **Sources** : Citer des sources officielles et recentes pour les sujets qui evoluent vite : React, Next.js, AI SDK, securite, SEO, navigateurs, standards web.
- **Liens** : Les liens internes et externes importants doivent etre crawlables, explicites et utiles au lecteur.

**JSON-LD TechArticle** : Le schema est genere automatiquement dans `app/blog/[slug]/page.tsx` a partir des metadata de l'article. Il inclut :
- `TechArticle` avec headline, author, publisher, dates, keywords
- `BreadcrumbList` avec Accueil > Blog > Titre de l'article
- Le contenu du JSON-LD doit representer le contenu visible de la page. Ne pas baliser des informations absentes, cachees ou trompeuses.

**Image OG** : L'image est generee dynamiquement via `/api/og?title=...&category=best-practices`. Pas besoin de creer une image statique.

**SEO pour les experiences IA / AI Search** :
- Les bonnes pratiques SEO restent la base : structure claire, contenu accessible, canonical propre, liens crawlables, performance et balisage coherent.
- Produire du contenu non generique : retour d'experience, exemples concrets, arbitrages techniques, limites, checklists et sources.
- Eviter les affirmations chiffrees non sourcees. Une statistique doit etre verifiable ou supprimee.
- L'IA peut aider a structurer ou rechercher, mais l'article final doit apporter une valeur experte visible pour le lecteur.

### Performance

- **Images** : Utiliser Next.js Image avec lazy loading
- **Code splitting** : Les imports dynamiques sont déjà configurés
- **Reading time** : Compter ~200 mots/minute

### Accessibilité

- **IDs uniques** : Tous les H2/H3 doivent avoir un `id` pour la ToC
- **Alt text** : Décrire toutes les images
- **Contraste** : Ratio minimum 4.5:1 (déjà garanti par le design system)

---

## Table des Matières (ToC)

### Règles

1. **Manuelle** : La ToC est définie dans `metadata.ts`
2. **IDs** : Doivent correspondre aux `id` des balises H2/H3
3. **Niveaux** : Utiliser `level: 2` pour H2, `level: 3` pour H3
4. **Ordre** : Respecter l'ordre d'apparition dans le contenu

### Exemple

```typescript
// Dans metadata.ts
tableOfContents: [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'probleme', title: 'Le problème', level: 2 },
  { id: 'exemple-1', title: 'Exemple 1', level: 3 },
  { id: 'exemple-2', title: 'Exemple 2', level: 3 },
  { id: 'conclusion', title: 'Conclusion', level: 2 },
]

// Dans content.tsx
<h2 id="introduction">Introduction</h2>
<h2 id="probleme">Le problème</h2>
<h3 id="exemple-1">Exemple 1</h3>
<h3 id="exemple-2">Exemple 2</h3>
<h2 id="conclusion">Conclusion</h2>
```

---

## Architecture Technique

### Séparation Server/Client

- **Server Components** : `page.tsx`, `content.tsx`, `ArticleHeader`
- **Client Components** : `ArticleInteractive` (scroll spy, progress bar)
- **Règle** : Aucun composant React ne transite entre Server et Client

### Flux de Données

```
1. getArticleBySlug(slug)
   ↓
2. Charge metadata (sérialisable)
   ↓
3. Charge content (React Component)
   ↓
4. Server Component rend <Content />
   ↓
5. Client Component reçoit tableOfContents
   ↓
6. Hydration minimale côté client
```

---

## Dépannage

### Erreur : "Functions cannot be passed to Client Components"

**Cause** : Vous passez l'objet `article` complet (avec `content: function`) à un Client Component.

**Solution** : Passer uniquement les données sérialisables (`metadata`, `tableOfContents`).

### Erreur : "Article not found"

**Causes possibles** :
1. Slug incorrect dans `metadata.ts`
2. Article non enregistré dans `metadataRegistry`
3. Case manquant dans `loadArticleContent()`

### Erreur : "Module not found"

**Cause** : Import incorrect dans `get-articles.ts`.

**Solution** : Vérifier le chemin relatif depuis `lib/blog/get-articles.ts` :
```typescript
import { metadata } from '@/app/blog/_articles/nom-article/metadata';
```

---

## Checklist de Publication

Avant de publier un article, vérifier :

### Structure & Contenu
- [ ] Métadonnées complètes (`slug`, `title`, `description`, `author`, `publishedAt`)
- [ ] Catégorie et tags définis (3-7 tags)
- [ ] Table des matières manuelle créée
- [ ] Tous les IDs de ToC correspondent aux H2/H3
- [ ] Article enregistré dans `metadataRegistry`
- [ ] Case ajouté dans `loadArticleContent()`
- [ ] Article visible dans la rubrique "Nouveauté" de l'accueil si son `publishedAt` est le plus récent

### SEO / GEO (OBLIGATOIRE)
- [ ] `seoTitle` defini (50-70 caracteres, mots-cles en premier)
- [ ] `seoDescription` defini (150-160 caracteres)
- [ ] `keywords` defini (array de 8-15 mots-cles techniques)
- [ ] `ogTitle` + `ogDescription` definis (pour reseaux sociaux)
- [ ] `twitterCard` = `'summary_large_image'` + `twitterTitle` + `twitterDescription`
- [ ] JSON-LD `TechArticle` genere automatiquement (verifier dans le `<head>`)
- [ ] JSON-LD `BreadcrumbList` genere automatiquement (verifier dans le `<head>`)
- [ ] Image OG fonctionne (tester `/api/og?title=Titre+Article&category=best-practices`)
- [ ] Article present dans `/sitemap.xml` (genere automatiquement via `getAllArticlesMetadata()`)
- [ ] Domaine canonique : `https://www.maxpaths.dev` (jamais `maxpaths.com`)

### Tests
- [ ] Tests sur `/blog` et `/blog/slug`
- [ ] Responsive testé (mobile, tablet, desktop)
- [ ] Pas d'erreur console
- [ ] Schemas JSON-LD valides dans le `<head>` (TechArticle + BreadcrumbList)

### Recherche
- [ ] Commande `/generate-keywords` exécutée
- [ ] Keywords techniques ajoutés dans `lib/search-index.ts`
- [ ] Entrées article + article-headings dans search index
- [ ] Recherche Cmd+K testée avec des termes techniques

---

## Ressources

- **Types** : [`lib/blog/types.ts`](../../lib/blog/types.ts)
- **Registre** : [`lib/blog/get-articles.ts`](../../lib/blog/get-articles.ts)
- **Composants** : [`components/course/`](../../components/course/)
- **Design System** : [`docs/design-system/`](../design-system/)

---

Dernière mise à jour : Février 2026
