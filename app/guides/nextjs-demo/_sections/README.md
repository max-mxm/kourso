# Sections du cours Next.js

Ce dossier contient toutes les sections du cours Next.js, organisées de manière modulaire.

## Structure

Chaque section est un fichier TypeScript exportant une fonction React component.

### Catégories

1. **Fondamentaux** (`fundamentals`)
   - `introduction.tsx` - Introduction à Next.js

2. **Modes de Rendu** (`rendering`)
   - `ssr.tsx` - Server-Side Rendering
   - `ssg.tsx` - Static Site Generation
   - `isr.tsx` - Incremental Static Regeneration
   - `csr.tsx` - Client-Side Rendering
   - `hybrid.tsx` - Hybrid (Server + Client Components)

3. **Optimisations** (`optimization`)
   - `dynamic-import.tsx` - Dynamic Import & Code Splitting
   - `server-actions.tsx` - Server Actions
   - `frontend-performance.tsx` - Performance Frontend
   - `backend-performance.tsx` - Performance Backend
   - `streaming.tsx` - Streaming & Suspense
   - `virtualization.tsx` - Virtualisation des listes

4. **Bonnes Pratiques** (`best-practices`)
   - `client-components.tsx` - Client Components
   - `security.tsx` - Sécurité
   - `react-patterns.tsx` - React Best Practices
   - `composition.tsx` - Composition Patterns
   - `architecture.tsx` - Architecture
   - `accessibility.tsx` - Accessibilité

5. **Avancé** (`advanced`)
   - `advanced-patterns.tsx` - Patterns Avancés
   - `comparison.tsx` - Tableau comparatif final

## Convention de nommage

- Un fichier par section
- Export par défaut d'une fonction React component
- Nom du fichier en kebab-case
- Nom de la fonction en PascalCase suffixée par "Section"

## Exemple

```tsx
// _sections/csr.tsx
export default function CSRSection() {
  return (
    <div className="space-y-8">
      {/* Contenu de la section */}
    </div>
  );
}
```
