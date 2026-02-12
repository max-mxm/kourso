'use client';

import { useEffect, useState } from 'react';
import { TableOfContentsItem, BlogCategory } from '@/lib/blog/types';
import { BLOG_CATEGORY_INFO } from '@/lib/blog/constants';
import { cn } from '@/lib/utils';

interface ArticleInteractiveProps {
  tableOfContents: TableOfContentsItem[];
  category: BlogCategory;
  children: React.ReactNode;
}

export function ArticleInteractive({
  tableOfContents,
  category,
  children,
}: ArticleInteractiveProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState('');
  const categoryData = BLOG_CATEGORY_INFO[category];

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy pour la ToC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  return (
    <>
      {/* Progress bar fixe en haut */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-slate-200 dark:bg-slate-800">
        <div
          className={`h-full bg-gradient-to-r ${categoryData.gradient} shadow-lg shadow-primary/50 transition-all duration-300`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container flex gap-8 py-8">
        {/* Sidebar avec ToC */}
        {tableOfContents.length > 0 && (
          <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-64 flex-shrink-0 overflow-y-auto lg:block">
            <nav className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Table des matières
              </h3>
              <ul className="space-y-2 text-sm">
                {tableOfContents.map((item) => (
                  <li key={item.id} className={cn(item.level === 3 && 'pl-4')}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        'block py-1.5 transition-all duration-200 border-l-2',
                        activeId === item.id
                          ? 'font-medium pl-4'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border pl-4 hover:pl-5'
                      )}
                      style={activeId === item.id ? {
                        borderColor: categoryData.accentColor,
                        color: categoryData.accentColor,
                      } : undefined}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Contenu principal (passé en enfant) */}
        <main className="min-w-0 flex-1 max-w-4xl">{children}</main>
      </div>
    </>
  );
}
