'use client';

import { ArticleMetadata } from '@/lib/blog/types';
import { ArticleHeader } from './article-header';
import { ArticleSidebar } from './article-sidebar';
import { ArticleContentWrapper } from './article-content-wrapper';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
interface BlogLayoutProps {
  metadata: ArticleMetadata;
  children: React.ReactNode;
}

export function BlogLayout({ metadata, children }: BlogLayoutProps) {
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-primary to-brand-secondary shadow-lg shadow-primary/50 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container flex gap-8 py-8">
        {/* Sidebar avec ToC */}
        <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-64 flex-shrink-0 overflow-y-auto lg:block">
          <ArticleSidebar tableOfContents={metadata.tableOfContents} />
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 max-w-4xl">
          <ArticleHeader metadata={metadata} />
          <div className="rounded-2xl bg-white/50 p-6 md:p-10 shadow-lg backdrop-blur-sm dark:bg-slate-900/50 border border-border/50">
            <ArticleContentWrapper category={metadata.category}>
              {children}
            </ArticleContentWrapper>
          </div>

          {/* Footer article */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Merci d'avoir lu cet article
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
