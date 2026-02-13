import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ClientDemoWrapper } from '../_components/demo-wrappers';

export default function ClientComponentsSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Les <strong>Client Components</strong> s&apos;exécutent dans le navigateur et permettent l&apos;interactivité. Utilisez-les uniquement quand nécessaire.
        </p>
      </div>

      <ConceptCard
        title="Quand utiliser 'use client' ?"
        description="Réservez les Client Components aux cas où vous avez besoin d'interactivité ou des APIs du navigateur."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">✓</span>
            <span><strong>Event handlers</strong> : onClick, onChange, onSubmit...</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">✓</span>
            <span><strong>State & Effects</strong> : useState, useEffect, useContext...</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">✓</span>
            <span><strong>Browser APIs</strong> : localStorage, window, navigator...</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">✓</span>
            <span><strong>Librairies client-only</strong> : charting, animations...</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`'use client'; // Directive obligatoire en haut du fichier

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}

// ❌ Sans 'use client', cette erreur apparaît :
// "You're importing a component that needs useState.
// It only works in a Client Component but none of its
// parents are marked with 'use client'"`}
        language="typescript"
        filename="components/counter.tsx"
        highlightLines={[1]}
        category="best-practices"
      />

      <div className="rounded-xl border-2 border-purple-500/30 bg-purple-500/5 p-6">
        <h4 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-3">
          Bonne Pratique
        </h4>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Gardez vos Server Components au plus haut niveau possible et ne passez en Client Component qu&apos;à la dernière minute. Cela optimise le bundle JavaScript envoyé au client.
        </p>
      </div>

      <ClientDemoWrapper />
    </div>
  );
}
