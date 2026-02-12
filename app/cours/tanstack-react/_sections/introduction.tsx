import { ConceptCard } from '@/components/course/concept-card';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function IntroductionSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Dans toute application React, les donnees proviennent de deux sources
        distinctes : le <strong>client state</strong> (theme, formulaires, UI
        locale) et le <strong>server state</strong> (utilisateurs, produits,
        commandes). Ces deux types d&apos;etat obeissent a des regles
        radicalement differentes. Le server state est asynchrone, partage entre
        plusieurs clients, et peut devenir obsolete a tout moment sans que votre
        application le sache. Gerer ce server state avec useState et useEffect
        revient a reinventer la roue -- mal. C&apos;est exactement le probleme
        que TanStack resout.
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Le probleme du Server State
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Le server state introduit des defis que le client state n&apos;a pas :
          la <strong>mise en cache</strong>, la <strong>deduplication</strong> de
          requetes identiques, la <strong>revalidation</strong> en arriere-plan,
          la gestion des donnees <strong>obsoletes</strong>, et les{' '}
          <strong>mises a jour optimistes</strong>. Un simple useEffect avec
          fetch ne gere aucun de ces cas. Multiplier les useEffect dans une
          application de taille reelle conduit inevitablement a des race
          conditions, des waterfalls de requetes, et un code de plus en plus
          fragile.
        </p>
      </div>

      <ConceptCard
        title="L&apos;ecosysteme TanStack"
        description="TanStack est une collection de librairies headless, framework-agnostic et type-safe, concues pour resoudre des problemes fondamentaux du developpement frontend. Chaque librairie peut etre utilisee independamment."
        category="fundamentals"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">TanStack Query</h4>
                <p className="text-sm text-muted-foreground">
                  Gestion du server state : fetching, caching, synchronisation
                  et mise a jour des donnees asynchrones. La librairie phare de
                  l&apos;ecosysteme.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">TanStack Router</h4>
                <p className="text-sm text-muted-foreground">
                  Routeur 100% type-safe avec loaders, search params valides, et
                  integration native avec TanStack Query.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">TanStack Table</h4>
                <p className="text-sm text-muted-foreground">
                  Moteur de tableaux headless : tri, filtrage, pagination,
                  groupement, selection -- sans aucune UI imposee.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">TanStack Virtual</h4>
                <p className="text-sm text-muted-foreground">
                  Virtualisation de listes et grilles pour afficher des milliers
                  d&apos;elements sans impacter les performances.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">TanStack Form</h4>
                <p className="text-sm text-muted-foreground">
                  Gestion de formulaires headless avec validation, arrays
                  imbriques et performances optimisees par defaut.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">TanStack Store &amp; Pacer</h4>
                <p className="text-sm text-muted-foreground">
                  Store : gestion d&apos;etat reactif framework-agnostic.
                  Pacer : utilitaires de rate limiting, debounce et throttle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      <ComparisonTable
        modes={[
          {
            name: 'useEffect brut',
            description:
              'Approche manuelle avec useState + useEffect + fetch. Aucune couche d&apos;abstraction : chaque composant gere son propre loading, error et cache.',
            pros: [
              'Aucune dependance externe',
              'Controle total sur le flux',
              'Adapte pour un fetch ponctuel tres simple',
            ],
            cons: [
              'Aucun cache : refetch a chaque montage',
              'Race conditions non gerees',
              'Pas de deduplication des requetes identiques',
              'Code boilerplate repetitif',
              'Aucune revalidation en arriere-plan',
            ],
            useCases: [
              'Prototypes rapides',
              'Composants isoles sans reutilisation',
              'Projets sans server state significatif',
            ],
            color: 'rgb(239, 68, 68)',
          },
          {
            name: 'TanStack Query',
            description:
              'Solution complete de gestion du server state avec cache normalise, revalidation automatique, mutations avec invalidation, et devtools integres.',
            pros: [
              'Cache intelligent avec staleTime/gcTime',
              'Revalidation automatique (focus, reconnect)',
              'Deduplication des requetes',
              'Mutations optimistes',
              'DevTools puissants',
              'TypeScript first-class',
            ],
            cons: [
              'Courbe d&apos;apprentissage initiale',
              'Dependance externe (~13kB gzip)',
              'Overhead pour des cas tres simples',
            ],
            useCases: [
              'Applications avec CRUD complexe',
              'Dashboards temps reel',
              'Applications multi-pages avec donnees partagees',
              'Tout projet avec server state significatif',
            ],
            color: 'rgb(0, 150, 136)',
          },
          {
            name: 'SWR',
            description:
              'Librairie de fetching par Vercel, axee sur la strategie stale-while-revalidate. Plus legere que TanStack Query, mais moins de fonctionnalites avancees.',
            pros: [
              'API minimale et intuitive',
              'Bundle plus leger (~4kB gzip)',
              'Revalidation automatique',
              'Integration Next.js fluide',
            ],
            cons: [
              'Pas de mutations structurees',
              'Pas d&apos;invalidation granulaire',
              'Pas d&apos;infinite queries natif',
              'DevTools limites',
              'Moins de controle sur le cache',
            ],
            useCases: [
              'Applications Next.js simples',
              'Projets privilegiant la legerete',
              'Fetching read-only predominant',
            ],
            color: 'rgb(59, 130, 246)',
          },
        ]}
      />

      <ConceptCard
        title="Philosophie headless et framework-agnostic"
        description="Toutes les librairies TanStack partagent une meme philosophie de conception qui les distingue des solutions classiques."
        category="fundamentals"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h4 className="font-bold text-foreground mb-2">Headless</h4>
            <p className="text-sm text-muted-foreground">
              TanStack fournit la logique, pas l&apos;interface. Vous gardez un
              controle total sur le rendu. Contrairement a AG Grid ou Material
              Table, il n&apos;y a aucun style impose. Cela signifie une
              integration parfaite avec votre design system existant, qu&apos;il
              soit base sur Tailwind, CSS Modules ou styled-components.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h4 className="font-bold text-foreground mb-2">Framework-agnostic</h4>
            <p className="text-sm text-muted-foreground">
              Le coeur de chaque librairie est ecrit en TypeScript pur, sans
              dependance a React. Des adaptateurs existent pour React, Vue,
              Solid, Svelte et Angular. Vos connaissances sont transferables
              d&apos;un framework a l&apos;autre.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h4 className="font-bold text-foreground mb-2">Type-safe first</h4>
            <p className="text-sm text-muted-foreground">
              Chaque API est concue avec TypeScript des le depart. Les query
              keys sont types, les mutations infèrent le type du payload, et
              TanStack Router offre une auto-completion complete sur les routes,
              params et search params. L&apos;experience developpeur TypeScript
              est de premier ordre.
            </p>
          </div>
        </div>
      </ConceptCard>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Adopte dans les plus grandes applications
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          TanStack Query est utilise en production par Google, PayPal, Walmart,
          Microsoft, Amazon et des milliers d&apos;autres entreprises. La
          librairie cumule plus de 44 000 etoiles sur GitHub et 5 millions de
          telechargements npm hebdomadaires. TanStack Table propulse les
          tableaux de donnees de Bloomberg, Uber et Netflix. Cette adoption
          massive garantit une maintenance active, une communaute solide, et une
          stabilite eprouvee sur des cas d&apos;usage reels a grande echelle.
        </p>
      </div>
    </div>
  );
}
