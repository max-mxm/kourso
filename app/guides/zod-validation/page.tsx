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
      title: 'Pourquoi Zod change la donne en validation TypeScript ?',
      icon: <Rocket className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <IntroductionSection />,
    },
    {
      id: 'primitive-schemas',
      title: 'Comment créer vos premiers schémas de validation ?',
      icon: <Box className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <PrimitiveSchemasSection />,
    },
    {
      id: 'parse-errors',
      title: 'Quelle méthode choisir : parse ou safeParse ?',
      icon: <ShieldAlert className="w-4 h-4 flex-shrink-0" />,
      category: 'fundamentals' as const,
      component: <ParseErrorsSection />,
    },
    {
      id: 'complex-types',
      title: 'Comment valider des structures de données imbriquées ?',
      icon: <Layers className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ComplexTypesSection />,
    },
    {
      id: 'composable-schemas',
      title: 'Comment réutiliser vos schémas sans duplication ?',
      icon: <Puzzle className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <ComposableSchemasSection />,
    },
    {
      id: 'transforms-refinements',
      title: 'Comment ajouter une logique personnalisée à vos validations ?',
      icon: <Workflow className="w-4 h-4 flex-shrink-0" />,
      category: 'rendering' as const,
      component: <TransformsRefinementsSection />,
    },
    {
      id: 'performance-bundle',
      title: 'Zod impacte-t-il les performances de votre app ?',
      icon: <Gauge className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <PerformanceBundleSection />,
    },
    {
      id: 'env-validation',
      title: 'Comment valider votre .env au démarrage de l\'app ?',
      icon: <Settings className="w-4 h-4 flex-shrink-0" />,
      category: 'optimization' as const,
      component: <EnvValidationSection />,
    },
    {
      id: 'form-validation',
      title: 'Comment intégrer Zod dans vos formulaires React ?',
      icon: <FileText className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <FormValidationSection />,
    },
    {
      id: 'server-actions',
      title: 'Comment valider les données côté serveur avec Zod ?',
      icon: <Server className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ServerActionsSection />,
    },
    {
      id: 'api-validation',
      title: 'Comment garantir la fiabilité de vos endpoints API ?',
      icon: <Globe className="w-4 h-4 flex-shrink-0" />,
      category: 'best-practices' as const,
      component: <ApiValidationSection />,
    },
    {
      id: 'advanced-patterns',
      title: 'Quels patterns avancés pour des validations complexes ?',
      icon: <Sparkles className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <AdvancedPatternsSection />,
    },
    {
      id: 'ecosystem-v4',
      title: 'Que change Zod v4 et comment migrer ?',
      icon: <Network className="w-4 h-4 flex-shrink-0" />,
      category: 'advanced' as const,
      component: <EcosystemV4Section />,
    },
  ];

  return (
    <CourseLayout
      title="Zod : La validation TypeScript que vous auriez dû utiliser depuis le début"
      subtitle="De la validation basique aux patterns de production -- 13 sections"
      sections={sections}
    />
  );
}
