'use client';

import { TableOfContentsItem } from '@/lib/blog/types';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ArticleSidebarProps {
  tableOfContents: TableOfContentsItem[];
}

export function ArticleSidebar({ tableOfContents }: ArticleSidebarProps) {
  const [activeId, setActiveId] = useState('');

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

  if (tableOfContents.length === 0) return null;

  return (
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
                  ? 'border-primary text-primary font-medium pl-4'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border pl-4 hover:pl-5'
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
