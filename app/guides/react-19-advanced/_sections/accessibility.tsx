import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function AccessibilitySection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          L&apos;<strong>accessibilité (a11y)</strong> n&apos;est pas optionnelle. WCAG 2.2 Level AA est le standard
          minimum pour les applications modernes.
        </p>
      </div>

      <ConceptCard
        title="Accessibilité Essentielle"
        description="Les règles fondamentales pour rendre votre app accessible."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• <strong>Contraste</strong> : Minimum 4.5:1 pour le texte normal, 3:1 pour le large</li>
          <li>• <strong>Navigation clavier</strong> : Tab, Enter, Espace doivent fonctionner partout</li>
          <li>• <strong>ARIA labels</strong> : Décrire les éléments non-textuels</li>
          <li>• <strong>Focus visible</strong> : Toujours afficher un focus outline</li>
          <li>• <strong>Alt text</strong> : Descriptions pour toutes les images</li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Composant accessible
function AccessibleButton({ onClick, children, ariaLabel }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="focus:ring-2 focus:ring-primary focus:outline-none"
    >
      {children}
    </button>
  );
}

// Dialog accessible avec focus trap
import { Dialog } from '@headlessui/react';

function Modal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <Dialog.Panel>
        <Dialog.Title>Mon Dialog</Dialog.Title>
        <Dialog.Description>
          Description accessible du dialog
        </Dialog.Description>

        <button onClick={onClose}>Fermer</button>
      </Dialog.Panel>
    </Dialog>
  );
}`}
        language="tsx"
        filename="Accessibility patterns"
        highlightLines={[6, 7, 19, 22, 23, 24]}
        category="best-practices"
      />
    </div>
  );
}
