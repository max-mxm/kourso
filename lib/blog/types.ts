export type BlogCategory =
  | 'fundamentals'      // Teal → Violet
  | 'architecture'      // Blue → Cyan
  | 'testing'           // Orange → Amber
  | 'best-practices'    // Purple → Pink
  | 'advanced';         // Red → Rose

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;        // ISO 8601
  updatedAt?: string;
  readingTime: number;         // minutes
  category: BlogCategory;
  tags: string[];
  featured?: boolean;
  tableOfContents: TableOfContentsItem[];

  // SEO
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface Article extends ArticleMetadata {
  content: React.ComponentType;
}
