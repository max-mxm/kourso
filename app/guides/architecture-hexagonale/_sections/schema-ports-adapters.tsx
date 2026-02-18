import { ConceptCard } from '@/components/course/concept-card';
import { HexagonalSchema } from '../_components/hexagonal-schema';

export default function SchemaPortsAdaptersSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Le schema ci dessous montre la separation entre le coeur metier et les
        details techniques. C est cette frontiere qui permet de remplacer un
        adapter sans toucher aux regles metier.
      </p>

      <HexagonalSchema />

      <ConceptCard
        title="Ports entrants vs ports sortants"
        description="Les ports entrants exposent les cas d usage. Les ports sortants expriment les besoins d infrastructure du domaine."
        category="rendering"
      >
        <div className="space-y-3 text-sm text-foreground/85">
          <p>
            - <strong className="text-foreground">Port entrant</strong> : interface
            d entree d un use case (ex: CreateOrder).
          </p>
          <p>
            - <strong className="text-foreground">Port sortant</strong> : contrat
            necessaire au domaine (ex: PaymentPort, OrderRepositoryPort).
          </p>
          <p>
            - <strong className="text-foreground">Adapter</strong> : implementation
            concrete d un port (ex: StripeAdapter, PostgresRepository).
          </p>
        </div>
      </ConceptCard>
    </div>
  );
}
