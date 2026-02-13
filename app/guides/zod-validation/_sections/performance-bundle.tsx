import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check, X } from 'lucide-react';

export default function PerformanceBundleSection() {
  const validationLibraries = [
    {
      name: 'Zod',
      description: 'TypeScript-first, ecosysteme dominant. v4 apporte des gains majeurs de performance.',
      pros: [
        'TypeScript-first, z.infer natif',
        'Zero dependances',
        'Ecosysteme riche (tRPC, RHF, shadcn)',
        'v4 : 14x plus rapide sur les strings',
      ],
      cons: [
        'Bundle ~17 KB gzipped',
        'Plus lent que ArkType (3-4x)',
        'Overhead memoire (immutable)',
        'TS compiler overhead',
      ],
      useCases: [
        'Applications TypeScript modernes',
        'Stack tRPC / Next.js',
        'Formulaires avec React Hook Form',
      ],
      color: '#3b82f6',
    },
    {
      name: 'Valibot',
      description: 'Ultra-leger, tree-shakeable, API modulaire. Le challenger principal de Zod.',
      pros: [
        '~1.37 KB gzipped (90% plus leger)',
        'Tree-shakeable par design',
        'API pipe() composable',
        'Standard Schema compatible',
      ],
      cons: [
        'Ecosysteme plus restreint',
        'Moins de tutoriels et exemples',
        'API differente de Zod',
      ],
      useCases: [
        'SPAs ou le bundle size est critique',
        'Edge functions et workers',
        'Projets performance-first',
      ],
      color: '#eab308',
    },
    {
      name: 'ArkType',
      description: 'Performance extreme, syntaxe proche du systeme de types TypeScript.',
      pros: [
        '3-4x plus rapide que Zod',
        'Syntaxe concise et expressive',
        'Inference de types avancee',
      ],
      cons: [
        'API non conventionnelle',
        'Ecosysteme naissant',
        'Documentation en evolution',
      ],
      useCases: [
        'Hot paths performance-critiques',
        'APIs a haute charge',
        'Projets ou la vitesse prime',
      ],
      color: '#8b5cf6',
    },
    {
      name: 'Yup',
      description: 'Validation populaire, API fluide, historiquement liee a Formik.',
      pros: [
        'API intuitive et fluide',
        'Bonne integration Formik',
        'Mature et stable',
      ],
      cons: [
        'Pas TypeScript-first',
        'Inference de types limitee',
        'Moins maintenu recemment',
      ],
      useCases: [
        'Projets Formik existants',
        'Formulaires simples',
        'Migration progressive',
      ],
      color: '#f97316',
    },
    {
      name: 'Joi',
      description: 'Standard Node.js historique, oriente backend et serveur.',
      pros: [
        'Tres complet en fonctionnalites',
        'Documentation exhaustive',
        'Large communaute backend',
      ],
      cons: [
        'Pas de support TypeScript natif',
        'Lourd pour le frontend',
        'Non concu pour le navigateur',
      ],
      useCases: [
        'APIs Node.js pures',
        'Projets backend existants',
        'Validation server-only',
      ],
      color: '#0ea5e9',
    },
    {
      name: 'io-ts',
      description: 'Approche fonctionnelle pure, compose avec fp-ts.',
      pros: [
        'Types bidirectionnels (encode/decode)',
        'Approche fonctionnelle pure',
        'Composition avancee',
      ],
      cons: [
        'Courbe apprentissage fp-ts',
        'Tres verbeux',
        'Ecosysteme de niche',
      ],
      useCases: [
        'Projets fp-ts existants',
        'Serialisation/deserialisation',
        'Equipes FP experimentees',
      ],
      color: '#6366f1',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Zod n&apos;est pas parfait. Il est important de comprendre ses forces et ses limites
          pour faire un choix eclaire. Cette section compare honnement Zod a ses alternatives
          sur les criteres qui comptent : performance, bundle size, DX et ecosysteme.
        </p>
      </div>

      <ConceptCard
        title="Zod v4 -- Les gains de performance"
        description="Zod v4 a apporte des ameliorations significatives par rapport a v3, mais reste derriere certains concurrents specialises."
        category="optimization"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Ameliorations v4
            </h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>14x plus rapide sur le parsing de strings</li>
              <li>7x plus rapide sur les arrays</li>
              <li>6.5x plus rapide sur les objets</li>
              <li>Core 57% plus petit</li>
              <li>.toJSONSchema() natif</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <X className="w-4 h-4 text-red-500" />
              Limites qui persistent
            </h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>ArkType reste 3-4x plus rapide</li>
              <li>Bundle ~17 KB vs Valibot ~1.37 KB</li>
              <li>Immutable par defaut (copies memoire)</li>
              <li>Impact sur le TypeScript compiler</li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Taille de bundle comparee (gzipped)
// Zod          : ~17 KB
// Zod Mini     : ~1.9 KB  (sous-package @zod/mini)
// Valibot      : ~1.37 KB (tree-shakeable)
// ArkType      : ~5 KB    (variable selon usage)
// Yup          : ~12 KB
// Joi          : ~30 KB   (non concu pour le frontend)

// Benchmarks approximatifs (operations/sec, objets simples)
// ArkType      : ~76M ops/sec
// Valibot      : ~25M ops/sec
// Zod v4       : ~6.7M ops/sec
// Zod v3       : < 1M ops/sec
// Yup          : ~800K ops/sec

// Pour la majorite des applications, Zod est largement suffisant.
// La difference ne se ressent qu'en haute charge
// (ex: valider 500K+ objets en batch).`}
        language="text"
        filename="benchmarks-comparaison.txt"
        highlightLines={[2, 4, 10, 12]}
        category="optimization"
      />

      <ComparisonTable modes={validationLibraries} />

      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
        <h3 className="text-lg font-bold mb-4">Quand choisir quoi ?</h3>
        <div className="space-y-4 text-sm text-foreground/80">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <span><strong>Zod</strong> : choix par defaut pour tout projet TypeScript moderne. L&apos;ecosysteme (tRPC, RHF, shadcn) et la DX compensent largement les limites de performance.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
            <span><strong>Valibot</strong> : si le bundle size est une contrainte dure (SPA, edge functions). Migration facile depuis Zod.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
            <span><strong>ArkType</strong> : pour les hot paths ou chaque milliseconde compte (APIs haute charge, batch processing).</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
            <span><strong>Yup/Joi</strong> : seulement si vous avez un projet existant qui les utilise deja. Pour un nouveau projet, preferez Zod ou Valibot.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
