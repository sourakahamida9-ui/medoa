import { prisma } from "@/lib/prisma";
import type { Article as ArticleType } from "@/types";

function authorSlug(name: string | null) {
  return (name || "redaction")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(a: any): ArticleType {
  const slug = authorSlug(a.users?.name);
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle || "",
    excerpt: a.excerpt,
    body: a.body,
    category: a.categories
      ? { id: a.categories.id, name: a.categories.name, slug: a.categories.slug, description: a.categories.description || "", color: a.categories.color }
      : { id: "", name: "Non classé", slug: "non-classe", description: "", color: "#6B7280" },
    categorySlug: a.categories?.slug || "non-classe",
    author: {
      id: a.users?.id || "",
      name: a.users?.name || "Rédaction",
      slug,
      bio: a.users?.bio || "",
      avatar: a.users?.avatar || "/images/team/default-avatar.jpg",
      role: a.users?.role || "AUTHOR",
    },
    authorSlug: slug,
    image: a.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
    imageCaption: a.imageCaption || undefined,
    publishedAt: (a.publishedAt || a.createdAt).toISOString(),
    readTime: a.readTime,
    views: a.views,
    status: a.status === "PUBLISHED" ? "published" : a.status === "DRAFT" ? "draft" : "scheduled",
    featured: a.featured,
    breaking: a.breaking,
    tags: (a.article_tags || []).map((at: { tags?: { name: string } }) => at.tags?.name || "").filter(Boolean),
    locale: (a.locale || "fr") as "fr" | "en",
  };
}

const select = {
  id: true, slug: true, title: true, subtitle: true, excerpt: true, body: true,
  image: true, imageCaption: true, status: true, featured: true, breaking: true,
  readTime: true, views: true, locale: true, publishedAt: true, createdAt: true, updatedAt: true,
  authorId: true, categoryId: true,
  users: { select: { id: true, name: true, avatar: true, bio: true, role: true } },
  categories: { select: { id: true, name: true, slug: true, description: true, color: true } },
  article_tags: { select: { tags: { select: { id: true, name: true, slug: true } } } },
};

export async function getPublishedArticles(limit = 50): Promise<ArticleType[]> {
  const rows = await prisma.article.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" }, take: limit, select });
  return rows.map(toArticle);
}

export async function getArticleBySlugFromDb(slug: string): Promise<ArticleType | null> {
  const row = await prisma.article.findUnique({ where: { slug }, select });
  return row ? toArticle(row) : null;
}

export async function getArticlesByCategoryFromDb(categorySlug: string, limit = 10): Promise<ArticleType[]> {
  const rows = await prisma.article.findMany({ where: { status: "PUBLISHED", categories: { slug: categorySlug } }, orderBy: { publishedAt: "desc" }, take: limit, select });
  return rows.map(toArticle);
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const rows = await prisma.article.findMany({ where: { status: "PUBLISHED" }, select: { slug: true } });
  return rows.map((a) => a.slug);
}

export async function getRelatedArticlesFromDb(articleId: string, categoryId: string, limit = 3): Promise<ArticleType[]> {
  const rows = await prisma.article.findMany({ where: { status: "PUBLISHED", categoryId, id: { not: articleId } }, orderBy: { publishedAt: "desc" }, take: limit, select });
  return rows.map(toArticle);
}

export async function searchArticlesInDb(query: string): Promise<ArticleType[]> {
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED", OR: [{ title: { contains: query } }, { excerpt: { contains: query } }, { body: { contains: query } }] },
    orderBy: { publishedAt: "desc" },
    take: 20,
    select,
  });
  return rows.map(toArticle);
}

export async function getFeaturedArticles(limit = 5): Promise<ArticleType[]> {
  const rows = await prisma.article.findMany({ where: { status: "PUBLISHED", featured: true }, orderBy: { publishedAt: "desc" }, take: limit, select });
  return rows.map(toArticle);
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function getUsersByRole(roles: string[]) {
  return prisma.user.findMany({ where: { role: { in: roles as ("READER" | "AUTHOR" | "EDITOR" | "ADMIN" | "SUPER_ADMIN")[] } } });
}

export async function getFirstAdminUser() {
  return prisma.user.findFirst({ where: { role: "ADMIN" }, orderBy: { createdAt: "asc" } });
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { order: "asc" } });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}
