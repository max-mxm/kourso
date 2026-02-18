import { Article, ArticleMetadata } from './types';

// Import manuel des métadonnées uniquement
import { metadata as tddMetadata } from '@/app/blog/_articles/tdd-frontend-vs-backend/metadata';
import { metadata as reduxVsContextVsZustandMetadata } from '@/app/blog/_articles/redux-vs-context-vs-zustand/metadata';
import { metadata as react19ActionsProductionMetadata } from '@/app/blog/_articles/react-19-actions-production/metadata';
import { metadata as react192ActivityUseEffectEventMetadata } from '@/app/blog/_articles/react-19-2-activity-useeffectevent/metadata';

// Registre des métadonnées (sans les composants)
const metadataRegistry: ArticleMetadata[] = [
  tddMetadata,
  reduxVsContextVsZustandMetadata,
  react19ActionsProductionMetadata,
  react192ActivityUseEffectEventMetadata,
];

// Fonction pour charger le composant content d'un article
async function loadArticleContent(slug: string): Promise<React.ComponentType | null> {
  switch (slug) {
    case 'tdd-frontend-vs-backend':
      const { default: TDDContent } = await import('@/app/blog/_articles/tdd-frontend-vs-backend/content');
      return TDDContent;
    case 'redux-vs-context-vs-zustand':
      const { default: ReduxVsContextVsZustandContent } = await import('@/app/blog/_articles/redux-vs-context-vs-zustand/content');
      return ReduxVsContextVsZustandContent;
    case 'react-19-actions-production':
      const { default: React19ActionsProductionContent } = await import('@/app/blog/_articles/react-19-actions-production/content');
      return React19ActionsProductionContent;
    case 'react-19-2-activity-useeffectevent':
      const { default: React192ActivityUseEffectEventContent } = await import('@/app/blog/_articles/react-19-2-activity-useeffectevent/content');
      return React192ActivityUseEffectEventContent;
    default:
      return null;
  }
}

export async function getAllArticlesMetadata(): Promise<ArticleMetadata[]> {
  // Créer une copie pour éviter de muter l'original
  return [...metadataRegistry].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getAllArticles(): Promise<Article[]> {
  const metadata = await getAllArticlesMetadata();

  const articles = await Promise.all(
    metadata.map(async (meta) => {
      const content = await loadArticleContent(meta.slug);
      return {
        ...meta,
        content: content!,
      };
    })
  );

  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const metadata = metadataRegistry.find(a => a.slug === slug);

  if (!metadata) return null;

  const content = await loadArticleContent(slug);

  if (!content) return null;

  return {
    ...metadata,
    content,
  };
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(a => a.category === category);
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(a => a.tags.includes(tag));
}
