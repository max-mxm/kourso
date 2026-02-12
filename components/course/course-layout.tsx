'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Rocket,
  Zap,
  FileText,
  RefreshCw,
  Monitor,
  Target,
  type LucideIcon
} from 'lucide-react';

// Mapping des noms d'icônes vers les composants
const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Zap,
  FileText,
  RefreshCw,
  Monitor,
  Target,
};

interface Section {
  id: string;
  title: string;
  iconName?: string;
  emoji?: string;
  category:
    | 'fundamentals'
    | 'rendering'
    | 'advanced'
    | 'optimization'
    | 'best-practices';
  component: React.ReactNode;
}

interface CourseLayoutProps {
  title: string;
  subtitle?: string;
  sections: Section[];
}

const categories = [
  {
    id: 'fundamentals',
    label: 'Fondamentaux',
    color: 'from-primary to-brand-secondary',
  },
  {
    id: 'rendering',
    label: 'Modes de Rendu',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'optimization',
    label: 'Optimisations',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'best-practices',
    label: 'Bonnes Pratiques',
    color: 'from-purple-500 to-pink-500',
  },
  { id: 'advanced', label: 'Avancé', color: 'from-red-500 to-rose-500' },
] as const;

export function CourseLayout({ title, subtitle, sections }: CourseLayoutProps) {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll spy + progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Detect active section
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      // Trouver la section la plus proche du haut de la fenêtre
      // On utilise 150px pour tenir compte du scroll-mt-32 (128px) + header
      let closestSection = '';
      let closestDistance = Infinity;

      sectionElements.forEach((section) => {
        if (section && section.element) {
          const rect = section.element.getBoundingClientRect();
          // Distance absolue par rapport au point de référence (150px du haut)
          const distance = Math.abs(rect.top - 150);

          // Si cette section est plus proche et visible
          if (distance < closestDistance && rect.top <= 200) {
            closestDistance = distance;
            closestSection = section.id;
          }
        }
      });

      if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="relative min-h-screen scroll-smooth bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Progress bar global - Améliorée avec gradient et glow */}
      <div className="fixed top-0 right-0 left-0 z-50 h-0.5 bg-slate-200 dark:bg-slate-800">
        <div
          className="from-primary to-brand-secondary h-full bg-gradient-to-r transition-all duration-300 shadow-[0_0_10px_rgba(0,150,136,0.5)] dark:shadow-[0_0_15px_rgba(0,150,136,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-xl font-black tracking-tight text-transparent">
                Koursorr
              </h1>
            </a>
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground hidden text-sm md:block">
                {Math.round(scrollProgress)}% complété
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex gap-8 px-6 py-8">
        {/* Sidebar */}
        <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-64 flex-shrink-0 overflow-y-auto lg:block">
          <nav className="space-y-6">
            {categories.map((category) => {
              const categorySections = sections.filter(
                (s) => s.category === category.id,
              );

              if (categorySections.length === 0) return null;

              return (
                <div key={category.id}>
                  <div
                    className={cn(
                      'mb-2 bg-gradient-to-r bg-clip-text text-xs font-bold tracking-wider text-transparent uppercase',
                      category.color,
                    )}
                  >
                    {category.label}
                  </div>
                  <ul className="space-y-1">
                    {categorySections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={cn(
                            'group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
                            activeSection === section.id
                              ? 'bg-primary/10 text-primary dark:bg-primary/20 font-semibold border-l-2 border-primary'
                              : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1 border-l-2 border-transparent',
                          )}
                        >
                          <span className="flex items-center gap-2 flex-1 truncate">
                            {section.iconName && (() => {
                              const IconComponent = iconMap[section.iconName];
                              return IconComponent ? <IconComponent className="w-4 h-4 flex-shrink-0" /> : null;
                            })()}
                            {section.title}
                          </span>
                          {activeSection === section.id && (
                            <div className="bg-primary h-2 w-2 rounded-full animate-pulse" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-24">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={cn(
                  'scroll-mt-32 transition-all duration-700',
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Section header */}
                <div className="mb-8">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span>
                      {categories.find((c) => c.id === section.category)?.label}
                    </span>
                    <span>·</span>
                    <span>
                      Section {index + 1}/{sections.length}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">
                    {section.emoji && <span className="mr-3">{section.emoji}</span>}
                    {section.title}
                  </h2>
                </div>

                {/* Section content */}
                <div className="rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm md:p-8 dark:bg-slate-900/50 dark:shadow-slate-950/50">
                  {section.component}
                </div>
              </section>
            ))}
          </div>

          {/* End marker */}
          <div className="mt-24 text-center">
            <h3 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-2xl font-black text-transparent">
              Félicitations !
            </h3>
            <p className="text-muted-foreground mt-2">
              Vous avez terminé le cours.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
