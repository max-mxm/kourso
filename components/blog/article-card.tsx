import { ArticleMetadata } from '@/lib/blog/types';
import { BLOG_CATEGORY_INFO } from '@/lib/blog/constants';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  metadata: ArticleMetadata;
  variant?: 'default' | 'featured';
}

function isNew(publishedAt: string): boolean {
  const published = new Date(publishedAt);
  const now = new Date();
  const daysDiff = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return daysDiff < 7;
}

export function ArticleCard({ metadata, variant = 'default' }: ArticleCardProps) {
  const category = BLOG_CATEGORY_INFO[metadata.category];
  const isNewArticle = isNew(metadata.publishedAt);

  if (variant === 'featured') {
    return (
      <Link
        href={`/blog/${metadata.slug}`}
        className="group block rounded-2xl border border-border/50 bg-white/50 dark:bg-slate-900/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden"
      >
        <div className="p-8 md:p-10 space-y-6">
          <div className="flex items-center justify-between">
            <span
              className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent border border-current/20`}
            >
              {category.label}
            </span>
            {isNewArticle && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                Nouveau
              </span>
            )}
          </div>

          <h2
            className={`text-3xl md:text-4xl font-black tracking-tight group-hover:translate-x-1 transition-transform duration-300 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
          >
            {metadata.title}
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {metadata.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full border border-border/50"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Métadonnées */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border/50 pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={metadata.publishedAt}>
                {new Date(metadata.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
            <span>·</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{metadata.readingTime} min</span>
            </div>
            <span>·</span>
            <span>{metadata.author}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${metadata.slug}`}
      className="group block rounded-xl border border-border/50 bg-white/50 dark:bg-slate-900/50 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] overflow-hidden h-full"
    >
      <div className="p-6 space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <span
            className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent border border-current/20`}
          >
            {category.label}
          </span>
          {isNewArticle && (
            <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
              New
            </span>
          )}
        </div>

        <h3
          className={cn(
            'text-xl font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-300',
            `bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`
          )}
        >
          {metadata.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {metadata.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {metadata.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Métadonnées */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border/50 pt-4">
          <time dateTime={metadata.publishedAt}>
            {new Date(metadata.publishedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </time>
          <span>·</span>
          <span>{metadata.readingTime} min</span>
          <span>·</span>
          <span>{metadata.author}</span>
        </div>
      </div>
    </Link>
  );
}
