import type { Metadata } from 'next';
import { CourseLayout } from '@/components/course/course-layout';
import { Rocket, Repeat, Shield, Brain, Zap, Puzzle, Table2, AlertTriangle, XCircle, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'React Memoisation : React.memo, useMemo, useCallback Expliques',
  description: '3 mecanismes de memoisation React expliques. Quand utiliser React.memo, useMemo, useCallback. Evitez l\'over-optimization avec exemples concrets.',
  alternates: {
    canonical: '/guides/react-memoization',
  },
  openGraph: {
    title: 'Memoisation React : Optimisez Sans Ralentir',
    description: 'React.memo, useMemo, useCallback : les 3 mecanismes expliques. Exemples concrets et testables pour eviter l\'over-optimization.',
    type: 'article',
    images: [{ url: '/api/og?title=React+Memoisation+:+Le+Guide+Complet&category=optimization', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memoisation React : Le Guide Complet',
    description: 'React.memo, useMemo, useCallback : quand utiliser quoi. Exemples concrets et erreurs a eviter.',
    images: ['/api/og?title=React+Memoisation+:+Le+Guide+Complet&category=optimization'],
  },
};

// Import des sections - Fondamentaux (2)
import IntroductionSection from './_sections/introduction';
import ProblemeReRenderSection from './_sections/probleme-re-render';

// Import des sections - Rendering (2)
import ReactMemoSection from './_sections/react-memo';
import UseMemoSection from './_sections/usememo';

// Import des sections - Optimisations (2)
import UseCallbackSection from './_sections/usecallback';
import TrioEnActionSection from './_sections/trio-en-action';

// Import des sections - Bonnes Pratiques (2)
import ComparaisonCompleteSection from './_sections/comparaison-complete';
import ErreursCourantesSection from './_sections/erreurs-courantes';

// Import des sections - Avance (2)
import QuandNePasMemoiserSection from './_sections/quand-ne-pas-memoiser';
import ReactCompilerSection from './_sections/react-compiler';

export default function ReactMemoizationCourse() {
  const sections = [
    // 1-2. Fondamentaux
    {
      id: 'introduction',
      title: 'Pourquoi vos optimisations ralentissent votre app ?',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />,
    },
    {
      id: 'probleme-re-render',
      title: 'Qu\'est-ce qui déclenche vraiment un re-render ?',
      icon: <Repeat className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <ProblemeReRenderSection />,
    },

    // 3-4. Rendering
    {
      id: 'react-memo',
      title: 'Comment éviter les re-renders inutiles de composants ?',
      icon: <Shield className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ReactMemoSection />,
    },
    {
      id: 'usememo',
      title: 'Quand mémoiser un calcul coûteux ?',
      icon: <Brain className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <UseMemoSection />,
    },

    // 5-6. Optimisations
    {
      id: 'usecallback',
      title: 'Pourquoi vos callbacks cassent React.memo ?',
      icon: <Zap className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <UseCallbackSection />,
    },
    {
      id: 'trio-en-action',
      title: 'Comment combiner React.memo, useMemo et useCallback ?',
      icon: <Puzzle className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TrioEnActionSection />,
    },

    // 7-8. Bonnes Pratiques
    {
      id: 'comparaison-complete',
      title: 'React.memo vs useMemo vs useCallback : lequel utiliser ?',
      icon: <Table2 className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ComparaisonCompleteSection />,
    },
    {
      id: 'erreurs-courantes',
      title: 'Quelles erreurs éviter avec la mémoisation ?',
      icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ErreursCourantesSection />,
    },

    // 9-10. Avance
    {
      id: 'quand-ne-pas-memoiser',
      title: 'Dans quels cas la mémoisation est contre-productive ?',
      icon: <XCircle className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <QuandNePasMemoiserSection />,
    },
    {
      id: 'react-compiler',
      title: 'Le React Compiler va-t-il remplacer la mémoisation manuelle ?',
      icon: <Cpu className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <ReactCompilerSection />,
    },
  ];

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Memoisation React : Pourquoi vos optimisations ralentissent votre app',
    description: '3 mecanismes de memoisation React expliques. Quand utiliser React.memo, useMemo, useCallback.',
    provider: { '@type': 'Organization', name: 'Maxpaths', url: 'https://www.maxpaths.dev' },
    educationalLevel: 'Intermediaire',
    inLanguage: 'fr',
    numberOfCredits: 10,
    timeRequired: 'PT2H',
    author: { '@type': 'Person', name: 'Maxime Morellon', url: 'https://www.maxpaths.dev/about' },
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.maxpaths.dev' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.maxpaths.dev/guides' },
      { '@type': 'ListItem', position: 3, name: 'Memoisation React' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CourseLayout
        title="Mémoisation React : Pourquoi vos optimisations ralentissent votre app"
        subtitle="Comprendre et maitriser la memoisation React - 10 sections"
        sections={sections}
      />
    </>
  );
}
