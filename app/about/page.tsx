import Link from 'next/link';
import Image from 'next/image';
import { Target, Sparkles, Layers, Share2, Linkedin, Globe, Github } from 'lucide-react';
import { RevealOnScroll } from '@/components/reveal-on-scroll';
import { Timeline } from './_components/timeline';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* =============================================
          SECTION 1 — Hero avec background moderne
      ============================================= */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background stratifié moderne (comme page d'accueil) */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div
            className="absolute top-0 left-0 right-0 h-96 opacity-[0.06] dark:opacity-[0.05]"
            style={{
              background: 'linear-gradient(120deg, var(--primary) 0%, transparent 60%)',
              transform: 'skewY(-4deg)',
              transformOrigin: 'top left'
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-2/3 h-80 opacity-[0.05] dark:opacity-[0.04]"
            style={{
              background: 'linear-gradient(240deg, var(--brand-secondary) 0%, transparent 70%)',
              transform: 'skewY(3deg)',
              transformOrigin: 'bottom right'
            }}
          />
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Photo unique - visible sur tous les écrans */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <RevealOnScroll delay={100}>
                <div className="relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/20">
                  <Image
                    src="/moi.png"
                    alt="Maxime Morellon, développeur frontend"
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 420px, 320px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-5">
                    <p className="font-bold text-white text-lg">Maxime Morellon</p>
                    <p className="text-white/90 text-sm">Développeur Frontend Senior</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Contenu hero avec barre accent */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative pl-6">
                {/* Barre accent gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-brand-secondary to-primary/20" />

                <div className="space-y-6">
                  <RevealOnScroll delay={0}>
                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary/80">
                      À propos
                    </span>
                  </RevealOnScroll>

                  <RevealOnScroll delay={100}>
                    <h1 className="text-[clamp(2rem,7vw,4.5rem)] font-black leading-[1.05] tracking-tight text-foreground">
                      Documenter ce que personne ne{' '}
                      <span className="text-primary">documente</span>
                    </h1>
                  </RevealOnScroll>

                  <RevealOnScroll delay={200}>
                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
                      Server Components imprévisibles. Re-renders en cascade. Optimisations contre-productives.
                      Ce site rassemble les solutions forgées quand Stack Overflow ne suffit plus.
                    </p>
                  </RevealOnScroll>

                  <RevealOnScroll delay={300}>
                    <div className="grid grid-cols-2 gap-6 pt-4">
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-primary">React 19</div>
                        <div className="text-sm text-muted-foreground">Standards actuels</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-brand-secondary">Next.js 16</div>
                        <div className="text-sm text-muted-foreground">Dernière version</div>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 2 — Origine du projet (redesignée)
      ============================================= */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <div className="relative pl-6 mb-10">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-primary/20" />
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary/80">
                    Genèse
                  </span>
                  <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-foreground">
                    Pourquoi maxpaths existe
                  </h2>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  La documentation officielle enseigne la syntaxe. L'expérience terrain enseigne ce qu'il ne faut jamais faire.
                </p>
                <p>
                  Entre les tutoriels académiques et les projets à fort trafic, il existe un gouffre : les anti-patterns réels,
                  les choix d'architecture qui dégradent 6 mois plus tard, les optimisations qui génèrent plus de bugs qu'elles n'en résolvent.
                </p>
                <p className="font-medium text-foreground/90">
                  maxpaths comble ce vide en documentant les solutions testées en production, pas la théorie abstraite.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 3 — Application Scanorr
      ============================================= */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <div className="relative pl-6 mb-10">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-secondary to-brand-secondary/20" />
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-[0.25em] uppercase text-brand-secondary/80">
                    Application
                  </span>
                  <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-foreground">
                    Scanorr : mise en pratique des principes
                  </h2>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  J'ai développé{' '}
                  <a
                    href="https://scanorr.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 transition-all"
                  >
                    Scanorr
                  </a>
                  , une application web et mobile en Next.js et React Native qui digitalise les états des lieux immobiliers.
                  L'application intègre de l'IA pour la reconnaissance de pièces, fonctionne entièrement hors-ligne,
                  et génère des rapports conformes à la loi ALUR avec signatures électroniques.
                </p>
                <p>
                  Ce projet m'a permis de mettre en œuvre de nombreux principes documentés dans les guides :
                  optimisations de rendu avec Server Components, mémoïsation stratégique, gestion d'état avec Zustand,
                  validation robuste avec Zod, et architecture progressive pour gérer la complexité croissante.
                </p>
                <p className="font-medium text-foreground/90">
                  Scanorr réduit le temps d'inspection de 2h à 45 minutes pour un appartement type 3 pièces,
                  tout en garantissant la conformité légale et la protection des propriétaires.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="pt-8">
                <a
                  href="https://scanorr.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-border/60 hover:border-brand-secondary/40 font-semibold rounded-lg hover:bg-brand-secondary/5 transition-all duration-300"
                >
                  <Globe size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                  Découvrir Scanorr
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 4 — Timeline du Parcours
      ============================================= */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container">
          <RevealOnScroll>
            <div className="relative pl-6 mb-12 md:mb-20">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-secondary to-brand-secondary/20" />
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-brand-secondary/80">
                  Parcours
                </span>
                <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-foreground">
                  Étapes clés du projet
                </h2>
              </div>
            </div>
          </RevealOnScroll>

          <Timeline />
        </div>
      </section>

      {/* =============================================
          SECTION 5 — Philosophie (cards modernisées)
      ============================================= */}
      <section className="relative py-16 md:py-28 border-t border-border/50 overflow-hidden">
        {/* Background grain subtil */}
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
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
              <div className="relative pl-6 mb-12 md:mb-16">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-brand-secondary to-primary/20" />
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary/80">
                    Philosophie
                  </span>
                  <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-foreground">
                    Principes fondateurs
                  </h2>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Target,
                  title: 'Axé production',
                  description:
                    'Solutions validées en conditions réelles. Zéro spéculation, uniquement des patterns éprouvés sur applications à fort trafic.',
                },
                {
                  icon: Sparkles,
                  title: 'Apprentissage interactif',
                  description:
                    'Démos live avec mesures temps réel. Manipulation directe, observations concrètes, code modifiable à volonté.',
                },
                {
                  icon: Layers,
                  title: 'Architecture progressive',
                  description:
                    'Du fondamental vers l\'avancé. Parcours structurés selon niveau et cas d\'usage, sans sauter d\'étapes.',
                },
                {
                  icon: Share2,
                  title: 'Savoir partagé',
                  description:
                    'Contenu ouvert et gratuit. Retours terrain, anti-patterns documentés, communauté qui apprend ensemble.',
                },
              ].map((value, index) => (
                <RevealOnScroll key={value.title} delay={index * 80}>
                  <div className="group relative p-7 rounded-xl border border-border/40 hover:border-primary/30 bg-card/30 hover:bg-card/60 transition-all duration-300">
                    {/* Icon avec background gradient */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-brand-secondary/10 mb-5 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 text-primary" strokeWidth={2.5} />
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>

                    {/* Accent hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/0 to-brand-secondary/0 group-hover:from-primary/5 group-hover:to-brand-secondary/5 transition-all duration-500 pointer-events-none" />
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Links sociaux */}
            <RevealOnScroll delay={300}>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-12 mt-12 border-t border-border/30">
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm font-medium text-foreground/70">
                    Restons connectés
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
                  <a
                    href="https://www.linkedin.com/in/maxime-morellon-7a9403112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white font-semibold rounded-lg hover:bg-[#0077B5]/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#0077B5]/20 hover:-translate-y-0.5"
                  >
                    <Linkedin size={18} className="transition-transform duration-300 group-hover:scale-110" />
                    LinkedIn
                  </a>
                  <a
                    href="https://www.maxime-morellon.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 border border-border/60 hover:border-primary/40 font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300"
                  >
                    <Globe size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                    Portfolio
                  </a>
                  <a
                    href="https://github.com/maxime-morellon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 border border-border/60 hover:border-primary/40 font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300"
                  >
                    <Github size={18} className="transition-transform duration-300 group-hover:scale-110" />
                    GitHub
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 6 — CTA Final (modernisé)
      ============================================= */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        {/* Background stratifié subtil */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.06] dark:opacity-[0.05]"
            style={{
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--brand-secondary) 50%, transparent 100%)',
              transform: 'skewY(-2deg)',
              transformOrigin: 'bottom left'
            }}
          />
        </div>

        <div className="container relative z-10">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight">
                  Prêt à explorer ?
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Parcourez les guides, expérimentez les démos interactives, découvrez les patterns
                  qui transformeront votre approche du développement React.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/guides"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative">Explorer les guides</span>
                  <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/blog"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border border-border/60 hover:border-primary/40 font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                  <span className="relative">Lire le blog</span>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
