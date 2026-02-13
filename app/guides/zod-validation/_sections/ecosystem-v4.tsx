import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check } from 'lucide-react';

export default function EcosystemV4Section() {
  const v3vsV4 = [
    {
      name: 'Zod v3',
      description: 'Version stable largement adoptee. La plus utilisee en production.',
      pros: [
        'Ecosysteme tres mature',
        'Documentation exhaustive',
        'Compatible avec tous les outils actuels',
        'Tres stable en production',
      ],
      cons: [
        'Performance lente (< 1M ops/sec)',
        'Bundle size ~33 KB',
        'Pas de JSON Schema natif',
        'Pas de Standard Schema',
      ],
      useCases: [
        'Projets en production stable',
        'Migration progressive vers v4',
      ],
      color: '#6b7280',
    },
    {
      name: 'Zod v4',
      description: 'Version nouvelle generation avec gains majeurs de performance et features.',
      pros: [
        '14x plus rapide sur les strings',
        'Core 57% plus petit (~17 KB)',
        '.toJSONSchema() natif',
        'Standard Schema compatible',
        'Discriminated unions composables',
      ],
      cons: [
        'Breaking changes a migrer',
        'Certains plugins pas encore compatibles',
        'Moins de retours production',
      ],
      useCases: [
        'Nouveaux projets',
        'Projets qui necessitent JSON Schema',
        'Besoin de meilleures performances',
      ],
      color: '#3b82f6',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Zod n&apos;est pas qu&apos;une librairie isolee -- c&apos;est le centre d&apos;un ecosysteme de validation
          TypeScript. Cette section couvre les librairies complementaires, les differences
          entre v3 et v4, et le futur de la validation avec Standard Schema.
        </p>
      </div>

      <ConceptCard
        title="Ecosysteme Zod"
        description="Des dizaines de librairies s'integrent avec Zod pour couvrir des cas d'usage specifiques."
        category="advanced"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>@hookform/resolvers</strong> : integration React Hook Form</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>tRPC</strong> : validation input/output de bout en bout</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>zod-form-data</strong> : parser les FormData avec Zod</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>zod-i18n-map</strong> : messages d&apos;erreur multilingues</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>@t3-oss/env-nextjs</strong> : validation env vars type-safe</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>zodios</strong> : client HTTP type-safe base sur Zod</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// zod-form-data : parser les FormData directement
import { zfd } from 'zod-form-data';

const UploadSchema = zfd.formData({
  file: zfd.file(z.instanceof(File)),
  title: zfd.text(z.string().min(1)),
  tags: zfd.repeatable(z.array(z.string())),
});

// Dans un Server Action
export async function uploadFile(formData: FormData) {
  const result = UploadSchema.safeParse(formData);
  // result.data.file -> File
  // result.data.title -> string
  // result.data.tags -> string[]
}

// ---

// zod-i18n-map : messages multilingues
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/fr/zod.json';
import i18next from 'i18next';

i18next.init({
  lng: 'fr',
  resources: { fr: { zod: translation } },
});
z.setErrorMap(zodI18nMap);

// Maintenant les erreurs Zod sont en francais
z.string().min(3).safeParse('ab');
// Error: "La chaine doit contenir au moins 3 caractere(s)"`}
        language="typescript"
        filename="ecosystem-examples.ts"
        highlightLines={[4, 30]}
        category="advanced"
      />

      <ConceptCard
        title="Zod v3 vs v4 -- Quoi de neuf ?"
        description="Zod v4 apporte des gains de performance majeurs, un core plus leger et de nouvelles fonctionnalites."
        category="advanced"
      />

      <ComparisonTable modes={v3vsV4} />

      <CodeBlock
        code={`// Changements cles v3 -> v4

// 1. .toJSONSchema() -- natif en v4
import { z } from 'zod/v4';

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().optional(),
});

const jsonSchema = UserSchema.toJSONSchema();
// {
//   type: 'object',
//   properties: {
//     name: { type: 'string', minLength: 1 },
//     email: { type: 'string', format: 'email' },
//     age: { type: 'integer' },
//   },
//   required: ['name', 'email'],
// }

// 2. @zod/mini -- sous-package ultra leger
import { z } from '@zod/mini';
// ~1.9 KB gzipped, ideal pour le frontend

// 3. Discriminated unions composables
const BaseEvent = z.discriminatedUnion('type', [
  z.object({ type: z.literal('click'), x: z.number() }),
  z.object({ type: z.literal('scroll'), y: z.number() }),
]);

// En v4, on peut etendre une discriminated union
const ExtendedEvent = z.discriminatedUnion('type', [
  ...BaseEvent.options,
  z.object({ type: z.literal('keypress'), key: z.string() }),
]);`}
        language="typescript"
        filename="migration-v3-v4.ts"
        highlightLines={[12, 25, 34, 35]}
        category="advanced"
      />

      <ConceptCard
        title="Standard Schema -- Le futur de la validation"
        description="Une specification commune pour que les librairies de validation (Zod, Valibot, ArkType) soient interchangeables."
        category="advanced"
      />

      <CodeBlock
        code={`// Standard Schema : interoperabilite entre librairies
// Zod v4, Valibot et ArkType implementent la spec Standard Schema

// Avec Standard Schema, les outils n'ont plus besoin de resolvers specifiques
// React Hook Form pourra accepter n'importe quelle librairie compatible

// Avant (specifique a chaque librairie)
import { zodResolver } from '@hookform/resolvers/zod';
import { valibotResolver } from '@hookform/resolvers/valibot';

// Apres (Standard Schema -- universel)
import { standardSchemaResolver } from '@hookform/resolvers';

// Fonctionne avec Zod, Valibot, ArkType, etc.
useForm({
  resolver: standardSchemaResolver(anySchemaFromAnyLibrary),
});

// En pratique, cela signifie que vous pouvez :
// 1. Commencer avec Zod (ecosysteme mature)
// 2. Migrer vers Valibot (si bundle size critique)
// 3. Sans changer le code d'integration

// Zod v4 est Standard Schema compatible par defaut
// Pas de configuration supplementaire`}
        language="typescript"
        filename="standard-schema.ts"
        highlightLines={[12, 16, 25]}
        category="advanced"
      />

      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
        <h3 className="text-lg font-bold mb-4">En resume</h3>
        <div className="space-y-4 text-sm text-foreground/80">
          <p>
            Zod est aujourd&apos;hui le standard de facto pour la validation TypeScript. Son ecosysteme
            (tRPC, React Hook Form, shadcn/ui, t3-env) en fait un choix incontournable pour les
            projets TypeScript modernes.
          </p>
          <p>
            Les alternatives comme Valibot et ArkType progressent rapidement et offrent de
            meilleures performances, mais l&apos;ecosysteme de Zod reste incomparable. Avec Standard
            Schema, ces librairies deviendront interchangeables, rendant le choix moins engageant.
          </p>
          <p>
            Pour un nouveau projet en 2026 : commencez avec Zod, et migrez vers Valibot ou ArkType
            si (et seulement si) le bundle size ou la performance runtime deviennent un vrai probleme mesure.
          </p>
        </div>
      </div>
    </div>
  );
}
