'use client';

import { ArticleCard } from '@/components/blog/article-card';
import { ArticleMetadata, BlogCategory } from '@/lib/blog/types';
import { BLOG_CATEGORY_INFO } from '@/lib/blog/constants';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
    <main className="container py-12">
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
          {(Object.keys(BLOG_CATEGORY_INFO) as BlogCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium text-sm border transition-colors',
                selectedCategory === cat
                  ? `bg-gradient-to-r ${BLOG_CATEGORY_INFO[cat].gradient} text-white border-transparent`
                  : 'hover:bg-muted text-muted-foreground border-border/50'
              )}
            >
              {BLOG_CATEGORY_INFO[cat].label}
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
