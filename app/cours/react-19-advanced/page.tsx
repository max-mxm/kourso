import { CourseLayout } from '@/components/course/course-layout';

// Import des sections - Fondamentaux (2)
import IntroductionSection from './_sections/introduction';
import UseHookSection from './_sections/use-hook';

// Import des sections - Rendering & Concurrent (5)
import ReactCompilerSection from './_sections/react-compiler';
import ServerComponentsSection from './_sections/server-components';
import ActionsTransitionsSection from './_sections/actions-transitions';
import UseActionStateSection from './_sections/use-action-state';
import StreamingSection from './_sections/streaming';

// Import des sections - Optimisations (4)
import BundleOptimizationSection from './_sections/bundle-optimization';
import PerformanceHooksSection from './_sections/performance-hooks';
import MemoryManagementSection from './_sections/memory-management';
import DataFetchingSection from './_sections/data-fetching';

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
      iconName: 'Rocket',
      category: 'fundamentals' as const,
      component: <IntroductionSection />
    },
    {
      id: 'use-hook',
      title: 'Hook use() & Suspense 2.0',
      iconName: 'Package',
      category: 'fundamentals' as const,
      component: <UseHookSection />
    },

    // 3-7. Rendering & Concurrent Features
    {
      id: 'react-compiler',
      title: 'React Compiler',
      iconName: 'Cpu',
      category: 'rendering' as const,
      component: <ReactCompilerSection />
    },
    {
      id: 'server-components',
      title: 'React Server Components (RSC)',
      iconName: 'Server',
      category: 'rendering' as const,
      component: <ServerComponentsSection />
    },
    {
      id: 'actions-transitions',
      title: 'Actions & Async Transitions',
      iconName: 'Zap',
      category: 'rendering' as const,
      component: <ActionsTransitionsSection />
    },
    {
      id: 'use-action-state',
      title: 'useActionState & useOptimistic',
      iconName: 'RefreshCw',
      category: 'rendering' as const,
      component: <UseActionStateSection />
    },
    {
      id: 'streaming',
      title: 'Streaming & Partial Pre-rendering',
      iconName: 'Activity',
      category: 'rendering' as const,
      component: <StreamingSection />
    },

    // 8-11. Optimisations
    {
      id: 'bundle-optimization',
      title: 'Bundle Optimization',
      iconName: 'Package',
      category: 'optimization' as const,
      component: <BundleOptimizationSection />
    },
    {
      id: 'performance-hooks',
      title: 'Performance Hooks',
      iconName: 'Gauge',
      category: 'optimization' as const,
      component: <PerformanceHooksSection />
    },
    {
      id: 'memory-management',
      title: 'Memory Management',
      iconName: 'Trash2',
      category: 'optimization' as const,
      component: <MemoryManagementSection />
    },
    {
      id: 'data-fetching',
      title: 'Data Fetching Patterns',
      iconName: 'Database',
      category: 'optimization' as const,
      component: <DataFetchingSection />
    },

    // 12-16. Bonnes Pratiques
    {
      id: 'architecture',
      title: 'Architecture Scalable',
      iconName: 'Building',
      category: 'best-practices' as const,
      component: <ArchitectureSection />
    },
    {
      id: 'error-handling',
      title: 'Error Handling & Boundaries',
      iconName: 'Shield',
      category: 'best-practices' as const,
      component: <ErrorHandlingSection />
    },
    {
      id: 'typescript-patterns',
      title: 'TypeScript Advanced Patterns',
      iconName: 'Code',
      category: 'best-practices' as const,
      component: <TypeScriptPatternsSection />
    },
    {
      id: 'testing-strategy',
      title: 'Testing Strategy',
      iconName: 'TestTube',
      category: 'best-practices' as const,
      component: <TestingStrategySection />
    },
    {
      id: 'accessibility',
      title: 'Accessibility (a11y)',
      iconName: 'Eye',
      category: 'best-practices' as const,
      component: <AccessibilitySection />
    },

    // 17-18. Avancé
    {
      id: 'custom-hooks',
      title: 'Custom Hooks Patterns',
      iconName: 'Sparkles',
      category: 'advanced' as const,
      component: <CustomHooksSection />
    },
    {
      id: 'refs-metadata',
      title: 'Refs as Props & Document Metadata',
      iconName: 'Layers',
      category: 'advanced' as const,
      component: <RefsMetadataSection />
    }
  ];

  return (
    <CourseLayout
      title="React 19 - Bonnes Pratiques Seniors"
      subtitle="Maîtriser React 19, performances et patterns avancés - 18 sections"
      sections={sections}
    />
  );
}
