import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check, AlertTriangle } from 'lucide-react';

export default function IntroductionSection() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-4xl md:text-5xl font-black tracking-tight text-transparent">
          Zod -- Validation TypeScript-first
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Schemas de validation avec inference de types automatique
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          TypeScript protege votre code a la compilation, mais les types disparaissent a l&apos;execution.
          Quand votre application recoit des donnees d&apos;une API, d&apos;un formulaire ou d&apos;une variable d&apos;environnement,
          TypeScript ne peut plus rien garantir. C&apos;est la que Zod intervient : il valide les donnees
          a l&apos;execution tout en inferrant automatiquement les types TypeScript correspondants.
        </p>
      </div>

      <ConceptCard
        title="Pourquoi la validation runtime est indispensable"
        description="TypeScript compile en JavaScript -- les types s'effacent completement a l'execution."
        category="fundamentals"
      >
        <ul className="space-y-3 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span><strong>API responses</strong> : une API externe peut changer son format sans prevenir</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span><strong>Formulaires</strong> : les donnees utilisateur sont imprevisibles par nature</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span><strong>Variables d&apos;env</strong> : process.env retourne string | undefined, jamais le type attendu</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span><strong>localStorage / cookies</strong> : donnees serialisees sans garantie de structure</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Le probleme : TypeScript fait confiance aveuglément
interface User {
  id: number;
  name: string;
  email: string;
}

// TypeScript ne verifie PAS que la reponse est conforme
const response = await fetch('/api/users/1');
const user: User = await response.json(); // Dangereux !
// Si l'API renvoie { id: "abc", nom: "Jean" }, aucune erreur
// Le crash arrive plus tard, dans un endroit inattendu`}
        language="typescript"
        filename="probleme-sans-validation.ts"
        highlightLines={[10, 11]}
        category="fundamentals"
      />

      <ConceptCard
        title="Ce qui se passe sous le capot : le compilateur efface les types"
        description="TypeScript compile en JavaScript pur. Le compilateur tsc supprime TOUS les types, interfaces et generics. Il ne reste aucune verification a l'execution."
        category="fundamentals"
      >
        <ul className="space-y-3 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span><code>const user: User = data</code> devient simplement <code>const user = data</code> en JavaScript</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Les <code>interface</code>, <code>type</code> et <code>as User</code> sont des instructions pour le compilateur, pas pour le runtime</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Le navigateur et Node.js executent du JavaScript, pas du TypeScript -- aucune verification de type a l&apos;execution</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Les bugs lies aux types incorrects sont silencieux : les donnees se propagent dans l&apos;application avant de provoquer un crash</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// AVANT compilation (TypeScript)
interface User {
  id: number;
  email: string;
}

const response = await fetch('/api/users/1');
const user: User = await response.json();

console.log(user.id + 1);            // On attend 2
console.log(user.email.toUpperCase()); // On attend "JEAN@EXAMPLE.COM"

// -----------------------------------------------------------
// APRES compilation (JavaScript genere par tsc)
// Les types ont COMPLETEMENT disparu :

const response = await fetch('/api/users/1');
const user = await response.json();  // Plus aucun type !

console.log(user.id + 1);
console.log(user.email.toUpperCase());

// -----------------------------------------------------------
// Ce qui se passe REELLEMENT quand l'API renvoie des types inattendus :
// L'API renvoie : { id: "abc", email: 42 }

user.id + 1;
// Resultat : "abc1" (concatenation string au lieu d'addition)
// Pas d'erreur ! Le bug se propage silencieusement.

user.email.toUpperCase();
// TypeError: user.email.toUpperCase is not a function
// Car email est un number (42), pas un string.
// Le crash arrive ICI, loin de la source du probleme.

// TypeScript n'a RIEN pu faire : les types avaient deja ete effaces.
// Sans validation runtime, vous decouvrez ces bugs en production.`}
        language="typescript"
        filename="compilation-effacement.ts"
        highlightLines={[18, 19, 29, 30, 33, 34]}
        category="fundamentals"
      />

      <ConceptCard
        title="La solution Zod : un schema = un type"
        description="Avec Zod, vous definissez un schema de validation ET TypeScript infere le type automatiquement. Une seule source de verite."
        category="fundamentals"
      >
        <ul className="space-y-3 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>TypeScript-first</strong> : types inferes automatiquement via z.infer</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Zero dependances</strong> : ~17 KB gzipped, aucune librairie tierce</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Ecosysteme riche</strong> : integrations natives avec tRPC, React Hook Form, shadcn/ui</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>API composable</strong> : schemas reutilisables, extensibles, transformables</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`import { z } from 'zod';

// 1. Definir le schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
});

// 2. TypeScript infere le type automatiquement
type User = z.infer<typeof UserSchema>;
// => { id: number; name: string; email: string }

// 3. Valider les donnees a l'execution
const response = await fetch('/api/users/1');
const data = await response.json();
const user = UserSchema.parse(data); // Valide ET type !
// Si les donnees sont invalides -> ZodError avec details`}
        language="typescript"
        filename="solution-zod.ts"
        highlightLines={[11, 17]}
        category="fundamentals"
      />

      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
        <h3 className="text-lg font-bold mb-4">Retour d&apos;experience -- Scanorr</h3>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-foreground/80 leading-relaxed">
            J&apos;ai adopte Zod dans mon SaaS{' '}
            <a href="https://scanorr.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              Scanorr
            </a>{' '}
            principalement pour deux raisons : la validation des objets API entrants et la validation
            des formulaires. Ce qui m&apos;a convaincu, c&apos;est la simplicite d&apos;utilisation -- definir un schema
            et obtenir a la fois la validation runtime et le type TypeScript sans duplication de code.
            Sur un SaaS ou la fiabilite des donnees est critique, cette approche a elimine une categorie
            entiere de bugs lies aux donnees mal formees.
          </p>
        </div>
      </div>
    </div>
  );
}
