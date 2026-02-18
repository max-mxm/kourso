import { getAllArticlesMetadata } from '@/lib/blog/get-articles';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.maxpaths.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticlesMetadata();

  const articleUrls = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const guideUrls = [
    {
      url: `${BASE_URL}/guides/architecture-hexagonale`,
      lastModified: new Date('2026-02-18'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/zod-validation`,
      lastModified: new Date('2026-02-13'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/tanstack-react`,
      lastModified: new Date('2026-02-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/react-19-advanced`,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/nextjs-demo`,
      lastModified: new Date('2026-02-03'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/react-memoization`,
      lastModified: new Date('2026-01-28'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  const demoUrls = [
    {
      url: `${BASE_URL}/demos/simulateur-architecture-hexagonale`,
      lastModified: new Date('2026-02-18'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/demos/simulateur-performance`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/demos/simulateur-rendering`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/demos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...guideUrls,
    ...demoUrls,
    ...articleUrls,
  ];
}
