import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const [dbArticles, dbCategories] = await Promise.all([
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, featured: true, updatedAt: true, publishedAt: true },
    }),
    prisma.category.findMany({ select: { slug: true } }),
  ]);

  const articleUrls = dbArticles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: article.featured ? 0.9 : 0.7,
  }));

  const categoryUrls = dbCategories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: baseUrl, changeFrequency: "hourly" as const, priority: 1.0 },
    { url: `${baseUrl}/search`, changeFrequency: "daily" as const, priority: 0.6 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/team`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/ethics`, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/legal`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.2 },
  ].map((page) => ({ ...page, lastModified: new Date() }));

  return [...staticPages, ...articleUrls, ...categoryUrls];
}
