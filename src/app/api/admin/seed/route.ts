import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/data/categories";
import { articles as localArticles } from "@/lib/data/articles";

export async function POST() {
  try {
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        create: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description ?? "",
          color: cat.color,
          updatedAt: new Date(),
        },
        update: { name: cat.name, description: cat.description ?? "", color: cat.color },
      });
    }

    let adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          email: process.env.ADMIN_EMAIL || "admin@lignerouge.local",
          name: "Admin",
          role: "ADMIN",
          updatedAt: new Date(),
        },
      });
    }

    const dbCategories = await prisma.category.findMany({ select: { id: true, slug: true } });
    const catMap = new Map(dbCategories.map((c) => [c.slug, c.id]));

    let seededCount = 0;
    for (const art of localArticles) {
      const categoryId = catMap.get(art.categorySlug);
      if (!categoryId) continue;

      const existing = await prisma.article.findUnique({ where: { slug: art.slug }, select: { slug: true } });
      if (existing) continue;

      await prisma.article.create({
        data: {
          slug: art.slug,
          title: art.title,
          subtitle: "",
          excerpt: art.excerpt,
          body: art.body,
          image: art.image || null,
          status: art.status === "published" ? "PUBLISHED" : "DRAFT",
          featured: art.featured,
          breaking: art.breaking,
          readTime: art.readTime,
          views: art.views,
          publishedAt: new Date(art.publishedAt),
          authorId: adminUser.id,
          categoryId,
          updatedAt: new Date(),
        },
      });
      seededCount++;
    }

    return NextResponse.json({
      success: true,
      categoriesSeeded: categories.length,
      articlesSeeded: seededCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
