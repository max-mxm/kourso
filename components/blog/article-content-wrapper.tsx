import { BlogCategory } from '@/lib/blog/types';
import { BLOG_CATEGORY_INFO } from '@/lib/blog/constants';

interface ArticleContentWrapperProps {
  children: React.ReactNode;
  category: BlogCategory;
}

export function ArticleContentWrapper({
  children,
  category,
}: ArticleContentWrapperProps) {
  const accentColor = BLOG_CATEGORY_INFO[category].accentColor;

  return (
    <article
      className="prose prose-slate dark:prose-invert max-w-none
        prose-headings:scroll-mt-24
        prose-h2:text-3xl prose-h2:font-black prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-lg prose-p:leading-relaxed prose-p:text-foreground/80
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-transparent prose-pre:p-0
        prose-strong:text-foreground prose-strong:font-semibold
        prose-ul:my-6 prose-li:my-2
        [&>*]:my-8
        [&>h2]:mt-12 [&>h2]:mb-6
        [&>h3]:mt-8 [&>h3]:mb-4
        [&>p]:my-4
      "
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      {children}
    </article>
  );
}
