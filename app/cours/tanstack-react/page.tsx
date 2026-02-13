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
      title: "Introduction a l'ecosysteme TanStack",
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />,
    },
    {
      id: 'query-basics',
      title: 'TanStack Query - Les Bases',
      icon: <Database className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <QueryBasicsSection />,
    },

    // 3-6. Rendering / Core
    {
      id: 'query-advanced',
      title: 'Query - Options et Strategies Avancees',
      icon: <Settings className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <QueryAdvancedSection />,
    },
    {
      id: 'mutations-invalidation',
      title: 'Mutations et Invalidation du Cache',
      icon: <RefreshCw className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <MutationsInvalidationSection />,
    },
    {
      id: 'query-patterns',
      title: 'Query Patterns et queryOptions',
      icon: <Code className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <QueryPatternsSection />,
    },
    {
      id: 'tanstack-router',
      title: 'TanStack Router - Routing Type-Safe',
      icon: <Navigation className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <TanStackRouterSection />,
    },

    // 7-10. Optimisations
    {
      id: 'tanstack-table',
      title: 'TanStack Table - Tableaux Headless',
      icon: <Table2 className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TanStackTableSection />,
    },
    {
      id: 'tanstack-virtual',
      title: 'TanStack Virtual - Virtualisation 60fps',
      icon: <List className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TanStackVirtualSection />,
    },
    {
      id: 'tanstack-form',
      title: 'TanStack Form - Formulaires Performants',
      icon: <FileText className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TanStackFormSection />,
    },
    {
      id: 'tanstack-store',
      title: 'TanStack Store - State Reactif Minimal',
      icon: <Box className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TanStackStoreSection />,
    },

    // 11-12. Bonnes Pratiques
    {
      id: 'tanstack-pacer',
      title: 'TanStack Pacer - Timing et Scheduling',
      icon: <Timer className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <TanStackPacerSection />,
    },
    {
      id: 'devtools',
      title: 'DevTools et Debugging',
      icon: <Monitor className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <DevtoolsSection />,
    },

    // 13-14. Avance
    {
      id: 'ssr-nextjs',
      title: 'SSR et Integration Next.js',
      icon: <Server className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <SSRNextJSSection />,
    },
    {
      id: 'architecture-production',
      title: "Architecture de Production",
      icon: <Building className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <ArchitectureProductionSection />,
    },
  ];

  return (
    <CourseLayout
      title="TanStack - Ecosysteme Complet React"
      subtitle="Query, Router, Table, Virtual, Form, Store et Pacer - 14 sections"
      sections={sections}
    />
  );
}
