import { CourseLayout } from '@/components/course/course-layout';
import { Rocket, Repeat, Shield, Brain, Zap, Puzzle, Table2, AlertTriangle, XCircle, Cpu } from 'lucide-react';

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
      title: 'Introduction a la Memoisation React',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />,
    },
    {
      id: 'probleme-re-render',
      title: 'Le Probleme du Re-render',
      icon: <Repeat className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <ProblemeReRenderSection />,
    },

    // 3-4. Rendering
    {
      id: 'react-memo',
      title: 'React.memo - Memoiser un Composant',
      icon: <Shield className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ReactMemoSection />,
    },
    {
      id: 'usememo',
      title: 'useMemo - Memoiser une Valeur',
      icon: <Brain className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <UseMemoSection />,
    },

    // 5-6. Optimisations
    {
      id: 'usecallback',
      title: 'useCallback - Memoiser une Fonction',
      icon: <Zap className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <UseCallbackSection />,
    },
    {
      id: 'trio-en-action',
      title: 'Le Trio en Action - Exemple Complet',
      icon: <Puzzle className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <TrioEnActionSection />,
    },

    // 7-8. Bonnes Pratiques
    {
      id: 'comparaison-complete',
      title: 'Comparaison Complete des Trois',
      icon: <Table2 className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ComparaisonCompleteSection />,
    },
    {
      id: 'erreurs-courantes',
      title: 'Erreurs Courantes et Anti-Patterns',
      icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ErreursCourantesSection />,
    },

    // 9-10. Avance
    {
      id: 'quand-ne-pas-memoiser',
      title: 'Quand ne PAS Memoiser',
      icon: <XCircle className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <QuandNePasMemoiserSection />,
    },
    {
      id: 'react-compiler',
      title: "React Compiler et l'Avenir",
      icon: <Cpu className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <ReactCompilerSection />,
    },
  ];

  return (
    <CourseLayout
      title="useMemo, useCallback et React.memo"
      subtitle="Comprendre et maitriser la memoisation React - 10 sections"
      sections={sections}
    />
  );
}
