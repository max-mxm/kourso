import { getArticleBySlug, getAllArticles } from '@/lib/blog/get-articles';
import { ArticleInteractive } from '@/components/blog/article-interactive';
import { ArticleHeader } from '@/components/blog/article-header';
import { ArticleContentWrapper } from '@/components/blog/article-content-wrapper';
import { Header } from '@/components/header';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// SEO Metadata dynamique
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article non trouvé | Blog Kourso',
    };
  }

  const metadata = article;

  return {
    title: metadata.seoTitle || `${metadata.title} | Blog Kourso`,
    description: metadata.seoDescription || metadata.description,
    authors: [{ name: metadata.author }],

    openGraph: {
      title: metadata.seoTitle || metadata.title,
      description: metadata.seoDescription || metadata.description,
      type: 'article',
      publishedTime: metadata.publishedAt,
      modifiedTime: metadata.updatedAt,
      authors: [metadata.author],
      tags: metadata.tags,
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : [],
    },

    twitter: {
      card: 'summary_large_image',
      title: metadata.seoTitle || metadata.title,
      description: metadata.seoDescription || metadata.description,
      images: metadata.ogImage ? [metadata.ogImage] : [],
    },
  };
}

// Génération des pages statiques (SSG)
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const Content = article.content;

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />

      <ArticleInteractive tableOfContents={article.tableOfContents}>
        <ArticleHeader metadata={article} />

        <div className="rounded-2xl bg-white/50 p-6 md:p-10 shadow-lg backdrop-blur-sm dark:bg-slate-900/50 border border-border/50">
          <ArticleContentWrapper category={article.category}>
            <Content />
          </ArticleContentWrapper>
        </div>

        {/* Footer article */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Merci d'avoir lu cet article
          </p>
        </div>
      </ArticleInteractive>
    </div>
  );
}
