import { ArticleMetadata } from '@/lib/blog/types';

export const metadata: ArticleMetadata = {
  slug: 'react-19-2-activity-useeffectevent',
  title: 'React 19.2 : Activity, useEffectEvent et Performance Tracks',
  description:
    'Guide pratique pour orchestrer la priorite UI et diagnostiquer les lenteurs avec Activity, useEffectEvent et les traces de performance React 19.2.',
  author: 'Maxime',
  publishedAt: '2026-02-18',
  readingTime: 10,
  category: 'advanced',
  tags: ['React 19.2', 'Performance', 'Hooks', 'Advanced'],
  featured: false,
  tableOfContents: [
    { id: 'introduction', title: 'Introduction', level: 2 },
    { id: 'activity', title: 'Activity : pre-render sans bloquer', level: 2 },
    { id: 'useeffectevent', title: 'useEffectEvent : listeners stables', level: 2 },
    { id: 'performance-tracks', title: 'Performance Tracks : lire les traces', level: 2 },
    { id: 'checklist', title: 'Checklist adoption', level: 2 },
    { id: 'conclusion', title: 'Conclusion', level: 2 },
  ],
  seoTitle: 'React 19.2 : Activity, useEffectEvent et Performance Tracks | maxpaths Blog',
  seoDescription:
    'Comprendre Activity, useEffectEvent et les traces React 19.2 pour prioriser l UI et diagnostiquer les lenteurs. Patterns et checklist adoption.',
  keywords: [
    'React 19.2',
    'Activity',
    'useEffectEvent',
    'performance tracks',
    'profiling',
    'scheduler',
    'UI priority',
    'rendering',
    'performance',
  ],
  ogTitle: 'React 19.2 : Activity, useEffectEvent et Performance Tracks',
  ogDescription:
    'Orchestrer la priorite UI et diagnostiquer les lenteurs avec les nouvelles primitives React 19.2.',
  ogImage:
    '/api/og?title=React+19.2+Activity+%2B+useEffectEvent&category=advanced',
  twitterCard: 'summary_large_image',
  twitterTitle: 'React 19.2 : Activity et useEffectEvent',
  twitterDescription:
    'Prioriser l UI et lire les traces de performance avec React 19.2.',
};
