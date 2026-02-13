import { CourseLayout } from '@/components/course/course-layout';
import {
  Rocket,
  Box,
  ShieldAlert,
  Layers,
  Puzzle,
  Workflow,
  Gauge,
  Settings,
  FileText,
  Server,
  Globe,
  Sparkles,
  Network,
} from 'lucide-react';

import IntroductionSection from './_sections/introduction';
import PrimitiveSchemasSection from './_sections/primitive-schemas';
import ParseErrorsSection from './_sections/parse-errors';
import ComplexTypesSection from './_sections/complex-types';
import ComposableSchemasSection from './_sections/composable-schemas';
import TransformsRefinementsSection from './_sections/transforms-refinements';
import PerformanceBundleSection from './_sections/performance-bundle';
import EnvValidationSection from './_sections/env-validation';
import FormValidationSection from './_sections/form-validation';
import ServerActionsSection from './_sections/server-actions';
import ApiValidationSection from './_sections/api-validation';
import AdvancedPatternsSection from './_sections/advanced-patterns';
import EcosystemV4Section from './_sections/ecosystem-v4';

export default function ZodValidationCourse() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction a Zod',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />,
    },
    {
      id: 'primitive-schemas',
      title: 'Schemas Primitifs et Methodes de Base',
      icon: <Box className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <PrimitiveSchemasSection />,
    },
    {
      id: 'parse-errors',
      title: 'parse, safeParse et Gestion des Erreurs',
      icon: <ShieldAlert className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <ParseErrorsSection />,
    },
    {
      id: 'complex-types',
      title: 'Objets, Arrays et Types Complexes',
      icon: <Layers className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ComplexTypesSection />,
    },
    {
      id: 'composable-schemas',
      title: 'Schemas Composables',
      icon: <Puzzle className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ComposableSchemasSection />,
    },
    {
      id: 'transforms-refinements',
      title: 'Transforms, Refinements et Pipes',
      icon: <Workflow className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <TransformsRefinementsSection />,
    },
    {
      id: 'performance-bundle',
      title: 'Performance, Bundle Size et Alternatives',
      icon: <Gauge className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <PerformanceBundleSection />,
    },
    {
      id: 'env-validation',
      title: "Validation des Variables d'Environnement",
      icon: <Settings className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <EnvValidationSection />,
    },
    {
      id: 'form-validation',
      title: 'Formulaires -- React Hook Form + Zod',
      icon: <FileText className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <FormValidationSection />,
    },
    {
      id: 'server-actions',
      title: 'Next.js Server Actions et Zod',
      icon: <Server className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ServerActionsSection />,
    },
    {
      id: 'api-validation',
      title: 'Validation API -- Requetes et Reponses',
      icon: <Globe className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ApiValidationSection />,
    },
    {
      id: 'advanced-patterns',
      title: 'Patterns Avances',
      icon: <Sparkles className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <AdvancedPatternsSection />,
    },
    {
      id: 'ecosystem-v4',
      title: 'Ecosysteme Zod et Migration v4',
      icon: <Network className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <EcosystemV4Section />,
    },
  ];

  return (
    <CourseLayout
      title="Zod -- Validation TypeScript-first"
      subtitle="De la validation basique aux patterns de production -- 13 sections"
      sections={sections}
    />
  );
}
