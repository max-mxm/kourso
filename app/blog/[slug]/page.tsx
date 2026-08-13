import { getArticleBySlug, getAllArticles } from '@/lib/blog/get-articles';
import { ArticleInteractive } from '@/components/blog/article-interactive';
import { ArticleHeader } from '@/components/blog/article-header';
import { ArticleContentWrapper } from '@/components/blog/article-content-wrapper';
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
      title: 'Article non trouvé | Blog maxpaths',
    };
  }

  const metadata = article;
  const pageTitle = metadata.seoTitle || `${metadata.title} | Blog maxpaths`;
  const ogImage =
    metadata.ogImage ||
    `/api/og?title=${encodeURIComponent(pageTitle)}&category=${metadata.category}`;

  return {
    title: {
      absolute: pageTitle,
    },
    description: metadata.seoDescription || metadata.description,
    authors: [{ name: metadata.author }],
    alternates: {
      canonical: `/blog/${slug}`,
    },

    openGraph: {
      title: metadata.ogTitle || pageTitle,
      description: metadata.seoDescription || metadata.description,
      type: 'article',
      publishedTime: metadata.publishedAt,
      modifiedTime: metadata.updatedAt,
      authors: [metadata.author],
      tags: metadata.tags,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },

    twitter: {
      card: 'summary_large_image',
      title: metadata.twitterTitle || pageTitle,
      description: metadata.twitterDescription || metadata.seoDescription || metadata.description,
      images: [ogImage],
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.description,
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://www.maxpaths.dev/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maxpaths',
      url: 'https://www.maxpaths.dev',
      logo: { '@type': 'ImageObject', url: 'https://www.maxpaths.dev/maxpaths-logo.svg' },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: `https://www.maxpaths.dev/blog/${slug}`,
    keywords: article.tags?.join(', '),
    inLanguage: 'fr',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.maxpaths.dev' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.maxpaths.dev/blog' },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  };

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleInteractive tableOfContents={article.tableOfContents} category={article.category}>
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
