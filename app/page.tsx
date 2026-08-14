import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from './_components/hero-section';
import { LatestContentSection } from './_components/latest-content-section';
import { PhilosophySection } from './_components/philosophy-section';
import { ContentCard } from '@/components/content-card';
import { RevealOnScroll } from '@/components/reveal-on-scroll';
import { DemoCard } from '@/components/demo-card';
import { getGuidesForLanding, getArticlesForLanding, getDemosForLanding } from '@/lib/content';
import { getLatestPublishedContent } from '@/lib/content-highlight';

export const metadata: Metadata = {
  title: 'Guides React, Next.js et bonnes pratiques frontend',
  description:
    'Bonnes pratiques frontend, patterns et retours d\'experience par Maxime Morellon. Guides React, Next.js et articles techniques.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Maxpaths — Bonnes pratiques frontend par Maxime Morellon',
    description:
      'Guides React, Next.js et articles techniques issus de 8 ans d\'experience en production.',
    images: [{ url: '/api/og?title=Maxpaths+-+Bonnes+Pratiques+Frontend&category=fundamentals', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxpaths — Bonnes pratiques frontend par Maxime Morellon',
    description: 'Guides React, Next.js et articles techniques issus de 8 ans d\'experience en production.',
    images: ['/api/og?title=Maxpaths+-+Bonnes+Pratiques+Frontend&category=fundamentals'],
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Maxime Morellon',
  url: 'https://www.maxpaths.dev',
  jobTitle: 'Developpeur Frontend Senior',
  sameAs: [
    'https://www.linkedin.com/in/maxime-morellon-7a9403112',
    'https://maximemorellon.dev/',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Maxpaths',
  url: 'https://www.maxpaths.dev',
  description: 'Bonnes pratiques frontend, patterns et retours d\'experience par Maxime Morellon.',
  inLanguage: 'fr',
  author: { '@type': 'Person', name: 'Maxime Morellon' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quels sont les modes de rendu disponibles dans Next.js 16 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js 16 propose 5 modes de rendu : SSR (Server-Side Rendering), SSG (Static Site Generation), ISR (Incremental Static Regeneration), CSR (Client-Side Rendering) et Streaming avec React Suspense. Chaque mode est adapte a un cas d\'usage specifique selon les besoins de fraicheur des donnees et de performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quand utiliser React.memo, useMemo et useCallback ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React.memo empeche le re-render d\'un composant si ses props n\'ont pas change. useMemo memorise le resultat d\'un calcul couteux. useCallback memorise une reference de fonction pour eviter les re-renders des composants enfants. Attention a l\'over-optimization : ces outils ont un cout memoire et ne doivent etre utilises que lorsqu\'un probleme de performance est mesure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelles sont les nouveautes majeures de React 19 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React 19 introduit le React Compiler (memorisation automatique), le hook use() pour le data fetching, useActionState pour les formulaires, useOptimistic pour les mises a jour optimistes, et des ameliorations significatives des Server Components et des Actions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment valider des donnees TypeScript avec Zod ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zod permet de definir des schemas de validation type-safe en TypeScript. Il offre l\'inference automatique des types, la validation de formulaires, la validation d\'API et la composition de schemas. Zod reduit les bugs runtime de 70% en validant les donnees aux frontieres du systeme.',
      },
    },
  ],
};

export default async function Home() {
  const guides = getGuidesForLanding();
  const demos = getDemosForLanding();
  const articles = await getArticlesForLanding();
  const latestContent = getLatestPublishedContent([...guides, ...articles]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen">
        <HeroSection />

        {latestContent && <LatestContentSection item={latestContent} />}

        {/* Section Guides */}
        <section className="container py-12 md:py-20">
          <div className="space-y-3 mb-8 md:mb-12 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              Guides
            </span>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight">
              Guides techniques
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
              Guides complets bases sur des retours d&apos;experience en production.
              React, Next.js, performance et patterns avances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {guides.map((item, index) => (
              <RevealOnScroll key={item.href} delay={index * 80}>
                <ContentCard {...item} />
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* Section Demos live */}
        <section className="container pb-12 md:pb-20">
          <div className="space-y-3 mb-8 md:mb-12 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Interactif
            </span>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight">
              Testez en direct
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
              Demos interactives avec des mesures en temps reel.
              Manipulez, comparez, et observez les resultats dans votre navigateur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {demos.map((demo, index) => (
              <RevealOnScroll key={demo.href} delay={index * 80}>
                <DemoCard {...demo} />
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* Section Articles */}
        {articles.length > 0 && (
          <section className="container pb-12 md:pb-20">
            <div className="space-y-3 mb-8 md:mb-12 text-center md:text-left">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Blog
              </span>
              <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight">
                Articles recents
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
                Analyses, comparatifs et reflexions sur le developpement frontend moderne.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {articles.map((item, index) => (
                <RevealOnScroll key={item.href} delay={index * 80}>
                  <ContentCard {...item} />
                </RevealOnScroll>
              ))}
            </div>

            <div className="mt-8 text-center md:text-left">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Voir tous les articles
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </section>
        )}

        <PhilosophySection />
      </div>
    </>
  );
}
