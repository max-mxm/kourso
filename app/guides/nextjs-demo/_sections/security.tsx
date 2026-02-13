'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check, X } from 'lucide-react';

export function SecuritySection() {
  const validationApproaches = [
    {
      name: 'Validation Client Uniquement',
      description: 'Validation côté navigateur avec JavaScript',
      pros: ['UX réactive', 'Feedback immédiat'],
      cons: ['Contournable (DevTools)', 'Pas de protection réelle', 'Faille de sécurité critique'],
      useCases: ['Jamais en production', 'Amélioration UX seulement'],
      color: 'rgb(239, 68, 68)'
    },
    {
      name: 'Validation Client + Serveur',
      description: 'Double validation (UX + sécurité)',
      pros: ['UX réactive', 'Sécurité garantie', 'Protection OWASP'],
      cons: ['Duplication du code de validation'],
      useCases: ['Production (obligatoire)', 'Applications sécurisées', 'APIs publiques'],
      color: 'rgb(34, 197, 94)'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          La sécurité est primordiale dans Next.js. Ce guide couvre les vulnérabilités OWASP Top 10
          et les solutions concrètes avec Supabase, Zod et les Security Headers.
        </p>
      </div>

      {/* OWASP Top 10 */}
      <ConceptCard
        title="OWASP Top 10 : Vulnérabilités Critiques"
        description="Les 5 vulnérabilités les plus fréquentes dans les applications Next.js et comment les prévenir efficacement."
        category="best-practices"
      >
        <div className="space-y-6">
          {/* 1. Broken Access Control */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              1. Broken Access Control
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-start gap-2 mb-2">
                  <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <h5 className="font-bold text-red-600 dark:text-red-400">Code Vulnérable</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vérifier ownership uniquement côté client
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-start gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <h5 className="font-bold text-green-600 dark:text-green-400">Solution Sécurisée</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vérification serveur + Row-Level Security (RLS)
                </p>
              </div>
            </div>
            <CodeBlock
              code={`// ❌ VULNÉRABLE : Vérification client uniquement
'use client';

export function DeleteButton({ inspectionId, userId }: { inspectionId: string; userId: string }) {
  const handleDelete = async () => {
    // ⚠️ userId peut être modifié dans DevTools !
    await fetch('/api/inspections', {
      method: 'DELETE',
      body: JSON.stringify({ inspectionId, userId })
    });
  };
  return <button onClick={handleDelete}>Supprimer</button>;
}

// ✅ SÉCURISÉ : Vérification serveur + RLS Supabase
'use server';

import { createClient } from '@/lib/supabase/server';

export async function deleteInspection(inspectionId: string) {
  const supabase = await createClient();

  // Récupération userId authentifié (impossible à falsifier)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  // RLS Supabase vérifie automatiquement l'ownership
  const { error } = await supabase
    .from('property_inspections')
    .delete()
    .eq('id', inspectionId);
    // .eq('user_id', user.id); // ✅ RLS vérifie automatiquement

  if (error) throw error;
}`}
              language="tsx"
              filename="app/actions/inspection.ts"
              highlightLines={[19, 20, 23, 24, 28, 29, 30, 31]}
              category="best-practices"
            />
          </div>

          {/* 2. Cryptographic Failures */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              2. Cryptographic Failures
            </h4>
            <CodeBlock
              code={`// ✅ Supabase Auth : Hashing sécurisé avec bcrypt
// Jamais stocker de mots de passe en clair !

// Inscription utilisateur
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SuperSecretPassword123!', // ✅ Hashé automatiquement avec bcrypt
});

// Supabase utilise :
// - bcrypt pour hasher les mots de passe
// - 10 rounds de salting (coût optimal)
// - Stockage dans auth.users (table protégée)

// ✅ Chiffrement des données sensibles avec pgcrypto
// Exemple : Chiffrer les numéros de carte bancaire
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO payments (user_id, card_number_encrypted)
VALUES (
  '123',
  pgp_sym_encrypt('4111-1111-1111-1111', 'secret-key-from-env')
);

SELECT pgp_sym_decrypt(card_number_encrypted, 'secret-key-from-env') AS card_number
FROM payments WHERE user_id = '123';`}
              language="sql"
              filename="supabase/migrations/encryption.sql"
              highlightLines={[7, 10, 11, 12, 20, 21, 22]}
              category="best-practices"
            />
          </div>

          {/* 3. Injection */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              3. Injection (SQL, XSS, Command)
            </h4>
            <CodeBlock
              code={`// ❌ SQL INJECTION VULNERABLE
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userInput); // ⚠️ Si userInput = "' OR '1'='1", retourne TOUS les users

// ✅ SÉCURISÉ : Parameterized Queries (Supabase utilise automatiquement)
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userInput); // ✅ userInput est automatiquement échappé

// ❌ XSS VULNERABLE : Injection JavaScript
export function UserComment({ comment }: { comment: string }) {
  return <div dangerouslySetInnerHTML={{ __html: comment }} />;
  // ⚠️ Si comment = "<script>alert('XSS')</script>", exécute le script !
}

// ✅ SÉCURISÉ : React échappe automatiquement
export function UserComment({ comment }: { comment: string }) {
  return <div>{comment}</div>; // ✅ <script> est affiché comme texte
}

// ✅ Si HTML nécessaire : Sanitize avec DOMPurify
import DOMPurify from 'isomorphic-dompurify';

export function UserComment({ comment }: { comment: string }) {
  const sanitized = DOMPurify.sanitize(comment, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  });
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}`}
              language="tsx"
              filename="app/components/user-comment.tsx"
              highlightLines={[8, 9, 10, 11, 20, 26, 27, 28, 29]}
              category="best-practices"
            />
          </div>

          {/* 4. Insecure Design (IDOR) */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              4. Insecure Design : IDOR (Insecure Direct Object Reference)
            </h4>
            <CodeBlock
              code={`// ❌ IDOR VULNERABLE : IDs prévisibles séquentiels
// URL : /api/inspections/1234 (attaquant peut tester 1235, 1236...)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // ⚠️ ID prévisible
  const inspection = await db.inspection.findUnique({ where: { id: parseInt(id) } });
  return Response.json(inspection);
}

// ✅ SÉCURISÉ : UUIDs non-prévisibles + vérification ownership
// URL : /api/inspections/550e8400-e29b-41d4-a716-446655440000
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  // UUID impossible à deviner + vérification ownership
  const { data: inspection, error } = await supabase
    .from('property_inspections')
    .select('*')
    .eq('id', params.id) // ✅ UUID : 550e8400-e29b-41d4-a716-446655440000
    .eq('user_id', user.id) // ✅ Vérification ownership
    .single();

  if (error || !inspection) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(inspection);
}`}
              language="tsx"
              filename="app/api/inspections/[id]/route.ts"
              highlightLines={[11, 19, 20, 21, 22, 23, 24]}
              category="best-practices"
            />
          </div>

          {/* 5. Security Misconfiguration */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-500" />
              5. Security Misconfiguration
            </h4>
            <CodeBlock
              code={`// ❌ VULNÉRABLE : Exposer des secrets côté client
// .env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # ✅ OK (publique)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # ⚠️ NE JAMAIS exposer !

// ❌ Code vulnérable
'use client';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // ⚠️ undefined côté client !
// Si utilisé avec NEXT_PUBLIC_, la clé serait exposée dans le bundle JS

// ✅ SÉCURISÉ : Service key uniquement serveur
'use server';
import { createClient } from '@supabase/supabase-js';

export async function deleteUserAdmin(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ Accessible uniquement serveur
  );

  // Actions admin (bypass RLS)
  await supabase.auth.admin.deleteUser(userId);
}`}
              language="tsx"
              filename="app/actions/admin.ts"
              highlightLines={[4, 14, 15, 16, 17, 18, 22]}
              category="best-practices"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Row-Level Security (RLS) */}
      <ConceptCard
        title="Row-Level Security (RLS) Supabase"
        description="RLS garantit que chaque utilisateur accède uniquement à ses propres données, même en cas de faille dans le code applicatif."
        category="best-practices"
      >
        <CodeBlock
          code={`-- Activer RLS sur la table
ALTER TABLE property_inspections ENABLE ROW LEVEL SECURITY;

-- Politique : Users accèdent uniquement à leurs propres inspections
CREATE POLICY "Users access own inspections"
ON property_inspections
FOR ALL -- SELECT, INSERT, UPDATE, DELETE
USING (auth.uid() = user_id) -- Vérifie que l'user authentifié = user_id de la row
WITH CHECK (auth.uid() = user_id); -- Vérifie lors d'INSERT/UPDATE

-- Test de sécurité : Un user ne peut PAS accéder aux données d'un autre
-- User A (auth.uid() = '123') tente d'accéder à une inspection de User B (user_id = '456')
SELECT * FROM property_inspections WHERE id = 'uuid-de-user-b';
-- Résultat : 0 rows (RLS bloque automatiquement)

-- Politique Admin : Bypass RLS pour admins
CREATE POLICY "Admins access all inspections"
ON property_inspections
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Impact : Même si un développeur oublie .eq('user_id', user.id),
-- RLS protège automatiquement les données !`}
          language="sql"
          filename="supabase/migrations/rls_policies.sql"
          highlightLines={[2, 5, 6, 7, 8, 9, 13, 27, 28]}
          category="best-practices"
        />
      </ConceptCard>

      {/* Input Validation avec Zod */}
      <ConceptCard
        title="Input Validation avec Zod"
        description="Zod permet de valider et typer les données côté serveur et client avec un seul schéma."
        category="best-practices"
      >
        <div className="mb-6">
          <ComparisonTable modes={validationApproaches} />
        </div>

        <CodeBlock
          code={`import { z } from 'zod';

// Schéma de validation réutilisable
const InspectionSchema = z.object({
  title: z.string()
    .min(3, 'Titre trop court')
    .max(100, 'Titre trop long')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Caractères spéciaux interdits'),

  email: z.string()
    .email('Email invalide')
    .toLowerCase() // Normalisation
    .trim(), // Supprime espaces

  price: z.number()
    .positive('Prix doit être positif')
    .max(1000000, 'Prix trop élevé'),

  category: z.enum(['residential', 'commercial', 'industrial']),

  address: z.object({
    street: z.string().min(5),
    zipCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  }),
});

// Type TypeScript généré automatiquement
type Inspection = z.infer<typeof InspectionSchema>;

// Utilisation côté serveur
'use server';

export async function createInspection(formData: FormData) {
  // Validation avec Zod
  const result = InspectionSchema.safeParse({
    title: formData.get('title'),
    email: formData.get('email'),
    price: parseFloat(formData.get('price') as string),
    category: formData.get('category'),
    address: {
      street: formData.get('street'),
      zipCode: formData.get('zipCode'),
    },
  });

  // Si validation échoue
  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
      // { title: ['Titre trop court'], email: ['Email invalide'] }
    };
  }

  // Données validées et typées
  const validatedData = result.data; // ✅ Type-safe

  // Insertion en DB
  await supabase.from('inspections').insert(validatedData);
}`}
          language="tsx"
          filename="app/actions/inspection.ts"
          highlightLines={[4, 5, 6, 7, 8, 10, 11, 12, 13, 28, 35, 36, 47, 48, 49, 54]}
          category="best-practices"
        />
      </ConceptCard>

      {/* Security Headers */}
      <ConceptCard
        title="Security Headers Essentiels"
        description="Les headers HTTP sécurisent l'application contre XSS, clickjacking, MIME sniffing et autres attaques."
        category="best-practices"
      >
        <CodeBlock
          code={`// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // ✅ Empêche MIME sniffing (ex: .txt exécuté comme .js)
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY', // ✅ Empêche clickjacking (iframe)
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains', // ✅ Force HTTPS
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'", // ✅ Ressources uniquement du même domaine
              "script-src 'self' 'unsafe-inline' https://vercel.live", // Scripts autorisés
              "style-src 'self' 'unsafe-inline'", // Styles autorisés
              "img-src 'self' data: https:", // Images autorisées
              "font-src 'self' data:", // Polices autorisées
              "connect-src 'self' https://*.supabase.co", // APIs autorisées
              "frame-ancestors 'none'", // ✅ Équivalent X-Frame-Options
            ].join('; '),
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // ✅ Limite info envoyée aux sites externes
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // ✅ Désactive APIs sensibles
          },
        ],
      },
    ];
  },
};

// Vérifier les headers : https://securityheaders.com
// Score cible : A+`}
          language="javascript"
          filename="next.config.js"
          highlightLines={[10, 14, 18, 23, 24, 29, 35, 39]}
          category="best-practices"
        />
      </ConceptCard>

      {/* Pièges Critiques */}
      <ConceptCard
        title="Pièges Critiques à Éviter"
        description="Les erreurs de sécurité les plus fréquentes dans les applications Next.js et comment les détecter."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  1. Valider seulement côté client
                </h5>
                <p className="text-sm text-muted-foreground">
                  La validation client peut être contournée. Toujours valider côté serveur avec Zod.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  2. Exposer SUPABASE_SERVICE_ROLE_KEY avec NEXT_PUBLIC_
                </h5>
                <p className="text-sm text-muted-foreground">
                  Jamais préfixer les secrets avec NEXT_PUBLIC_ (expose dans le bundle client).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  3. Oublier d'activer RLS sur les nouvelles tables
                </h5>
                <p className="text-sm text-muted-foreground">
                  Par défaut, RLS est désactivé. Toujours activer avec ALTER TABLE ... ENABLE ROW LEVEL SECURITY.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  4. Utiliser dangerouslySetInnerHTML sans DOMPurify
                </h5>
                <p className="text-sm text-muted-foreground">
                  Vulnérabilité XSS. Toujours sanitize avec DOMPurify avant d'injecter du HTML.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  5. Pas de rate limiting sur APIs publiques
                </h5>
                <p className="text-sm text-muted-foreground">
                  Implémenter rate limiting avec Upstash Redis ou Vercel Edge Config pour éviter abus.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  6. Utiliser IDs séquentiels (1, 2, 3...) au lieu d'UUIDs
                </h5>
                <p className="text-sm text-muted-foreground">
                  IDOR vulnerability. Toujours utiliser UUIDs (uuid_generate_v4() dans Postgres).
                </p>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Checklist Sécurité */}
      <ConceptCard
        title="Checklist Sécurité Avant Production"
        description="Vérifications essentielles avant de déployer une application Next.js sécurisée."
        category="best-practices"
      >
        <div className="space-y-3">
          {[
            'RLS activé sur toutes les tables Supabase',
            'Validation Zod sur toutes les Server Actions',
            'Secrets sans NEXT_PUBLIC_ (sauf ANON_KEY)',
            'Security Headers configurés (CSP, HSTS, X-Frame-Options)',
            'DOMPurify pour tout HTML utilisateur',
            'UUIDs au lieu d\'IDs séquentiels',
            'Rate limiting sur APIs publiques',
            'HTTPS forcé (Strict-Transport-Security)',
            'Tests de sécurité (OWASP ZAP ou Burp Suite)',
            'Audit npm (npm audit fix)',
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </ConceptCard>
    </div>
  );
}
