import { Code, Zap, BookOpen, Github, Linkedin, Globe } from 'lucide-react';

const values = [
  {
    icon: Code,
    title: 'Bonnes pratiques terrain',
    description: 'Solutions éprouvées en production, patterns testés sur des projets réels.',
  },
  {
    icon: Zap,
    title: 'Toujours à jour',
    description: 'Bonnes pratiques alignées sur React 19, Next.js 15 et les standards actuels.',
  },
  {
    icon: BookOpen,
    title: 'Structuré et accessible',
    description: 'Ressources organisées par cas d\'usage et niveau de complexité.',
  },
  {
    icon: Github,
    title: 'Open Source et contributif',
    description: '100% gratuit. Partagez vos propres retours d\'expérience et bonnes pratiques.',
  },
];

export function PhilosophySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-brand-secondary/5" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Colonne 1-5: Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative">
              {/* Decorative blur element */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-brand-secondary/20 blur-2xl rounded-full" />

              {/* Photo container - gradient border */}
              <div className="relative w-64 h-64 rounded-full p-1 bg-gradient-to-br from-primary to-brand-secondary">
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-6xl font-black text-muted-foreground">
                  MM
                </div>
              </div>
            </div>
          </div>

          {/* Colonne 6-12: Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow */}
            <span className="text-xs font-bold tracking-wider uppercase text-primary">
              Philosophie
            </span>

            {/* H2 */}
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-black leading-tight">
              Partager l'expérience, pas juste la théorie
            </h2>

            {/* Quote/Manifesto */}
            <blockquote className="border-l-4 border-primary pl-6 py-2 text-xl text-muted-foreground italic leading-relaxed">
              &quot;Après 8 ans de développement frontend, j'ai accumulé des bonnes pratiques
              et des solutions aux problèmes réels que je rencontre régulièrement.
              Cette plateforme existe pour les partager avec la communauté et inviter
              d'autres développeurs à faire de même.&quot;
            </blockquote>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {values.map((value) => (
                <div key={value.title} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground">{value.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs Social */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/maxime-morellon-7a9403112"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white font-semibold rounded-lg hover:bg-[#0077B5]/90 transition-colors"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href="https://www.maxime-morellon.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-border hover:border-primary/50 font-semibold rounded-lg hover:bg-primary/5 transition-all"
              >
                <Globe size={20} />
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
