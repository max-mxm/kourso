import { ConceptCard } from '@/components/course/concept-card';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function AntiPatternsSection() {
  const comparison = [
    {
      name: 'Couplage direct',
      description:
        'Le metier importe Prisma/Stripe/HTTP et ne peut pas tourner seul.',
      pros: ['Implementation initiale rapide'],
      cons: [
        'Tests fragiles',
        'Refactor risquee',
        'Migration technique couteuse',
      ],
      useCases: ['Prototype court terme'],
      color: 'rgb(239, 68, 68)',
    },
    {
      name: 'Hexagonale',
      description:
        'Le metier ne depend que des ports. Les adapters implementent les details.',
      pros: [
        'Tests metier rapides',
        'Adapters interchangeables',
        'Code durable sur la longueur',
      ],
      cons: ['Un peu plus de setup au debut'],
      useCases: ['Produit en croissance', 'Equipe multi-dev', 'Contexte long terme'],
      color: 'rgb(16, 185, 129)',
    },
  ];

  return (
    <div className="space-y-8">
      <ComparisonTable modes={comparison} />

      <ConceptCard
        title="Erreurs frequentes"
        description="Hexagonal ne veut pas dire multiplier les couches sans but. Restez pragmatique."
        category="advanced"
      >
        <div className="space-y-3 text-sm text-foreground/85">
          <p>- Definir des ports pour tout, meme quand inutile.</p>
          <p>- Mettre la logique metier dans les adapters entrants.</p>
          <p>- Cacher la complexite au lieu de la reduire.</p>
        </div>
      </ConceptCard>
    </div>
  );
}
