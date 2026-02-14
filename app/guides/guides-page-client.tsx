'use client';

import { useState, useEffect, useRef } from 'react';
import { ContentCard } from '@/components/content-card';
import { LandingContentItem } from '@/lib/content';
import { cn } from '@/lib/utils';

interface GuidesPageClientProps {
  guides: LandingContentItem[];
}

export function GuidesPageClient({ guides }: GuidesPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extraire tous les tags uniques
  const allTags = ['all', 'Next.js', 'React', 'TypeScript', 'Performance'];

  const filteredGuides =
    selectedTag === 'all'
      ? guides
      : guides.filter((guide) =>
          guide.tags.some((tag) =>
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
            {tag === 'all' ? 'Tous' : tag}
          </button>
        ))}
      </div>

      {/* Grille des guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredGuides.map((guide, index) => (
          <div
            key={guide.href}
            className={cn(
              mounted && 'animate-fade-slide-up',
              mounted && `stagger-${Math.min(index + 1, 12)}`
            )}
          >
            <ContentCard {...guide} />
          </div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucun guide ne correspond a ce filtre.
          </p>
        </div>
      )}
    </>
  );
}
