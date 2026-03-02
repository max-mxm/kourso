# Maxpaths

Site personnel de guides React et Next.js, articles techniques et demos interactives par Maxime Morellon.

**Site live** : [maxpaths.dev](https://www.maxpaths.dev)

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Structure

```
app/
  guides/          # Guides techniques (Next.js, React 19, Zod, TanStack, etc.)
  blog/            # Articles avec metadata + contenu
  demos/           # Simulateurs interactifs (rendering, performance)
  about/           # Page a propos
  api/og/          # Generation dynamique d'images Open Graph
components/
  course/          # CourseLayout, CodeBlock, ConceptCard, ComparisonTable
  blog/            # Layout et composants d'articles
  search/          # Recherche Cmd+K
  mobile-nav-fab.tsx  # Navigation mobile (FAB + bottom sheet)
lib/               # Contenus, search index, utilitaires
hooks/             # useScrollProgress, useAnimation
docs/              # Documentation interne (architecture, design system, guides)
```

## Dev

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Build production
```
