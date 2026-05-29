import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { generateSlug, makeUniqueSlug } from "@/lib/slug";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const where = status ? { status: status.toUpperCase() as "DRAFT" | "REVIEW" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED" } : {};

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, slug: true, title: true, status: true, featured: true,
          breaking: true, views: true, createdAt: true, publishedAt: true,
          users: { select: { id: true, name: true, avatar: true } },
          categories: { select: { id: true, name: true, slug: true, color: true } },
        },
      }),
      prisma.article.count({ where }),
    ]);

    const normalized = articles.map((a) => ({
      ...a,
      author: a.users,
      category: a.categories,
    }));

    return NextResponse.json({ articles: normalized, total, page, limit });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, excerpt, content, categoryId, authorId, image, imageCaption, status, featured, breaking, tags } = body;

    if (!title || !excerpt || !content || !categoryId || !authorId) {
      return NextResponse.json(
        { error: "title, excerpt, content, categoryId, and authorId are required" },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(title);
    const existing = await prisma.article.findUnique({ where: { slug: baseSlug }, select: { slug: true } });
    const slug = makeUniqueSlug(baseSlug, !!existing);

    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        subtitle: subtitle || null,
        excerpt,
        body: content,
        image: image || null,
        imageCaption: imageCaption || null,
        status: status === "published" ? "PUBLISHED" : "DRAFT",
        featured: featured || false,
        breaking: breaking || false,
        readTime,
        publishedAt: status === "published" ? new Date() : null,
        authorId,
        categoryId,
        updatedAt: new Date(),
      },
      select: {
        id: true, slug: true, title: true, status: true,
        users: { select: { id: true, name: true } },
        categories: { select: { id: true, name: true, slug: true } },
      },
    });

    if (tags && Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        const tagSlug = tagName.toLowerCase().normalize("NFD")
          .replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          create: { name: tagName, slug: tagSlug },
          update: {},
        });
        await prisma.articleTag.create({ data: { articleId: article.id, tagId: tag.id } });
      }
    }

    revalidatePath("/");
    revalidatePath(`/article/${slug}`);
    revalidatePath("/admin");

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
