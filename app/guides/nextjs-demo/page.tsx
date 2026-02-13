import { CourseLayout } from '@/components/course/course-layout';
import { Rocket, Server, FileText, RefreshCw, Monitor, Layers, Component, Package, Zap, Activity, Gauge, Database, Timer, Shield, Code, LayoutGrid, Building, Eye, Sparkles, Target } from 'lucide-react';

// Import des sections depuis _sections/
// Import des sections depuis _sections/ (default exports)
import IntroductionSection from './_sections/introduction';
import SSRSection from './_sections/ssr';
import SSGSection from './_sections/ssg';
import ISRSection from './_sections/isr';
import CSRSection from './_sections/csr';
import HybridSection from './_sections/hybrid';
import ClientComponentsSection from './_sections/client-components';
import ComparisonSection from './_sections/comparison';

// Import des sections depuis _sections/ (named exports)
import { DynamicImportSection } from './_sections/dynamic-import';
import { ServerActionsSection } from './_sections/server-actions';
import { StreamingSection } from './_sections/streaming';
import { FrontendPerformanceSection } from './_sections/frontend-performance';
import { BackendPerformanceSection } from './_sections/backend-performance';
import { PerformanceMeasurementSection } from './_sections/performance-measurement';
import { SecuritySection } from './_sections/security';
import { ReactPatternsSection } from './_sections/react-patterns';
import { CompositionSection } from './_sections/composition';
import { AdvancedPatternsSection } from './_sections/advanced-patterns';

// Import des sections depuis _sections/ (default exports - suite)
import ArchitectureSection from './_sections/architecture';
import AccessibilitySection from './_sections/accessibility';

export default function NextJSDemoCourse() {
  const sections = [
    // 1. Fondamentaux
    {
      id: 'introduction',
      title: 'Introduction à Next.js 16',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />
    },

    // 2-7. Modes de Rendu
    {
      id: 'ssr',
      title: 'Server-Side Rendering (SSR)',
      icon: <Server className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <SSRSection />
    },
    {
      id: 'ssg',
      title: 'Static Site Generation (SSG)',
      icon: <FileText className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <SSGSection />
    },
    {
      id: 'isr',
      title: 'Incremental Static Regeneration (ISR)',
      icon: <RefreshCw className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ISRSection />
    },
    {
      id: 'csr',
      title: 'Client-Side Rendering (CSR)',
      icon: <Monitor className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <CSRSection />
    },
    {
      id: 'hybrid',
      title: 'Hybrid (Server + Client)',
      icon: <Layers className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <HybridSection />
    },
    {
      id: 'client-components',
      title: 'Client Components',
      icon: <Component className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ClientComponentsSection />
    },

    // 8-13. Optimisations
    {
      id: 'dynamic-import',
      title: 'Dynamic Import & Code Splitting',
      icon: <Package className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <DynamicImportSection />
    },
    {
      id: 'server-actions',
      title: 'Server Actions',
      icon: <Zap className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <ServerActionsSection />
    },
    {
      id: 'streaming',
      title: 'Streaming & Suspense',
      icon: <Activity className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <StreamingSection />
    },
    {
      id: 'frontend-performance',
      title: 'Performance Frontend',
      icon: <Gauge className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <FrontendPerformanceSection />
    },
    {
      id: 'backend-performance',
      title: 'Performance Backend',
      icon: <Database className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <BackendPerformanceSection />
    },
    {
      id: 'performance-measurement',
      title: 'Mesure de Performance',
      icon: <Timer className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <PerformanceMeasurementSection />
    },

    // 14-19. Bonnes Pratiques
    {
      id: 'security',
      title: 'Sécurité',
      icon: <Shield className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <SecuritySection />
    },
    {
      id: 'react-patterns',
      title: 'React Best Practices',
      icon: <Code className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ReactPatternsSection />
    },
    {
      id: 'composition',
      title: 'Composition Patterns',
      icon: <LayoutGrid className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <CompositionSection />
    },
    {
      id: 'architecture',
      title: 'Architecture',
      icon: <Building className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ArchitectureSection />
    },
    {
      id: 'accessibility',
      title: 'Accessibilité (a11y)',
      icon: <Eye className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <AccessibilitySection />
    },

    // 20-21. Avancé
    {
      id: 'advanced-patterns',
      title: 'Patterns Avancés',
      icon: <Sparkles className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <AdvancedPatternsSection />
    },
    {
      id: 'comparison',
      title: 'Comparaison & Conclusion',
      icon: <Target className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <ComparisonSection />
    }
  ];

  return (
    <CourseLayout
      title="Guide Next.js 16"
      subtitle="Du débutant au senior - 22 sections complètes"
      sections={sections}
    />
  );
}
