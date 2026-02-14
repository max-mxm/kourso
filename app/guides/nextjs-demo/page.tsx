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
      title: 'Pourquoi Next.js 16 change votre façon de coder ?',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />
    },

    // 2-7. Modes de Rendu
    {
      id: 'ssr',
      title: 'Quand utiliser le SSR plutôt que le SSG ?',
      icon: <Server className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <SSRSection />
    },
    {
      id: 'ssg',
      title: 'Comment générer des pages statiques performantes ?',
      icon: <FileText className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <SSGSection />
    },
    {
      id: 'isr',
      title: 'Comment mettre à jour vos pages sans rebuild complet ?',
      icon: <RefreshCw className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ISRSection />
    },
    {
      id: 'csr',
      title: 'Dans quels cas privilégier le rendu côté client ?',
      icon: <Monitor className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <CSRSection />
    },
    {
      id: 'hybrid',
      title: 'Comment mixer rendering strategies intelligemment ?',
      icon: <Layers className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <HybridSection />
    },
    {
      id: 'client-components',
      title: 'Quand marquer un composant "use client" ?',
      icon: <Component className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ClientComponentsSection />
    },

    // 8-13. Optimisations
    {
      id: 'dynamic-import',
      title: 'Comment charger du code uniquement quand nécessaire ?',
      icon: <Package className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <DynamicImportSection />
    },
    {
      id: 'server-actions',
      title: 'Comment remplacer vos API routes par des Server Actions ?',
      icon: <Zap className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <ServerActionsSection />
    },
    {
      id: 'streaming',
      title: 'Comment afficher du contenu progressivement ?',
      icon: <Activity className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <StreamingSection />
    },
    {
      id: 'frontend-performance',
      title: 'Quelles techniques pour un frontend ultra-rapide ?',
      icon: <Gauge className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <FrontendPerformanceSection />
    },
    {
      id: 'backend-performance',
      title: 'Comment optimiser vos Server Components ?',
      icon: <Database className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <BackendPerformanceSection />
    },
    {
      id: 'performance-measurement',
      title: 'Comment mesurer et améliorer vos Core Web Vitals ?',
      icon: <Timer className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <PerformanceMeasurementSection />
    },

    // 14-19. Bonnes Pratiques
    {
      id: 'security',
      title: 'Comment sécuriser votre app Next.js en production ?',
      icon: <Shield className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <SecuritySection />
    },
    {
      id: 'react-patterns',
      title: 'Quelles bonnes pratiques React appliquer dans Next.js ?',
      icon: <Code className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ReactPatternsSection />
    },
    {
      id: 'composition',
      title: 'Comment composer vos composants efficacement ?',
      icon: <LayoutGrid className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <CompositionSection />
    },
    {
      id: 'architecture',
      title: 'Comment structurer votre projet Next.js ?',
      icon: <Building className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ArchitectureSection />
    },
    {
      id: 'accessibility',
      title: 'Comment rendre votre app Next.js accessible ?',
      icon: <Eye className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <AccessibilitySection />
    },

    // 20-21. Avancé
    {
      id: 'advanced-patterns',
      title: 'Quels patterns avancés pour aller plus loin ?',
      icon: <Sparkles className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <AdvancedPatternsSection />
    },
    {
      id: 'comparison',
      title: 'SSR vs SSG vs ISR : lequel choisir ?',
      icon: <Target className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <ComparisonSection />
    }
  ];

  return (
    <CourseLayout
      title="Next.js 16 : Les erreurs que j'ai faites pour que vous ne les fassiez pas"
      subtitle="Du débutant au senior - 21 sections complètes"
      sections={sections}
    />
  );
}
