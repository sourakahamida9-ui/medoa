export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string;
  category: Category;
  categorySlug: string;
  author: Author;
  authorSlug: string;
  image: string;
  imageCaption?: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  views: number;
  status: "published" | "draft" | "scheduled";
  featured: boolean;
  breaking: boolean;
  tags: string[];
  locale: "fr" | "en";
  relatedSlugs?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
  articleCount?: number;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  role: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Comment {
  id: string;
  articleSlug: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  parentId?: string;
  approved: boolean;
  replies?: Comment[];
}

export interface SearchResult {
  articles: Article[];
  total: number;
  query: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  locale: string;
  locales: string[];
}
