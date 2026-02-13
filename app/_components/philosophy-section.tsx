import { Code, Zap, BookOpen, Github, Linkedin, Globe } from 'lucide-react';

const values = [
  {
    icon: Code,
    title: 'Pratiques terrain',
    description: 'Chaque guide part d\'un probleme reel rencontre en production.',
  },
  {
    icon: Zap,
    title: 'Toujours a jour',
    description: 'Aligne sur React 19, Next.js 16 et les standards actuels.',
  },
  {
    icon: BookOpen,
    title: 'Structure et progressif',
    description: 'Ressources organisees par niveau et cas d\'usage.',
  },
  {
    icon: Github,
    title: 'Open source',
    description: 'Gratuit, ouvert et contributif.',
  },
];

export function PhilosophySection() {
  return (
    <section className="py-14 md:py-24 border-t border-border/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          {/* Eyebrow */}
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Demarche
          </span>

          {/* H2 */}
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight mt-4 mb-8">
            L&apos;experience avant la theorie
          </h2>

          {/* Blockquote */}
          <blockquote className="border-l-0 md:border-l-2 border-primary pl-0 md:pl-6 py-1 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
            &quot;Ce site n&apos;est pas un cours magistral. C&apos;est un carnet de pratiques :
            des solutions que j&apos;ai testees, des erreurs que j&apos;ai commises, et des
            patterns qui ont fait leurs preuves sur des projets en production. L&apos;objectif
            est simple&nbsp;&mdash;&nbsp;partager ces retours d&apos;experience avec la communaute.&quot;
          </blockquote>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left">
                <value.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Social CTAs */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/in/maxime-morellon-7a9403112"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] text-white font-semibold rounded-lg hover:bg-[#0077B5]/90 transition-colors text-sm"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="https://www.maxime-morellon.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border hover:border-primary/40 font-semibold rounded-lg hover:bg-primary/5 transition-all text-sm"
            >
              <Globe size={16} />
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
