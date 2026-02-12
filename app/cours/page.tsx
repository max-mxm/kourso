import Link from 'next/link';
import { Rocket, BookOpen, Clock, BarChart3 } from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    {
      id: 'nextjs-demo',
      title: 'Guide Next.js 15',
      description: 'Maîtrisez les modes de rendu modernes : SSR, SSG, ISR et Client Components avec des exemples interactifs.',
      icon: Rocket,
      tags: ['Next.js 15', 'React 19', 'TypeScript'],
      sections: 21,
      level: 'Intermédiaire',
      duration: '3h',
      gradient: 'from-primary to-brand-secondary'
    },
    {
      id: 'react-19-advanced',
      title: 'React 19 - Bonnes Pratiques Seniors',
      description: 'Cours complet sur React 19 : Compiler, Server Components, Actions, useOptimistic, architecture scalable et patterns avancés.',
      icon: Rocket,
      tags: ['React 19', 'TypeScript', 'Avancé'],
      sections: 18,
      level: 'Avancé',
      duration: '4h',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center gap-4 px-6">
          <Link
            href="/"
            className="text-2xl font-black bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Kourso
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-semibold text-muted-foreground">Tous les cours</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* En-tête */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight">
              Catalogue de cours
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Parcourez notre collection de cours interactifs conçus pour vous faire progresser dans les technologies web modernes.
            </p>
          </div>

          {/* Filtres (placeholder) */}
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm border border-primary/20">
              Tous
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm border border-border/50 transition-colors">
              Next.js
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm border border-border/50 transition-colors">
              React
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm border border-border/50 transition-colors">
              TypeScript
            </button>
          </div>

          {/* Liste des cours */}
          <div className="grid gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/cours/${course.id}`}
                className="group block"
              >
                <div className="relative rounded-2xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] overflow-hidden">
                  {/* Gradient accent au survol */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className="relative grid gap-6 md:grid-cols-[auto,1fr,auto]">
                    {/* Icon */}
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 border border-primary/20 flex items-center justify-center">
                        <course.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-black group-hover:text-primary transition-colors">
                            {course.title}
                          </h2>
                          <span className="text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary">
                            DISPONIBLE
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span>{course.sections} sections</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>~{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <span>{course.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all duration-200">
                        Commencer
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Message cours à venir */}
          <div className="rounded-2xl border border-dashed border-border/50 bg-muted/20 p-12 text-center space-y-4">
            <div className="inline-flex w-20 h-20 rounded-2xl bg-muted items-center justify-center">
              <BookOpen className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Plus de cours en préparation
              </h3>
              <p className="text-muted-foreground">
                D&apos;autres cours sur React, TypeScript, Node.js et bien plus seront ajoutés prochainement. Restez à l&apos;écoute !
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
