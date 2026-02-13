import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from './_components/hero-section';
import { PhilosophySection } from './_components/philosophy-section';
import { ContentCard } from '@/components/content-card';
import { RevealOnScroll } from '@/components/reveal-on-scroll';
import { getGuidesForLanding, getArticlesForLanding } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Bonnes pratiques frontend, patterns et retours d\'experience par Maxime Morellon. Guides React, Next.js et articles techniques.',
  openGraph: {
    title: 'Koursorr — Bonnes pratiques frontend par Maxime Morellon',
    description:
      'Guides React, Next.js et articles techniques issus de 8 ans d\'experience en production.',
    images: ['/og-image-home.png'],
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Maxime Morellon',
  url: 'https://kourso.com',
  jobTitle: 'Developpeur Frontend Senior',
  sameAs: [
    'https://www.linkedin.com/in/maxime-morellon-7a9403112',
    'https://www.maxime-morellon.dev/',
  ],
};

export default async function Home() {
  const guides = getGuidesForLanding();
  const articles = await getArticlesForLanding();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="min-h-screen">
        <HeroSection />

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
