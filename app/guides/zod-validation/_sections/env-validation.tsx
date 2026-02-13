import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { AlertTriangle, Check } from 'lucide-react';

export default function EnvValidationSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Les variables d&apos;environnement sont un point d&apos;entree critique de votre application.
          <code>process.env</code> retourne toujours <code>string | undefined</code>, sans aucune
          garantie de type. Zod permet de valider et typer ces variables au demarrage, pour
          echouer immediatement si la configuration est invalide.
        </p>
      </div>

      <ConceptCard
        title="Le probleme : process.env ment"
        description="TypeScript ne peut pas connaitre les variables d'environnement a la compilation. Tout est string | undefined."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Variable manquante = crash en production a un moment imprevisible</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Pas de type-checking : PORT est toujours une string, jamais un number</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Typo dans le nom de la variable = undefined silencieux</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Sans validation : bombe a retardement
const apiKey = process.env.API_KEY; // string | undefined
const port = process.env.PORT;       // string | undefined, jamais number !

// Ce code peut tourner pendant des heures avant de crash
// quand il essaie enfin d'utiliser apiKey
fetch(\`https://api.example.com?key=\${apiKey}\`);
// Si API_KEY est undefined -> URL invalide, erreur opaque

// PORT est "3000" (string), pas 3000 (number)
app.listen(parseInt(port!)); // Que se passe-t-il si PORT est undefined ?`}
        language="typescript"
        filename="probleme-env-vars.ts"
        highlightLines={[2, 3, 10]}
        category="optimization"
      />

      <ConceptCard
        title="La solution : schema Zod au demarrage"
        description="Definir un schema pour toutes les variables d'environnement et le valider une seule fois au demarrage. Fail fast."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Erreur immediate si une variable manque ou a un format invalide</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Coercion automatique (string vers number, boolean, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Autocompletion dans l&apos;IDE pour toutes les variables</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// lib/env.ts -- valider au demarrage, importer partout
import { z } from 'zod';

const EnvSchema = z.object({
  // Base
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),

  // Base de donnees
  DATABASE_URL: z.string().url('DATABASE_URL doit etre une URL valide'),

  // Authentication
  JWT_SECRET: z.string().min(32, 'JWT_SECRET doit faire au moins 32 caracteres'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // API externes
  STRIPE_SECRET_KEY: z.string().startsWith('sk_', 'Cle Stripe invalide'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),

  // Feature flags
  ENABLE_ANALYTICS: z.coerce.boolean().default(false),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().default(10),
});

// Valider UNE SEULE FOIS au demarrage
export const env = EnvSchema.parse(process.env);

// Type infere automatiquement
export type Env = z.infer<typeof EnvSchema>;

// Utilisation dans le code :
// import { env } from '@/lib/env';
// env.PORT          -> number (pas string !)
// env.NODE_ENV      -> 'development' | 'production' | 'test'
// env.DATABASE_URL  -> string (garanti present)`}
        language="typescript"
        filename="lib/env.ts"
        highlightLines={[31, 36, 37, 38, 39]}
        category="optimization"
      />

      <CodeBlock
        code={`// Pour Next.js : separer variables client et serveur

// lib/env-server.ts -- variables serveur uniquement
const ServerEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
});

export const serverEnv = ServerEnvSchema.parse(process.env);

// lib/env-client.ts -- variables publiques (NEXT_PUBLIC_*)
const ClientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
});

export const clientEnv = ClientEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
});`}
        language="typescript"
        filename="env-client-server.ts"
        highlightLines={[4, 13]}
        category="optimization"
      />

      <CodeBlock
        code={`// Alternative avec t3-env (integration Next.js)
// npm install @t3-oss/env-nextjs

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
    NODE_ENV: z.enum(['development', 'production', 'test']),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  // Requis pour Next.js
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});

// Avantage t3-env :
// - Empeche l'acces aux variables serveur cote client
// - Validation automatique au build
// - Erreur claire si une variable manque`}
        language="typescript"
        filename="env-t3.ts"
        highlightLines={[7, 8, 13]}
        category="optimization"
      />
    </div>
  );
}
