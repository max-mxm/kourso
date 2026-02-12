import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function TypeScriptPatternsSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          React 19 avec TypeScript 5+ permet des patterns avancés pour une type-safety maximale.
        </p>
      </div>

      <CodeBlock
        code={`// Generic Component Pattern
import { ReactNode } from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage avec inférence automatique
function UserList() {
  const users: User[] = [...];

  return (
    <List
      items={users} // T = User inféré automatiquement
      renderItem={user => <div>{user.name}</div>}
      keyExtractor={user => user.id}
    />
  );
}`}
        language="tsx"
        filename="Generic patterns"
        highlightLines={[10, 28, 29, 30]}
        category="best-practices"
      />

      <ConceptCard
        title="Patterns TypeScript Seniors"
        description="Les techniques avancées pour un code type-safe."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• <strong>Generics</strong> : Composants réutilisables avec type safety</li>
          <li>• <strong>Discriminated Unions</strong> : État avec types exclusifs</li>
          <li>• <strong>as const</strong> : Narrowing automatique des types</li>
          <li>• <strong>Type Guards</strong> : Validation runtime + types</li>
          <li>• <strong>Zod</strong> : Validation avec inférence TypeScript</li>
        </ul>
      </ConceptCard>
    </div>
  );
}
