import type { Metadata } from 'next';
import { CourseLayout } from '@/components/course/course-layout';
import {
  Rocket,
  Compass,
  Hexagon,
  Workflow,
  FolderTree,
  TestTube2,
  AlertTriangle,
  FlaskConical,
} from 'lucide-react';

import IntroductionSection from './_sections/introduction';
import PrincipesFondamentauxSection from './_sections/principes-fondamentaux';
import SchemaPortsAdaptersSection from './_sections/schema-ports-adapters';
import FluxUseCaseSection from './_sections/flux-use-case';
import ImplementationNextjsSection from './_sections/implementation-nextjs';
import TestsEtMaintenabiliteSection from './_sections/tests-et-maintenabilite';
import AntiPatternsSection from './_sections/anti-patterns';
import DemoInteractiveSection from './_sections/demo-interactive';
import MigrationProgressiveSection from './_sections/migration-progressive';

export const metadata: Metadata = {
  title: 'Architecture Hexagonale : Guide Complet TypeScript & Next.js',
  description:
    'Comprenez Ports & Adapters avec schemas, implementation TypeScript et demo interactive. Decouplez votre metier des frameworks et simplifiez les tests.',
  openGraph: {
    title: 'Architecture Hexagonale : decoupler metier et infrastructure',
    description:
      'Guide pratique avec schemas et demo interactive. Ports, adapters, use cases, tests et migration progressive.',
    type: 'article',
    images: [
      {
        url: '/api/og?title=Architecture+Hexagonale+:+Ports+%26+Adapters&category=best-practices',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Hexagonale : Guide Complet',
    description:
      'Ports & Adapters en pratique avec schemas, TypeScript et demo interactive.',
    images: [
      '/api/og?title=Architecture+Hexagonale+:+Ports+%26+Adapters&category=best-practices',
    ],
  },
};

export default function ArchitectureHexagonaleGuidePage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Pourquoi l architecture hexagonale change vos refactors ?',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />,
    },
    {
      id: 'principes-fondamentaux',
      title: 'Quelle est la regle de dependance a respecter ?',
      icon: <Compass className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <PrincipesFondamentauxSection />,
    },
    {
      id: 'schema-ports-adapters',
      title: 'A quoi ressemble le schema Ports & Adapters ?',
      icon: <Hexagon className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <SchemaPortsAdaptersSection />,
    },
    {
      id: 'flux-use-case',
      title: 'Comment circule une requete du controller au domaine ?',
      icon: <Workflow className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <FluxUseCaseSection />,
    },
    {
      id: 'implementation-nextjs',
      title: 'Comment structurer un projet Next.js en hexagonal ?',
      icon: <FolderTree className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ImplementationNextjsSection />,
    },
    {
      id: 'migration-progressive',
      title: 'Comment migrer sans big bang ?',
      icon: <Compass className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <MigrationProgressiveSection />,
    },
    {
      id: 'tests-et-maintenabilite',
      title: 'Pourquoi les tests deviennent plus simples et plus rapides ?',
      icon: <TestTube2 className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TestsEtMaintenabiliteSection />,
    },
    {
      id: 'anti-patterns',
      title: 'Quels pieges eviter avec l architecture hexagonale ?',
      icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <AntiPatternsSection />,
    },
    {
      id: 'demo-interactive',
      title: 'Demo: et si on remplacait les adapters en direct ?',
      icon: <FlaskConical className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <DemoInteractiveSection />,
      badge: 'INTERACTIF',
    },
  ];

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Architecture Hexagonale : decoupler votre metier des frameworks',
    description:
      'Guide pratique Ports & Adapters avec schemas, implementation TypeScript et demo interactive.',
    provider: {
      '@type': 'Organization',
      name: 'Maxpaths',
      url: 'https://www.maxpaths.dev',
    },
    educationalLevel: 'Intermediaire',
    inLanguage: 'fr',
    numberOfCredits: 9,
    timeRequired: 'PT2H30M',
    author: {
      '@type': 'Person',
      name: 'Maxime Morellon',
      url: 'https://www.maxpaths.dev/about',
    },
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.maxpaths.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://www.maxpaths.dev/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Architecture Hexagonale',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CourseLayout
        title="Architecture Hexagonale : decoupler votre metier des frameworks"
        subtitle="Schemas, implementation TypeScript/Next.js et demo interactive -- 9 sections"
        sections={sections}
      />
    </>
  );
}
