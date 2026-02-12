import { ArticleMetadata, BlogCategory } from '@/lib/blog/types';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface ArticleHeaderProps {
  metadata: ArticleMetadata;
}

const categoryInfo: Record<
  BlogCategory,
  { label: string; gradient: string }
> = {
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

export function ArticleHeader({ metadata }: ArticleHeaderProps) {
  const category = categoryInfo[metadata.category];

  return (
    <header className="mb-12 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-foreground transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{category.label}</span>
      </nav>

      {/* Badge Catégorie */}
      <div>
        <span
          className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent border border-current/20`}
        >
          {category.label}
        </span>
      </div>

      {/* Titre */}
      <h1
        className={`text-4xl md:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
      >
        {metadata.title}
      </h1>

      {/* Description */}
      <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
        {metadata.description}
      </p>

      {/* Métadonnées */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{metadata.author}</span>
        </div>
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
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{metadata.readingTime} min de lecture</span>
        </div>
      </div>

      {/* Tags */}
      {metadata.tags.length > 0 && (
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
      )}

      {/* Séparateur */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  );
}
