'use client';

import { ContentCard, ContentCardProps } from '@/components/content-card';
import { ArticleMetadata, BlogCategory } from '@/lib/blog/types';
import { BLOG_CATEGORY_INFO } from '@/lib/blog/constants';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlogPageClientProps {
  articles: ArticleMetadata[];
}

function articleToContentCard(article: ArticleMetadata): ContentCardProps {
  const category = BLOG_CATEGORY_INFO[article.category];
  return {
    href: `/blog/${article.slug}`,
    type: 'article' as const,
    title: article.title,
    description: article.description,
    tags: article.tags,
    accentColor: category.accentColor,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
  };
}

export function BlogPageClient({ articles }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>(
    'all'
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const featured = filteredArticles.find((a) => a.featured);
  const regular = filteredArticles.filter((a) => !a.featured);

  return (
    <main className="container py-8 md:py-12">
      <div className="space-y-8 md:space-y-12">
        {/* En-tête */}
        <div className="space-y-4 text-center md:text-left animate-fade-slide-down">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">
            Blog Technique
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
            Analyses, tutoriels et reflexions sur le developpement frontend
            moderne.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
          <div className={cn('mb-12', mounted && 'animate-fade-slide-up')}>
            <ContentCard {...articleToContentCard(featured)} variant="featured" />
          </div>
        )}

        {/* Grille articles */}
        {regular.length > 0 ? (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regular.map((article, index) => (
              <div
                key={article.slug}
                className={cn(
                  mounted && 'animate-fade-slide-up',
                  mounted && `stagger-${Math.min(index + (featured ? 2 : 1), 12)}`
                )}
              >
                <ContentCard {...articleToContentCard(article)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun article dans cette categorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
