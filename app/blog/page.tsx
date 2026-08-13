import { getAllArticlesMetadata } from '@/lib/blog/get-articles';
import { BlogPageClient } from './blog-page-client';

export const metadata = {
  title: 'Blog Frontend : React, Next.js, Testing, Architecture',
  description:
    'Articles techniques sur le developpement frontend moderne : React, Next.js, Testing, Architecture. Analyses, comparatifs et retours d\'experience.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog Frontend | Maxpaths',
    description: 'Articles techniques : React, Next.js, Testing, Architecture. Analyses approfondies et retours d\'experience.',
    images: [{ url: '/api/og?title=Blog+Frontend+:+React+%26+Next.js&category=best-practices', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Blog Frontend | Maxpaths',
    description: 'Articles techniques : React, Next.js, Testing, Architecture.',
    images: ['/api/og?title=Blog+Frontend+:+React+%26+Next.js&category=best-practices'],
  },
};

export default async function BlogPage() {
  const articlesMetadata = await getAllArticlesMetadata();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <BlogPageClient articles={articlesMetadata} />
    </div>
  );
}
