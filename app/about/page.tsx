import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bot,
  Code2,
  Gauge,
  Github,
  Globe,
  Layers,
  Linkedin,
  Share2,
  ShieldCheck,
  Target,
  Workflow,
} from 'lucide-react';
import { RevealOnScroll } from '@/components/reveal-on-scroll';

const PORTFOLIO_URL = 'https://maximemorellon.dev/';

const expertisePillars = [
  {
    icon: Code2,
    title: 'Frontend expert',
    description:
      'React, Next.js, TypeScript, performance, accessibilité et architecture UI. Pas seulement faire marcher une interface : la rendre maintenable, rapide et robuste.',
  },
  {
    icon: Bot,
    title: 'IA appliquée',
    description:
      'LLMs, agents, automatisations, RAG, vision et workflows IA. Pas des démos isolées : des systèmes utilisables, observables et intégrés au produit.',
  },
];

const maxpathsPromises = [
  {
    icon: Target,
    title: 'Le terrain avant la théorie',
    description:
      'Chaque guide part d’un problème réel : rendu instable, architecture qui fatigue, optimisation inutile, dette qui ralentit l’équipe.',
  },
  {
    icon: Gauge,
    title: 'Mesurer avant d’optimiser',
    description:
      'Les décisions frontend sérieuses commencent par des signaux : re-renders, bundle, latence perçue, accessibilité, coût de maintenance.',
  },
  {
    icon: Workflow,
    title: 'IA dans le workflow',
    description:
      'L’IA est traitée comme un levier d’ingénierie : cadrage, génération, validation, automatisation, review, documentation et produit.',
  },
  {
    icon: ShieldCheck,
    title: 'Production, pas magie',
    description:
      'Un pattern n’a de valeur que s’il résiste aux erreurs, aux cas limites, aux contraintes métier et aux usages réels.',
  },
];

const topics = [
  'React 19',
  'Next.js',
  'TypeScript',
  'Performance',
  'Accessibilité',
  'Architecture UI',
  'LLMs',
  'Agents',
  'RAG',
  'Automatisation',
  'BMAD',
  'Workflows IA',
];

export const metadata: Metadata = {
  title: 'A propos - Expertise frontend et IA appliquée',
  description:
    'Maxpaths documente les patterns frontend React, Next.js, TypeScript et IA appliquée utilisés pour construire des produits fiables en production.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'A propos | Maxpaths',
    description:
      'Expertise frontend et IA appliquée : React, Next.js, TypeScript, agents, workflows IA et patterns de production.',
    images: [{ url: '/api/og?title=Frontend+%26+IA+appliquee&category=fundamentals', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A propos | Maxpaths',
    description: 'Expertise frontend et IA appliquée, documentée depuis le terrain.',
    images: ['/api/og?title=Frontend+%26+IA+appliquee&category=fundamentals'],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="about-hero relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div
            className="about-bg-float absolute top-0 left-0 right-0 h-96 opacity-[0.06] dark:opacity-[0.05]"
            style={{
              background: 'linear-gradient(120deg, var(--primary) 0%, transparent 60%)',
              transform: 'skewY(-4deg)',
              transformOrigin: 'top left',
            }}
          />
          <div
            className="absolute bottom-0 right-0 h-80 w-2/3 opacity-[0.05] dark:opacity-[0.04]"
            style={{
              background: 'linear-gradient(240deg, var(--brand-secondary) 0%, transparent 70%)',
              transform: 'skewY(3deg)',
              transformOrigin: 'bottom right',
            }}
          />
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="order-1 lg:order-2 lg:col-span-5">
              <RevealOnScroll delay={100}>
                <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-xl border border-border/20 shadow-2xl">
                  <Image
                    src="/moi.png"
                    alt="Maxime Morellon"
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 420px, 320px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-6 py-5">
                    <p className="text-lg font-bold text-white">Maxime Morellon</p>
                    <p className="text-sm text-white/90">Frontend expert · IA appliquée</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="relative text-center md:pl-6 md:text-left">
                <div className="absolute left-0 top-0 bottom-0 hidden w-[3px] bg-gradient-to-b from-primary via-brand-secondary to-primary/20 md:block" />

                <div className="space-y-6">
                  <RevealOnScroll>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary/80">
                      À propos
                    </span>
                  </RevealOnScroll>

                  <RevealOnScroll delay={100}>
                    <h1 className="text-[clamp(2.25rem,7vw,4.75rem)] font-black leading-[1.03] tracking-tight text-foreground">
                      Expert frontend.
                      <span className="block bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
                        IA appliquée.
                      </span>
                    </h1>
                  </RevealOnScroll>

                  <RevealOnScroll delay={200}>
                    <p className="max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
                      Maxpaths documente les patterns React, Next.js, TypeScript et IA que
                      j’utilise pour construire des produits fiables, rapides et utiles en production.
                    </p>
                  </RevealOnScroll>

                  <RevealOnScroll delay={300}>
                    <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
                      {['React', 'Next.js', 'TypeScript', 'IA'].map((item) => (
                        <div key={item} className="border-l border-border/70 pl-4 text-left">
                          <div className="text-lg font-bold text-foreground">{item}</div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground">
                            production
                          </div>
                        </div>
                      ))}
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-section-2 border-t border-border/50 py-16 md:py-24">
        <div className="container">
          <RevealOnScroll>
            <div className="relative mb-10 text-center md:pl-6 md:text-left">
              <div className="about-accent-bar absolute left-0 top-0 bottom-0 hidden w-[3px] bg-gradient-to-b from-primary via-brand-secondary to-primary/20 md:block" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary/80">
                Positionnement
              </span>
              <h2 className="mt-3 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-foreground">
                Ce site n’est pas mon CV. C’est mon laboratoire public.
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Mon portfolio présente mon parcours. Maxpaths, lui, sert à documenter ce que je
                considère comme vraiment utile pour les développeurs frontend et les équipes produit :
                les choix techniques, les compromis, les erreurs, les patterns et les workflows IA
                qui changent concrètement la manière de construire.
              </p>
              <p className="font-medium text-foreground/90">
                L’objectif est simple : transformer l’expérience de production en guides actionnables,
                sans vendre de raccourci magique ni empiler de théorie hors-sol.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="about-section about-section-3 border-t border-border/50 py-16 md:py-24">
        <div className="container">
          <RevealOnScroll>
            <div className="relative mb-12 text-center md:pl-6 md:text-left">
              <div className="absolute left-0 top-0 bottom-0 hidden w-[3px] bg-gradient-to-b from-brand-secondary to-brand-secondary/20 md:block" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary/80">
                Deux expertises
              </span>
              <h2 className="mt-3 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-foreground">
                Frontend exigeant, IA concrète
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {expertisePillars.map((pillar, index) => (
              <RevealOnScroll key={pillar.title} delay={index * 100}>
                <div className="about-card group relative h-full rounded-xl border border-border/40 bg-card/40 p-7 transition-all duration-300 hover:border-primary/30 hover:bg-card/70">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-brand-secondary/10">
                    <pillar.icon className="about-icon-hover h-6 w-6 text-primary" strokeWidth={2.5} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {pillar.description}
                  </p>
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/0 to-brand-secondary/0 transition-all duration-500 group-hover:from-primary/5 group-hover:to-brand-secondary/5" />
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={200}>
            <div className="mt-10 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-md border border-border/50 bg-muted px-3 py-1 text-sm font-medium text-foreground/80"
                >
                  {topic}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="about-section about-section-4 border-t border-border/50 py-16 md:py-24">
        <div className="container">
          <RevealOnScroll>
            <div className="relative mb-12 text-center md:pl-6 md:text-left">
              <div className="absolute left-0 top-0 bottom-0 hidden w-[3px] bg-gradient-to-b from-primary via-brand-secondary to-primary/20 md:block" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary/80">
                Promesse
              </span>
              <h2 className="mt-3 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-foreground">
                Ce que Maxpaths met sur la table
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {maxpathsPromises.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 80}>
                <div className="about-card group relative h-full rounded-xl border border-border/40 bg-card/30 p-7 transition-all duration-300 hover:border-primary/30 hover:bg-card/60">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-brand-secondary/10">
                    <item.icon className="about-icon-hover h-6 w-6 text-primary" strokeWidth={2.5} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section-5 relative overflow-hidden border-t border-border/50 py-16 md:py-24">
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.01]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />
        </div>

        <div className="container relative">
          <RevealOnScroll>
            <div className="relative mb-10 text-center md:pl-6 md:text-left">
              <div className="absolute left-0 top-0 bottom-0 hidden w-[3px] bg-gradient-to-b from-brand-secondary to-brand-secondary/20 md:block" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary/80">
                Preuve par le produit
              </span>
              <h2 className="mt-3 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-foreground">
                Scanorr : quand frontend, mobile, offline et IA se rencontrent
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Scanorr illustre exactement le type de complexité qui nourrit Maxpaths : une interface
                produit réelle, des contraintes terrain, de l’IA Vision & Voice, du mobile, du offline,
                de la génération de rapports et une UX qui doit rester simple malgré la technique.
              </p>
              <p className="font-medium text-foreground/90">
                C’est ce genre de produit qui rend les articles utiles : les patterns ne viennent pas
                d’une préférence abstraite, mais de problèmes qu’il faut résoudre proprement.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="flex flex-col gap-4 border-t border-border/30 pt-10 sm:flex-row sm:items-center">
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm font-medium text-foreground/70">
                  Le portfolio garde le détail du parcours. Maxpaths garde les enseignements.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
                <a
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-button about-icon-rotate group inline-flex items-center gap-2 rounded-lg border border-border/60 px-6 py-3 font-semibold hover:border-primary/40 hover:bg-primary/5"
                >
                  <Globe size={18} className="about-icon-hover" />
                  Voir le portfolio complet
                </a>
                <a
                  href="https://www.linkedin.com/in/maxime-morellon-7a9403112"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-button about-icon-scale group inline-flex items-center gap-2 rounded-lg bg-[#0077B5] px-6 py-3 font-semibold text-white shadow-md hover:bg-[#0077B5]/90 hover:shadow-lg hover:shadow-[#0077B5]/20"
                >
                  <Linkedin size={18} className="about-icon-hover" />
                  LinkedIn
                </a>
                <a
                  href="https://www.github.com/maxime-morellon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-button about-icon-scale group inline-flex items-center gap-2 rounded-lg border border-border/60 px-6 py-3 font-semibold hover:border-primary/40 hover:bg-primary/5"
                >
                  <Github size={18} className="about-icon-hover" />
                  GitHub
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="about-section-6 relative overflow-hidden py-16 md:py-28">
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.06] dark:opacity-[0.05]"
            style={{
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--brand-secondary) 50%, transparent 100%)',
              transform: 'skewY(-2deg)',
              transformOrigin: 'bottom left',
            }}
          />
        </div>

        <div className="container relative z-10">
          <RevealOnScroll>
            <div className="relative mb-10 text-center md:pl-6 md:text-left">
              <div className="absolute left-0 top-0 bottom-0 hidden w-[3px] bg-gradient-to-b from-primary via-brand-secondary to-primary/20 md:block" />
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight">
                Explorer les patterns qui tiennent.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Guides frontend, articles IA, démos interactives : tout est pensé pour passer
                de l’idée au système utilisable.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="mx-auto flex max-w-3xl flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="/guides"
                className="about-button group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-4 font-semibold text-white shadow-lg hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
              >
                <span className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative">Explorer les guides</span>
                <Layers className="about-icon-hover relative h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="about-button group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-border/60 px-8 py-4 font-semibold hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transition-transform duration-700 ease-out group-hover:translate-x-[100%]" />
                <span className="relative">Lire le blog</span>
                <Share2 className="about-icon-hover relative h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
