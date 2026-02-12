import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllArticlesMetadata } from '@/lib/blog/get-articles';
import { BLOG_CATEGORY_INFO } from '@/lib/blog/constants';

export async function BlogPreviewSection() {
  const articles = await getAllArticlesMetadata();
  const featured = articles.find((a) => a.featured) || articles[0];
  const recent = articles.filter((a) => a.slug !== featured?.slug).slice(0, 2);

  if (!featured) {
    return null;
  }

  return (
    <section className="py-24 bg-violet-500/5">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-secondary">
              Blog Technique
            </span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight">
              <span className="bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
                Derniers articles
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-brand-secondary hover:text-brand-secondary/80 font-semibold transition-colors"
          >
            Voir tous les articles
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Article (col 1-7) */}
          <div className="lg:col-span-7">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border-2 border-border/50 bg-card overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${BLOG_CATEGORY_INFO[featured.category].gradient} bg-clip-text text-transparent uppercase`}>
                    {BLOG_CATEGORY_INFO[featured.category].label}
                  </span>
                  <span className="text-sm text-muted-foreground">{featured.readingTime} min</span>
                </div>
                <h3 className={`text-3xl font-black bg-gradient-to-r ${BLOG_CATEGORY_INFO[featured.category].gradient} bg-clip-text text-transparent`}>
                  {featured.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Articles Stack (col 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            {recent.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block rounded-xl border border-border/50 bg-card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${BLOG_CATEGORY_INFO[article.category].gradient} bg-clip-text text-transparent uppercase`}>
                      {BLOG_CATEGORY_INFO[article.category].label}
                    </span>
                    <span className="text-sm text-muted-foreground">{article.readingTime} min</span>
                  </div>
                  <h4 className={`text-xl font-bold line-clamp-2 bg-gradient-to-r ${BLOG_CATEGORY_INFO[article.category].gradient} bg-clip-text text-transparent`}>
                    {article.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link
            href="/blog"
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-border hover:border-brand-secondary/50 font-semibold rounded-xl hover:bg-brand-secondary/5 transition-all"
          >
            Voir tous les articles
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
