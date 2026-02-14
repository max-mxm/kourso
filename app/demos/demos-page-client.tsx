'use client';

import { useState, useEffect } from 'react';
import { ContentCard } from '@/components/content-card';
import { LandingContentItem } from '@/lib/content';
import { cn } from '@/lib/utils';

interface DemosPageClientProps {
  demos: LandingContentItem[];
}

export function DemosPageClient({ demos }: DemosPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tags de filtrage pour les demos
  const allTags = ['all', 'Performance', 'Next.js', 'React', 'SSR'];

  const filteredDemos =
    selectedTag === 'all'
      ? demos
      : demos.filter((demo) =>
          demo.tags.some((tag) =>
            tag.toLowerCase().includes(selectedTag.toLowerCase())
          )
        );

  return (
    <>
      {/* Filtres */}
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-sm border transition-colors',
              selectedTag === tag
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'hover:bg-muted text-muted-foreground border-border/50'
            )}
          >
            {tag === 'all' ? 'Toutes' : tag}
          </button>
        ))}
      </div>

      {/* Grille des demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredDemos.map((demo, index) => (
          <div
            key={demo.href}
            className={cn(
              mounted && 'animate-fade-slide-up',
              mounted && `stagger-${Math.min(index + 1, 12)}`
            )}
          >
            <ContentCard {...demo} />
          </div>
        ))}
      </div>

      {filteredDemos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucune demo ne correspond a ce filtre.
          </p>
        </div>
      )}
    </>
  );
}
