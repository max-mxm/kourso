import { CourseLayout } from '@/components/course/course-layout';
import { Rocket, Database, Settings, RefreshCw, Code, Navigation, Table2, List, FileText, Box, Timer, Monitor, Server, Building } from 'lucide-react';

// Import des sections - Fondamentaux (2)
import IntroductionSection from './_sections/introduction';
import QueryBasicsSection from './_sections/query-basics';

// Import des sections - Rendering / Core (4)
import QueryAdvancedSection from './_sections/query-advanced';
import MutationsInvalidationSection from './_sections/mutations-invalidation';
import QueryPatternsSection from './_sections/query-patterns';
import TanStackRouterSection from './_sections/tanstack-router';

// Import des sections - Optimisations (4)
import TanStackTableSection from './_sections/tanstack-table';
import TanStackVirtualSection from './_sections/tanstack-virtual';
import TanStackFormSection from './_sections/tanstack-form';
import TanStackStoreSection from './_sections/tanstack-store';

// Import des sections - Bonnes Pratiques (2)
import TanStackPacerSection from './_sections/tanstack-pacer';
import DevtoolsSection from './_sections/devtools';

// Import des sections - Avance (2)
import SSRNextJSSection from './_sections/ssr-nextjs';
import ArchitectureProductionSection from './_sections/architecture-production';

export default function TanStackReactCourse() {
  const sections = [
    // 1-2. Fondamentaux
    {
      id: 'introduction',
      title: 'Pourquoi TanStack élimine votre boilerplate React ?',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />,
    },
    {
      id: 'query-basics',
      title: 'Comment gérer vos requêtes API sans useState ?',
      icon: <Database className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <QueryBasicsSection />,
    },

    // 3-6. Rendering / Core
    {
      id: 'query-advanced',
      title: 'Quelles options pour optimiser votre cache ?',
      icon: <Settings className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <QueryAdvancedSection />,
    },
    {
      id: 'mutations-invalidation',
      title: 'Comment synchroniser vos mutations avec le cache ?',
      icon: <RefreshCw className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <MutationsInvalidationSection />,
    },
    {
      id: 'query-patterns',
      title: 'Comment structurer vos queries en production ?',
      icon: <Code className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <QueryPatternsSection />,
    },
    {
      id: 'tanstack-router',
      title: 'Pourquoi votre routing devrait être type-safe ?',
      icon: <Navigation className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <TanStackRouterSection />,
    },

    // 7-10. Optimisations
    {
      id: 'tanstack-table',
      title: 'Comment créer des tableaux complexes sans librairie UI ?',
      icon: <Table2 className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TanStackTableSection />,
    },
    {
      id: 'tanstack-virtual',
      title: 'Comment afficher 100k lignes sans lag ?',
      icon: <List className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TanStackVirtualSection />,
    },
    {
      id: 'tanstack-form',
      title: 'Comment gérer des formulaires sans re-renders inutiles ?',
      icon: <FileText className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TanStackFormSection />,
    },
    {
      id: 'tanstack-store',
      title: 'Avez-vous vraiment besoin de Redux ou Zustand ?',
      icon: <Box className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TanStackStoreSection />,
    },

    // 11-12. Bonnes Pratiques
    {
      id: 'tanstack-pacer',
      title: 'Comment maîtriser le timing de vos animations ?',
      icon: <Timer className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <TanStackPacerSection />,
    },
    {
      id: 'devtools',
      title: 'Comment débugger efficacement votre cache et vos queries ?',
      icon: <Monitor className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <DevtoolsSection />,
    },

    // 13-14. Avance
    {
      id: 'ssr-nextjs',
      title: 'Comment intégrer TanStack Query avec le SSR Next.js ?',
      icon: <Server className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <SSRNextJSSection />,
    },
    {
      id: 'architecture-production',
      title: 'Comment architecturer une app TanStack en production ?',
      icon: <Building className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <ArchitectureProductionSection />,
    },
  ];

  return (
    <CourseLayout
      title="TanStack : Comment éliminer 80% de votre boilerplate React"
      subtitle="Query, Router, Table, Virtual, Form, Store et Pacer - 14 sections"
      sections={sections}
    />
  );
}
