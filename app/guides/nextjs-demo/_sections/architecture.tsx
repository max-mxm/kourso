import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check } from 'lucide-react';

export default function ArchitectureSection() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="space-y-4">
        <p className="text-lg text-foreground/90 leading-relaxed">
          Une <strong>architecture solide</strong> est la clé d'un projet maintenable, scalable et testable.
          Ce guide présente les principes SOLID, la Clean Architecture, et les patterns essentiels pour structurer
          une application Next.js professionnelle.
        </p>
      </div>

      {/* Principes SOLID */}
      <ConceptCard
        title="Principes SOLID"
        description="Les 5 principes fondamentaux de la programmation orientée objet, appliqués au développement React et Next.js moderne."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                S
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Single Responsibility</div>
                <div className="text-sm text-muted-foreground">
                  Un composant = une responsabilité unique. Évitez les "God Components" qui font tout.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                O
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Open/Closed</div>
                <div className="text-sm text-muted-foreground">
                  Ouvert à l'extension, fermé à la modification. Utilisez CVA (Class Variance Authority) et les props pour étendre le comportement.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                L
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Liskov Substitution</div>
                <div className="text-sm text-muted-foreground">
                  Les composants enfants doivent pouvoir remplacer leurs parents sans casser l'interface. Interfaces cohérentes et prévisibles.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                I
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Interface Segregation</div>
                <div className="text-sm text-muted-foreground">
                  Créez des interfaces ciblées plutôt qu'une seule interface universelle. Évitez les props inutilisées.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                D
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Dependency Inversion</div>
                <div className="text-sm text-muted-foreground">
                  Dépendez d'abstractions, pas d'implémentations. Utilisez des interfaces pour découpler le code.
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Example SOLID */}
      <CodeBlock
        code={`// ❌ Violation de Single Responsibility - God Component
export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState({});

  // Fetch user, posts, analytics, tout est mélangé
  // Logique d'affichage, de validation, de tracking...
  // Ce composant fait TROP de choses
}

// ✅ Respect du Single Responsibility
export default function UserProfile({ userId }: { userId: string }) {
  return (
    <div>
      <UserInfo userId={userId} />
      <UserPosts userId={userId} />
      <UserAnalytics userId={userId} />
    </div>
  );
}

// Chaque composant a une responsabilité claire et unique`}
        language="tsx"
        filename="components/user-profile.tsx"
        highlightLines={[10, 11, 12, 13, 14]}
        category="best-practices"
      />

      {/* Clean Architecture */}
      <ConceptCard
        title="Clean Architecture - 4 Layers"
        description="Organisation du code en couches concentriques pour séparer la logique métier de l'infrastructure technique."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              1
            </div>
            <div>
              <div className="font-medium text-foreground">Domain - Business Logic</div>
              <div className="text-sm text-muted-foreground">
                Entités et règles métier pures. Indépendant de toute technologie (base de données, UI, framework).
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              2
            </div>
            <div>
              <div className="font-medium text-foreground">Use Cases - Application Logic</div>
              <div className="text-sm text-muted-foreground">
                Orchestration des règles métier. Coordonne les entités pour accomplir des cas d'usage spécifiques.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              3
            </div>
            <div>
              <div className="font-medium text-foreground">Adapters - Controllers, Gateways</div>
              <div className="text-sm text-muted-foreground">
                Convertit les données entre le monde extérieur (DB, API) et les use cases. Server Actions, API Routes.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              4
            </div>
            <div>
              <div className="font-medium text-foreground">Infrastructure - DB, API, UI</div>
              <div className="text-sm text-muted-foreground">
                Détails techniques. Prisma, PostgreSQL, React components. Facilement remplaçables sans changer la logique métier.
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* File Organization */}
      <CodeBlock
        code={`src/
├── features/               # Organisation par feature (recommandé)
│   ├── inspections/
│   │   ├── components/     # Composants UI spécifiques
│   │   │   ├── inspection-list.tsx
│   │   │   └── inspection-detail.tsx
│   │   ├── hooks/          # Hooks métier de la feature
│   │   │   └── use-inspections.ts
│   │   ├── server-actions/ # Mutations serveur
│   │   │   └── actions.ts
│   │   ├── schemas/        # Validation Zod
│   │   │   └── inspection.schema.ts
│   │   └── types/          # Types TypeScript
│   │       └── inspection.types.ts
│   │
│   └── users/
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── lib/                    # Utilitaires partagés
│   ├── db/                 # Client base de données
│   ├── utils/              # Fonctions utilitaires
│   └── auth/               # Logique d'authentification
│
└── app/                    # Next.js App Router
    ├── (dashboard)/
    └── api/

# Avantage : tout ce qui concerne "inspections" est dans un seul dossier
# Scalable, facile à maintenir, délimite clairement les responsabilités`}
        language="plaintext"
        filename="Structure recommandée"
        highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
        category="best-practices"
      />

      {/* Design Patterns */}
      <ConceptCard
        title="Design Patterns Essentiels"
        description="Patterns architecturaux adaptés à Next.js pour structurer efficacement votre application."
        category="best-practices"
      >
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="font-medium text-foreground mb-2">Repository Pattern</div>
            <div className="text-muted-foreground mb-2">
              Abstraction de la couche de données. Sépare la logique d'accès aux données de la logique métier.
            </div>
            <div className="text-xs text-muted-foreground">
              Exemple : <code className="bg-muted px-1 py-0.5 rounded">InspectionRepository</code> encapsule toutes les requêtes Prisma liées aux inspections.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="font-medium text-foreground mb-2">Factory Pattern</div>
            <div className="text-muted-foreground mb-2">
              Crée dynamiquement des composants ou des instances selon un paramètre. Très utile pour les composants polymorphes.
            </div>
            <div className="text-xs text-muted-foreground">
              Exemple : <code className="bg-muted px-1 py-0.5 rounded">FieldFactory</code> retourne différents composants de formulaire selon le type de champ.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="font-medium text-foreground mb-2">Adapter Pattern</div>
            <div className="text-muted-foreground mb-2">
              Convertit une interface en une autre. Crucial pour faire communiquer la DB avec le frontend.
            </div>
            <div className="text-xs text-muted-foreground">
              Exemple : <code className="bg-muted px-1 py-0.5 rounded">PrismaUserAdapter</code> transforme les modèles Prisma en objets conformes à l'interface frontend.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="font-medium text-foreground mb-2">Observer Pattern</div>
            <div className="text-muted-foreground mb-2">
              Un sujet notifie ses observateurs des changements d'état. Implémenté nativement par React Query.
            </div>
            <div className="text-xs text-muted-foreground">
              Exemple : Tous les composants utilisant <code className="bg-muted px-1 py-0.5 rounded">useQuery('users')</code> sont automatiquement re-rendus quand les données changent.
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Testing Strategy */}
      <ConceptCard
        title="Testing Strategy - Pyramide de Tests"
        description="Une stratégie de tests équilibrée garantit la qualité sans sacrifier la vélocité de développement."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
              <div>
                <span className="font-medium text-foreground">70% Unit Tests (Vitest)</span>
                <div className="text-sm text-muted-foreground">
                  Testent des fonctions, hooks, utilitaires isolés. Rapides, faciles à maintenir.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
              <div>
                <span className="font-medium text-foreground">20% Integration Tests (RTL)</span>
                <div className="text-sm text-muted-foreground">
                  Testent l'interaction entre composants. React Testing Library pour simuler les actions utilisateur.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
              <div>
                <span className="font-medium text-foreground">10% E2E Tests (Playwright)</span>
                <div className="text-sm text-muted-foreground">
                  Testent les parcours critiques de bout en bout dans un vrai navigateur. Plus lents, mais indispensables.
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Code Example - Repository Pattern */}
      <CodeBlock
        code={`// Repository Pattern - Abstraction de la couche de données

// lib/repositories/inspection.repository.ts
import { prisma } from '@/lib/db';
import type { Inspection } from '@/types/inspection';

export class InspectionRepository {
  async findAll(): Promise<Inspection[]> {
    return await prisma.inspection.findMany({
      include: { user: true, site: true }
    });
  }

  async findById(id: string): Promise<Inspection | null> {
    return await prisma.inspection.findUnique({
      where: { id },
      include: { user: true, site: true }
    });
  }

  async create(data: CreateInspectionInput): Promise<Inspection> {
    return await prisma.inspection.create({
      data,
      include: { user: true, site: true }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.inspection.delete({ where: { id } });
  }
}

// Utilisation dans une Server Action
import { InspectionRepository } from '@/lib/repositories/inspection.repository';

export async function getInspections() {
  const repo = new InspectionRepository();
  return await repo.findAll();
}

// Avantage : Si vous changez de DB (Prisma → Drizzle),
// vous ne modifiez QUE le repository, pas toute l'application`}
        language="typescript"
        filename="lib/repositories/inspection.repository.ts"
        highlightLines={[5, 8, 14, 21, 36, 37, 38, 39]}
        category="best-practices"
      />

      {/* Pièges à éviter */}
      <div className="border-2 border-red-500/30 rounded-lg p-6 bg-red-500/5">
        <h3 className="text-lg font-bold text-red-500 mb-4">Pièges à éviter</h3>
        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium text-foreground">1. Over-engineering</div>
            <div className="text-muted-foreground">
              N'ajoutez pas d'abstraction avant d'en avoir vraiment besoin. Commencez simple, refactorez quand la complexité augmente.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">2. God Components</div>
            <div className="text-muted-foreground">
              Si un composant dépasse 200 lignes, c'est probablement qu'il fait trop de choses. Découpez en sous-composants.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">3. Coupling fort</div>
            <div className="text-muted-foreground">
              Évitez les dépendances directes entre features. Utilisez des événements, des hooks partagés ou un state manager global si nécessaire.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">4. Pas de tests</div>
            <div className="text-muted-foreground">
              Écrire des tests APRÈS le code est 10x plus difficile. Testez au fur et à mesure, ou pratiquez le TDD (Test-Driven Development).
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">5. Tech-based folders</div>
            <div className="text-muted-foreground">
              Organiser par technologie (components/, hooks/, utils/) devient vite ingérable. Privilégiez l'organisation par feature.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
