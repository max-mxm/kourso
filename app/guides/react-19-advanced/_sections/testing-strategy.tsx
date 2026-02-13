import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function TestingStrategySection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Une stratégie de tests complète combine <strong>unit tests</strong> (Vitest/Jest),
          <strong>integration tests</strong> (React Testing Library) et <strong>E2E tests</strong> (Playwright).
        </p>
      </div>

      <CodeBlock
        code={`// Unit Test : Hook personnalisé
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './use-counter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});`}
        language="tsx"
        filename="hooks/use-counter.test.ts"
        highlightLines={[2, 6, 10, 11, 12]}
        category="best-practices"
      />

      <CodeBlock
        code={`// Integration Test : Composant
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('should submit form with credentials', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    // User interaction
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Assertions
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});`}
        language="tsx"
        filename="components/login-form.test.tsx"
        highlightLines={[1, 6, 10, 11, 17, 20]}
        category="best-practices"
      />

      <ConceptCard
        title="E2E Testing avec Playwright"
        description="Tests end-to-end pour valider le flow complet utilisateur."
        category="best-practices"
      >
        <p className="text-sm text-foreground/80">
          Playwright permet de tester les flows critiques dans un navigateur réel. Idéal pour
          valider les parcours utilisateur complets (signup, checkout, etc.).
        </p>
      </ConceptCard>
    </div>
  );
}
