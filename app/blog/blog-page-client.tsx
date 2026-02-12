'use client';

import { ArticleCard } from '@/components/blog/article-card';
import { ArticleMetadata, BlogCategory } from '@/lib/blog/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const categoryInfo: Record<BlogCategory, { label: string; gradient: string }> =
  {
    fundamentals: {
      label: 'Fondamentaux',
      gradient: 'from-primary to-brand-secondary',
    },
    architecture: {
      label: 'Architecture',
      gradient: 'from-blue-500 to-cyan-500',
    },
    testing: { label: 'Testing', gradient: 'from-orange-500 to-amber-500' },
    'best-practices': {
      label: 'Bonnes Pratiques',
      gradient: 'from-purple-500 to-pink-500',
    },
    advanced: { label: 'Avancé', gradient: 'from-red-500 to-rose-500' },
  };

interface BlogPageClientProps {
  articles: ArticleMetadata[];
}

export function BlogPageClient({ articles }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>(
    'all'
  );

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const featured = filteredArticles.find((a) => a.featured);
  const regular = filteredArticles.filter((a) => !a.featured);

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* En-tête */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
            Blog Technique
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Analyses, tutoriels et réflexions sur le développement frontend
            moderne.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-sm border transition-colors',
              selectedCategory === 'all'
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'hover:bg-muted text-muted-foreground border-border/50'
            )}
          >
            Tous
          </button>
          {(Object.keys(categoryInfo) as BlogCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium text-sm border transition-colors',
                selectedCategory === cat
                  ? `bg-gradient-to-r ${categoryInfo[cat].gradient} text-white border-transparent`
                  : 'hover:bg-muted text-muted-foreground border-border/50'
              )}
            >
              {categoryInfo[cat].label}
            </button>
          ))}
        </div>

        {/* Article featured (si existe) */}
        {featured && (
          <div className="mb-12">
            <ArticleCard metadata={featured} variant="featured" />
          </div>
        )}

        {/* Grille articles */}
        {regular.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regular.map((article) => (
              <ArticleCard key={article.slug} metadata={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun article dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
