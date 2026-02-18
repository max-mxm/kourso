import { CodeBlock } from '@/components/course/code-block';

export default function MigrationProgressiveSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Pas besoin de tout recrire. Une migration progressive limite le risque et
        vous donne des gains rapidement.
      </p>

      <CodeBlock
        code={`// Plan de migration en 4 etapes

// 1) Choisir un use case critique
//    Exemple: create-order

// 2) Extraire les ports sortants dans le domaine
//    PaymentPort, OrderRepositoryPort

// 3) Creer des adapters techniques
//    StripePaymentAdapter, PostgresOrderRepository

// 4) Assembler dans un controller/server action
//    createOrderUseCase(command, { paymentPort, orderRepository })

// Ensuite repeter use case par use case.
// La migration devient incrementale plutot que big bang.`}
        language="plaintext"
        filename="migration-plan.txt"
        highlightLines={[1, 3, 6, 9, 12, 15]}
        category="best-practices"
      />
    </div>
  );
}
