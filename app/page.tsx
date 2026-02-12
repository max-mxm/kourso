import type { Metadata } from 'next';
import { HeroSection } from './_components/hero-section';
import { FeaturedCourseCard } from './_components/featured-course-card';
import { BlogPreviewSection } from './_components/blog-preview-section';
import { PhilosophySection } from './_components/philosophy-section';
import { Rocket, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Bonnes pratiques React et Next.js issues de 8 ans d\'expérience. Patterns éprouvés, solutions terrain et retours d\'expérience partagés gratuitement.',
  openGraph: {
    title: 'Kourso - Bonnes pratiques React & Next.js',
    description: 'Patterns éprouvés, solutions terrain et retours d\'expérience partagés gratuitement',
    images: ['/og-image-home.png'],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kourso",
  "url": "https://kourso.com",
  "inLanguage": "fr-FR",
  "description": "Plateforme de partage de bonnes pratiques React et Next.js basées sur des projets réels",
  "publisher": {
    "@type": "Organization",
    "name": "Kourso"
  }
};

export default function Home() {
  return (
    <>
      {/* JSON-LD WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Course Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider uppercase text-primary">
                Ressources principales
              </span>
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-black leading-tight">
                Explorez les bonnes pratiques
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Featured: Guide Next.js */}
              <FeaturedCourseCard
                id="nextjs-demo"
                title="Guide Next.js 15"
                description="Bonnes pratiques des modes de rendu : SSR, SSG, ISR et Client Components. Retours d'expérience sur des projets réels avec exemples concrets."
                sections={21}
                tags={['Next.js 15', 'React 19', 'TypeScript']}
                gradient="from-primary to-brand-secondary"
                badge="POPULAIRE"
                icon={Rocket}
              />

              {/* React 19 - Compact card */}
              <div className="md:col-span-4">
                <a
                  href="/cours/react-19-advanced"
                  className="group block h-full rounded-2xl border-2 border-border/50 bg-card p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-purple-500" />
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        NOUVEAU
                      </span>
                    </div>
                    <h3 className="text-2xl font-black group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      React 19 - Seniors
                    </h3>
                    <p className="text-muted-foreground flex-1">
                      Patterns avancés React 19 : Compiler, Server Components, Actions. Solutions éprouvées et cas d'usage professionnels.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">18 sections</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold">→</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <BlogPreviewSection />

        {/* Philosophy / About Maxime */}
        <PhilosophySection />
      </div>
    </>
  );
}
