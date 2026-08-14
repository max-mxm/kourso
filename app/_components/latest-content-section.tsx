import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import type { PublishedContentItem } from '@/lib/content-highlight';

interface LatestContentSectionProps {
  item: PublishedContentItem & {
    type: 'guide' | 'article' | 'demo';
    title: string;
    description: string;
    tags: string[];
    accentColor: string;
    duration?: string;
    readingTime?: number;
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function typeLabel(type: LatestContentSectionProps['item']['type']): string {
  if (type === 'guide') {
    return 'Nouveau guide';
  }

  if (type === 'demo') {
    return 'Nouvelle démo';
  }

  return 'Nouvel article';
}

function contentMeta(item: LatestContentSectionProps['item']): string {
  if (item.type === 'guide') {
    return item.duration ? `Lecture guide · ${item.duration}` : 'Guide pratique';
  }

  if (item.readingTime) {
    return `${item.readingTime} min de lecture`;
  }

  return 'Article technique';
}

export function LatestContentSection({ item }: LatestContentSectionProps) {
  return (
    <section className="container py-12 md:py-16">
      <Link
        href={item.href}
        className="group relative block overflow-hidden rounded-xl border border-primary/20 bg-card p-5 shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 active:scale-[0.99] sm:p-7 lg:p-8"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-brand-secondary to-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-brand-secondary/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Nouveauté
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {typeLabel(item.type)}
              </span>
            </div>

            <div className="max-w-3xl space-y-3">
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight transition-colors duration-200 group-hover:text-primary">
                {item.title}
              </h2>
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground lg:justify-end">
              {item.publishedAt && (
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                  {formatDate(item.publishedAt)}
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                {contentMeta(item)}
              </span>
            </div>

            <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 group-hover:bg-primary/90">
              Lire la nouveauté
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
