'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, BookOpen, Play, Newspaper, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Context for guide sections injection ---

interface GuideNavSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  badge?: string;
  category: 'fundamentals' | 'rendering' | 'advanced' | 'optimization' | 'best-practices';
}

interface GuideNavData {
  title: string;
  subtitle?: string;
  sections: GuideNavSection[];
  activeSection: string;
}

interface MobileNavContextValue {
  guideNav: GuideNavData | null;
  setGuideNav: React.Dispatch<React.SetStateAction<GuideNavData | null>>;
}

const MobileNavContext = createContext<MobileNavContextValue>({
  guideNav: null,
  setGuideNav: () => {},
});

export function useMobileNav() {
  return useContext(MobileNavContext);
}

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [guideNav, setGuideNav] = useState<GuideNavData | null>(null);

  return (
    <MobileNavContext.Provider value={{ guideNav, setGuideNav }}>
      {children}
    </MobileNavContext.Provider>
  );
}

// --- Guide section categories (shared with CourseLayout) ---

const categories = [
  { id: 'fundamentals', label: 'Fondamentaux', color: 'from-primary to-brand-secondary' },
  { id: 'rendering', label: 'Modes de Rendu', color: 'from-blue-500 to-cyan-500' },
  { id: 'optimization', label: 'Optimisations', color: 'from-orange-500 to-amber-500' },
  { id: 'best-practices', label: 'Bonnes Pratiques', color: 'from-purple-500 to-pink-500' },
  { id: 'advanced', label: 'Avance', color: 'from-red-500 to-rose-500' },
] as const;

// --- Main navigation links ---

const navLinks = [
  { href: '/', label: 'Accueil', icon: Home, match: (p: string) => p === '/' },
  { href: '/guides', label: 'Guides', icon: BookOpen, match: (p: string) => p.startsWith('/guides') },
  { href: '/demos', label: 'Demos', icon: Play, match: (p: string) => p.startsWith('/demos') },
  { href: '/blog', label: 'Blog', icon: Newspaper, match: (p: string) => p.startsWith('/blog') },
  { href: '/about', label: 'A propos', icon: User, match: (p: string) => p === '/about' },
];

// --- FAB + Bottom Sheet ---

export function MobileNavFAB() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { guideNav } = useMobileNav();

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const handleClose = useCallback(() => {
    document.body.style.overflow = '';
    setOpen(false);
  }, []);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40 md:hidden min-h-[56px] min-w-[56px] rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all',
          open && 'hidden'
        )}
        aria-label="Ouvrir la navigation"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Bottom Sheet */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleClose}
          />

          {/* Sheet */}
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-background rounded-t-2xl border-t border-border shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom fade-in duration-300"
            style={{ animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Handle bar */}
            <div className="flex justify-center py-3 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Header */}
            <div className="px-6 pb-3 border-b border-border/50 flex items-center justify-between flex-shrink-0">
              <span className="text-sm font-bold text-muted-foreground">
                Navigation
              </span>
              <button
                onClick={handleClose}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Fermer la navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <nav className="overflow-y-auto flex-1 px-4 py-4 space-y-2">
              {/* Global navigation links */}
              {navLinks.map((link) => {
                const isActive = link.match(pathname);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleClose}
                    className={cn(
                      'flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-lg text-base font-semibold transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {link.label}
                  </Link>
                );
              })}

              {/* Guide sections (when inside a guide) */}
              {guideNav && (
                <>
                  <div className="my-4 border-t border-border/50" />
                  <div className="mb-4 pb-4 border-b border-border/40">
                    <h3 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-sm font-black text-transparent leading-tight">
                      {guideNav.title}
                    </h3>
                    {guideNav.subtitle && (
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {guideNav.subtitle}
                      </p>
                    )}
                  </div>

                  {categories.map((category) => {
                    const categorySections = guideNav.sections.filter(
                      (s) => s.category === category.id
                    );
                    if (categorySections.length === 0) return null;

                    return (
                      <div key={category.id}>
                        <div
                          className={cn(
                            'mb-2 bg-gradient-to-r bg-clip-text text-xs font-bold tracking-wider text-transparent uppercase',
                            category.color
                          )}
                        >
                          {category.label}
                        </div>
                        <ul className="space-y-1">
                          {categorySections.map((section) => (
                            <li key={section.id}>
                              <a
                                href={`#${section.id}`}
                                onClick={handleClose}
                                className={cn(
                                  'group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 min-h-[44px]',
                                  guideNav.activeSection === section.id
                                    ? 'bg-primary/10 text-primary dark:bg-primary/20 font-semibold border-l-2 border-primary'
                                    : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 border-l-2 border-transparent'
                                )}
                              >
                                <span className="flex items-center gap-2 flex-1 truncate">
                                  {section.icon}
                                  {section.title}
                                </span>
                                {section.badge && (
                                  <span className="shrink-0 rounded-md bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                                    {section.badge}
                                  </span>
                                )}
                                {guideNav.activeSection === section.id && (
                                  <div className="bg-primary h-2 w-2 rounded-full animate-pulse" />
                                )}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
