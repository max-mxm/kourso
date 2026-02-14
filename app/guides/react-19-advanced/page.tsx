import { CourseLayout } from '@/components/course/course-layout';
import { Rocket, Package, Cpu, Server, Zap, RefreshCw, Activity, Gauge, Trash2, Database, Combine, Building, Shield, Code, TestTube, Eye, Sparkles, Layers } from 'lucide-react';

// Import des sections - Fondamentaux (2)
import IntroductionSection from './_sections/introduction';
import UseHookSection from './_sections/use-hook';

// Import des sections - Rendering & Concurrent (5)
import ReactCompilerSection from './_sections/react-compiler';
import ServerComponentsSection from './_sections/server-components';
import ActionsTransitionsSection from './_sections/actions-transitions';
import UseActionStateSection from './_sections/use-action-state';
import StreamingSection from './_sections/streaming';

// Import des sections - Optimisations (5)
import BundleOptimizationSection from './_sections/bundle-optimization';
import PerformanceHooksSection from './_sections/performance-hooks';
import MemoryManagementSection from './_sections/memory-management';
import DataFetchingSection from './_sections/data-fetching';
import StateConsolidationSection from './_sections/state-consolidation';

// Import des sections - Bonnes Pratiques (5)
import ArchitectureSection from './_sections/architecture';
import ErrorHandlingSection from './_sections/error-handling';
import TypeScriptPatternsSection from './_sections/typescript-patterns';
import TestingStrategySection from './_sections/testing-strategy';
import AccessibilitySection from './_sections/accessibility';

// Import des sections - Avancé (2)
import CustomHooksSection from './_sections/custom-hooks';
import RefsMetadataSection from './_sections/refs-metadata';

export default function React19AdvancedCourse() {
  const sections = [
    // 1-2. Fondamentaux
    {
      id: 'introduction',
      title: 'Qu\'est-ce qui change vraiment dans React 19 ?',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />
    },
    {
      id: 'use-hook',
      title: 'Comment use() simplifie le data fetching ?',
      icon: <Package className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <UseHookSection />
    },

    // 3-7. Rendering & Concurrent Features
    {
      id: 'react-compiler',
      title: 'Pourquoi le React Compiler va remplacer useMemo ?',
      icon: <Cpu className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ReactCompilerSection />
    },
    {
      id: 'server-components',
      title: 'Quand utiliser les Server Components ?',
      icon: <Server className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ServerComponentsSection />
    },
    {
      id: 'actions-transitions',
      title: 'Comment gérer les actions async sans loading state ?',
      icon: <Zap className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ActionsTransitionsSection />
    },
    {
      id: 'use-action-state',
      title: 'Comment optimiser l\'UX pendant les requêtes serveur ?',
      icon: <RefreshCw className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <UseActionStateSection />
    },
    {
      id: 'streaming',
      title: 'Comment accélérer le temps de chargement perçu ?',
      icon: <Activity className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <StreamingSection />
    },

    // 8-12. Optimisations
    {
      id: 'bundle-optimization',
      title: 'Comment réduire drastiquement la taille de votre bundle ?',
      icon: <Package className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <BundleOptimizationSection />
    },
    {
      id: 'performance-hooks',
      title: 'Quels hooks pour diagnostiquer les problèmes de perf ?',
      icon: <Gauge className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <PerformanceHooksSection />
    },
    {
      id: 'memory-management',
      title: 'Comment éviter les fuites mémoire dans React ?',
      icon: <Trash2 className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <MemoryManagementSection />
    },
    {
      id: 'data-fetching',
      title: 'Quel pattern choisir pour fetcher vos données ?',
      icon: <Database className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <DataFetchingSection />
    },
    {
      id: 'state-consolidation',
      title: 'Comment simplifier votre gestion d\'état ?',
      icon: <Combine className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <StateConsolidationSection />
    },

    // 13-17. Bonnes Pratiques
    {
      id: 'architecture',
      title: 'Comment structurer une app React qui scale ?',
      icon: <Building className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ArchitectureSection />
    },
    {
      id: 'error-handling',
      title: 'Comment gérer les erreurs gracieusement ?',
      icon: <Shield className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ErrorHandlingSection />
    },
    {
      id: 'typescript-patterns',
      title: 'Quels patterns TypeScript pour React 19 ?',
      icon: <Code className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <TypeScriptPatternsSection />
    },
    {
      id: 'testing-strategy',
      title: 'Comment tester efficacement vos Server Components ?',
      icon: <TestTube className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <TestingStrategySection />
    },
    {
      id: 'accessibility',
      title: 'Comment garantir l\'accessibilité de votre app ?',
      icon: <Eye className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <AccessibilitySection />
    },

    // 18-19. Avancé
    {
      id: 'custom-hooks',
      title: 'Quels patterns pour des hooks réutilisables ?',
      icon: <Sparkles className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <CustomHooksSection />
    },
    {
      id: 'refs-metadata',
      title: 'Comment gérer les refs et metadata dans React 19 ?',
      icon: <Layers className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <RefsMetadataSection />
    }
  ];

  return (
    <CourseLayout
      title="React 19 : Ce que les devs seniors font (et que vous devriez copier)"
      subtitle="Maîtriser React 19, performances et patterns avancés - 19 sections"
      sections={sections}
    />
  );
}
