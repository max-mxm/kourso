import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function ErrorHandlingSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          React 19 améliore les Error Boundaries avec un meilleur handling des erreurs async et moins de duplication.
        </p>
      </div>

      <CodeBlock
        code={`// Error Boundary moderne (React 19)
'use client';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log vers service de monitoring (Sentry, etc.)
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}`}
        language="tsx"
        filename="components/error-boundary.tsx"
        highlightLines={[20, 21, 22, 24, 25, 26, 30, 31]}
        category="best-practices"
      />

      <ConceptCard
        title="Error Handling avec Actions"
        description="Les Actions throws sont automatiquement catchées par Error Boundaries."
        category="best-practices"
      >
        <p className="text-sm text-foreground/80">
          Quand une Action (dans useTransition) throw une erreur, React la propage vers l&apos;Error Boundary
          le plus proche. Pas besoin de try/catch manuel dans le composant.
        </p>
      </ConceptCard>
    </div>
  );
}
