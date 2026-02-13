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
      title: 'Introduction à React 19',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />
    },
    {
      id: 'use-hook',
      title: 'Hook use() & Suspense 2.0',
      icon: <Package className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <UseHookSection />
    },

    // 3-7. Rendering & Concurrent Features
    {
      id: 'react-compiler',
      title: 'React Compiler',
      icon: <Cpu className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ReactCompilerSection />
    },
    {
      id: 'server-components',
      title: 'React Server Components (RSC)',
      icon: <Server className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ServerComponentsSection />
    },
    {
      id: 'actions-transitions',
      title: 'Actions & Async Transitions',
      icon: <Zap className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ActionsTransitionsSection />
    },
    {
      id: 'use-action-state',
      title: 'useActionState & useOptimistic',
      icon: <RefreshCw className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <UseActionStateSection />
    },
    {
      id: 'streaming',
      title: 'Streaming & Partial Pre-rendering',
      icon: <Activity className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <StreamingSection />
    },

    // 8-12. Optimisations
    {
      id: 'bundle-optimization',
      title: 'Bundle Optimization',
      icon: <Package className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <BundleOptimizationSection />
    },
    {
      id: 'performance-hooks',
      title: 'Performance Hooks',
      icon: <Gauge className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <PerformanceHooksSection />
    },
    {
      id: 'memory-management',
      title: 'Memory Management',
      icon: <Trash2 className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <MemoryManagementSection />
    },
    {
      id: 'data-fetching',
      title: 'Data Fetching Patterns',
      icon: <Database className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <DataFetchingSection />
    },
    {
      id: 'state-consolidation',
      title: 'State Consolidation Patterns',
      icon: <Combine className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <StateConsolidationSection />
    },

    // 13-17. Bonnes Pratiques
    {
      id: 'architecture',
      title: 'Architecture Scalable',
      icon: <Building className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ArchitectureSection />
    },
    {
      id: 'error-handling',
      title: 'Error Handling & Boundaries',
      icon: <Shield className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ErrorHandlingSection />
    },
    {
      id: 'typescript-patterns',
      title: 'TypeScript Advanced Patterns',
      icon: <Code className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <TypeScriptPatternsSection />
    },
    {
      id: 'testing-strategy',
      title: 'Testing Strategy',
      icon: <TestTube className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <TestingStrategySection />
    },
    {
      id: 'accessibility',
      title: 'Accessibility (a11y)',
      icon: <Eye className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <AccessibilitySection />
    },

    // 18-19. Avancé
    {
      id: 'custom-hooks',
      title: 'Custom Hooks Patterns',
      icon: <Sparkles className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <CustomHooksSection />
    },
    {
      id: 'refs-metadata',
      title: 'Refs as Props & Document Metadata',
      icon: <Layers className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <RefsMetadataSection />
    }
  ];

  return (
    <CourseLayout
      title="React 19 - Bonnes Pratiques Seniors"
      subtitle="Maîtriser React 19, performances et patterns avancés - 19 sections"
      sections={sections}
    />
  );
}
