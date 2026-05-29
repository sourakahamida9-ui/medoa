import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || user?.id;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const bookmarks = await prisma.bookmarks.findMany({
      where: { userId },
      select: {
        id: true, createdAt: true,
        articles: { select: { id: true, slug: true, title: true, excerpt: true, image: true } },
      },
    });

    return NextResponse.json({ favorites: bookmarks, userId });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { articleId, action } = body;

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    if (!articleId) {
      return NextResponse.json({ error: "articleId is required" }, { status: 400 });
    }

    if (action === "remove") {
      await prisma.bookmarks.deleteMany({ where: { userId: user.id, articleId } });
    } else {
      await prisma.bookmarks.upsert({
        where: { userId_articleId: { userId: user.id, articleId } },
        create: { userId: user.id, articleId },
        update: {},
      });
    }

    return NextResponse.json({ success: true, action: action || "add", articleId, userId: user.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
