import { Target, Sparkles, Layers, Share2, Linkedin, Globe } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Axé production',
    description: 'Solutions testées en conditions réelles, pas de théorie académique.',
  },
  {
    icon: Sparkles,
    title: 'Standards modernes',
    description: 'React 19, Next.js 16 et meilleures pratiques actuelles.',
  },
  {
    icon: Layers,
    title: 'Progression structurée',
    description: 'Du fondamental à l\'avancé avec des parcours adaptés.',
  },
  {
    icon: Share2,
    title: 'Accessible à tous',
    description: 'Contenu gratuit et ouvert, pour apprendre et partager.',
  },
];

export function PhilosophySection() {
  return (
    <section className="relative py-16 md:py-28 border-t border-border/50 overflow-hidden">
      {/* Background subtil avec grain */}
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
        {/* Header de section aligné avec les autres sections */}
        <div className="relative pl-0 md:pl-6 mb-8 md:mb-12">
          {/* Barre accent gradient (visible uniquement sur desktop) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-brand-secondary to-primary/20" />

          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              Philosophie
            </span>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight">
              Retour d'expérience, pas théorie
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
              Documentation née du terrain : erreurs commises, patterns validés, solutions éprouvées en production réelle.
            </p>
          </div>
        </div>

        {/* Values Grid - pleine largeur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group relative p-6 rounded-xl border border-border/40 hover:border-primary/30 bg-card/30 hover:bg-card/60 transition-all duration-300"
              >
                {/* Icon avec background gradient */}
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-primary/10 to-brand-secondary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                </div>

                <h4 className="font-semibold text-foreground text-base mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>

                {/* Accent subtil au hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/0 to-brand-secondary/0 group-hover:from-primary/5 group-hover:to-brand-secondary/5 transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-border/30">
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
          </div>
        </div>
      </div>
    </section>
  );
}
