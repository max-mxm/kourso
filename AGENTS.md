# Maxpaths Agent Guide

This file is the shared instruction source for AI coding agents working on
Maxpaths. Read it before making changes, then follow the project documentation
linked below.

## Project Overview

Maxpaths is a French technical content site focused on React, Next.js,
TypeScript, frontend architecture, performance, accessibility, and applied AI.
The site uses the Next.js App Router with TypeScript/TSX content modules.

Primary domain: `https://www.maxpaths.dev`

## Core Rules

- Keep changes scoped to the user request.
- Do not rewrite unrelated files or reformat broad areas of the project.
- Preserve existing design patterns, content architecture, and naming
  conventions.
- Prefer TypeScript types and existing components over ad hoc markup.
- Use ASCII in new files unless the surrounding content requires French
  accents. Blog copy may use French accents.
- Never commit local IDE folders such as `.idea/`.
- Before claiming completion, run the relevant verification command.

## Common Commands

```bash
pnpm lint
pnpm build
pnpm audit --prod
```

Use `pnpm build` after content, metadata, routing, or import changes. Use
`pnpm lint` after TypeScript/TSX edits.

## Documentation Routing

All project documentation lives in `docs/`.

When adding or editing blog articles, read:

- `docs/guides/ajouter-article-blog.md`

When adding or editing guides, read:

- `docs/guides/ajouter-un-cours.md`
- `docs/architecture/cours-structure.md`

When adding or editing demos, read:

- `docs/guides/bonnes-pratiques-demo-live.md`

When changing UI components or visual styling, read:

- `docs/design-system/README.md`
- `docs/design-system/colors.md`
- `docs/design-system/typography.md`

When changing sitemap, robots, metadata, or canonical URLs, verify:

- canonical domain remains `https://www.maxpaths.dev`
- sitemap entries include new public pages
- robots policy still allows intended AI/search crawlers

## Blog Article Convention

Blog articles are TSX modules, not MDX files.

Each article must live in:

```text
app/blog/_articles/<slug>/
  metadata.ts
  content.tsx
```

Then export both files from:

```text
app/blog/_articles/index.ts
```

Article slugs must use kebab-case without accents.

Metadata must include:

- `slug`
- `title`
- `description`
- `author`
- `publishedAt`
- `readingTime`
- `category`
- `tags`
- `tableOfContents`
- SEO fields: `seoTitle`, `seoDescription`, `keywords`
- social fields: `ogTitle`, `ogDescription`, `ogImage`, `twitterCard`,
  `twitterTitle`, `twitterDescription`

For technical articles, prefer the format "guide published in the blog":

- clear problem statement
- practical architecture or pattern
- concrete code examples
- production checklist
- concise conclusion

## Content Standards

- Write in French unless the user asks otherwise.
- Favor concrete production lessons over generic introductions.
- Use short paragraphs and explicit section headings.
- Cite current official sources when writing about changing technologies such as
  React, Next.js, AI SDK, security, or browser APIs.
- Avoid turning product references into hard-sell copy. Use product examples as
  case studies and keep the CTA useful.

## Available Article Components

Prefer existing components from `components/course/`:

- `CodeBlock`
- `ConceptCard`
- `ComparisonTable`
- `InteractiveDemo`

Keep component usage consistent with existing articles.

## SEO And Search

For each new article:

- choose a descriptive slug with the main keyword
- include French and English technical keywords when useful
- keep `seoTitle` around 50-70 characters when possible
- keep `seoDescription` concise and action-oriented
- use `/api/og?title=...&category=...` for generated OG images unless a custom
  image already exists

If search keywords are required by the workflow, update the relevant search
index or run the project keyword generation workflow described in the docs.

## Git Hygiene

- Check `git status -sb` before staging.
- Stage only files related to the current task.
- Do not include untracked local files unless explicitly requested.
- Use the `codex/` prefix for new branches unless the user requests another
  naming convention.
