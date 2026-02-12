import { getAllArticlesMetadata } from '@/lib/blog/get-articles';
import { Header } from '@/components/header';
import { BlogPageClient } from './blog-page-client';

export const metadata = {
  title: 'Blog | Koursorr',
  description:
    'Articles techniques sur le développement frontend moderne : React, Next.js, Testing, Architecture',
};

export default async function BlogPage() {
  const articlesMetadata = await getAllArticlesMetadata();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <BlogPageClient articles={articlesMetadata} />
    </div>
  );
}
