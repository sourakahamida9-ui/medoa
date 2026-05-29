import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true, slug: true, title: true, subtitle: true, excerpt: true, body: true,
        image: true, imageCaption: true, status: true, featured: true, breaking: true,
        readTime: true, views: true, publishedAt: true, createdAt: true, updatedAt: true,
        authorId: true, categoryId: true,
        users: { select: { id: true, name: true, avatar: true } },
        categories: { select: { id: true, name: true, slug: true, color: true } },
        article_tags: { select: { tags: { select: { id: true, name: true, slug: true } } } },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, subtitle, excerpt, content, categoryId, image, imageCaption, status, featured, breaking } = body;

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) {
      updateData.body = content;
      const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
      updateData.readTime = Math.max(1, Math.ceil(wordCount / 200));
    }
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (image !== undefined) updateData.image = image;
    if (imageCaption !== undefined) updateData.imageCaption = imageCaption;
    if (featured !== undefined) updateData.featured = featured;
    if (breaking !== undefined) updateData.breaking = breaking;

    if (status !== undefined) {
      updateData.status = status === "published" ? "PUBLISHED" : status === "draft" ? "DRAFT" : status.toUpperCase();
      if (status === "published") {
        const existing = await prisma.article.findUnique({ where: { id }, select: { publishedAt: true } });
        if (existing && !existing.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
      select: {
        id: true, slug: true, title: true, status: true,
        users: { select: { id: true, name: true } },
        categories: { select: { id: true, name: true, slug: true } },
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
