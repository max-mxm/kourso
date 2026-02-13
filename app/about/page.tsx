import Link from 'next/link';
import { Zap, BookOpen, Palette, Unlock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="container py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* En-tête */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              À propos de Koursorr
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Koursorr est mon espace open source de partage de bonnes pratiques React, Next.js et technologies web modernes. Issues de 8 ans d&apos;expérience sur des projets réels, ces ressources ont vocation à évoluer et à s&apos;ouvrir aux contributions d&apos;autres développeurs.
            </p>
          </div>

          {/* Mission */}
          <section className="space-y-4">
            <h2 className="text-3xl font-black">Ma démarche</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Documenter et partager les bonnes pratiques que j&apos;ai éprouvées en production. Chaque guide est basé sur des retours d&apos;expérience concrets, avec des démos interactives et des exemples de code testés sur des projets réels.
              </p>
            </div>
          </section>

          {/* Caractéristiques */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black">Ce qui nous distingue</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3 p-6 rounded-xl border border-border/50 bg-card">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 border border-primary/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Démos Interactives</h3>
                <p className="text-muted-foreground">
                  Chaque concept est accompagné de démos en temps réel que vous pouvez tester directement dans votre navigateur.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-xl border border-border/50 bg-card">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 border border-primary/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Contenu Structuré</h3>
                <p className="text-muted-foreground">
                  Guides organisés par thèmes avec une navigation fluide et un suivi de votre progression.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-xl border border-border/50 bg-card">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 border border-primary/20 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Design Moderne</h3>
                <p className="text-muted-foreground">
                  Interface élégante avec support du mode sombre, animations fluides et typographie soignée.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-xl border border-border/50 bg-card">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 border border-primary/20 flex items-center justify-center">
                  <Unlock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Open Source</h3>
                <p className="text-muted-foreground">
                  Le projet est entièrement open source. Vous pouvez contribuer, modifier et l&apos;adapter à vos besoins.
                </p>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black">Technologies Utilisées</h2>
            <div className="rounded-xl border border-border/50 bg-card p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-bold mb-3 text-primary">Frontend</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>Next.js 16 avec App Router</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>React 19</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>TypeScript</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>Tailwind CSS v4</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-primary">Design System</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>Shadcn UI (prêt à l&apos;emploi)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>Palette Teal + Violet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>Mode sombre/clair</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>Animations fluides</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-brand-secondary/5 p-8 text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-black">Prêt à explorer ?</h2>
              <p className="text-lg text-muted-foreground">
                Commencez avec le guide Next.js 15, gratuit et open source.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/guides/nextjs-demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
              >
                Explorer le guide
                <span>→</span>
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border hover:border-primary/50 font-semibold rounded-xl hover:bg-primary/5 transition-all duration-200"
              >
                Voir tous les guides
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
