import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function ArchitectureSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Une architecture scalable est essentielle pour les projets React modernes. React 19 avec Server Components
          pousse vers une <strong>architecture feature-based</strong> plutôt que layer-based.
        </p>
      </div>

      <CodeBlock
        code={`// Architecture Feature-Based (recommandée)
app/
├── (features)/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   └── signup-form.tsx
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── actions/
│   │   │   └── auth-actions.ts
│   │   └── types/
│   │       └── auth.types.ts
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── actions/
│   └── checkout/
│       └── ...
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── lib/
    └── db.ts`}
        language="text"
        filename="Structure feature-based"
        category="best-practices"
      />

      <ConceptCard
        title="Principes d'Architecture Seniors"
        description="Les règles essentielles pour une codebase maintenable."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• <strong>Colocation</strong> : Garder le code lié ensemble (feature folders)</li>
          <li>• <strong>Separation of Concerns</strong> : Server Components (data) vs Client Components (UI)</li>
          <li>• <strong>Composition over Inheritance</strong> : Privilégier la composition de composants</li>
          <li>• <strong>Single Responsibility</strong> : Un composant = une responsabilité</li>
          <li>• <strong>Domain-Driven Design</strong> : Organiser par domaine métier, pas par type technique</li>
        </ul>
      </ConceptCard>
    </div>
  );
}
