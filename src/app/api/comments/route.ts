import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const PROFANITY_PATTERNS = [
  /\bspam\b/i,
  /\bscam\b/i,
  /https?:\/\/[^\s]+\.(xyz|tk|ml|ga|cf)\b/i,
];

function moderateContent(content: string): { approved: boolean; reason?: string } {
  if (content.length < 3) return { approved: false, reason: "Comment too short" };
  if (content.length > 2000) return { approved: false, reason: "Comment too long" };
  for (const pattern of PROFANITY_PATTERNS) {
    if (pattern.test(content)) return { approved: false, reason: "Content flagged" };
  }
  return { approved: true };
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { articleId, content, parentId } = body;

    if (!articleId || !content) {
      return NextResponse.json({ error: "articleId and content are required" }, { status: 400 });
    }
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const moderation = moderateContent(content);

    const comment = await prisma.comment.create({
      data: {
        articleId,
        authorId: user.id,
        content: content.trim(),
        parentId: parentId || null,
        approved: moderation.approved,
        flagged: !moderation.approved,
        updatedAt: new Date(),
      },
      select: {
        id: true, content: true, approved: true, createdAt: true,
        users: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json({
      success: true,
      comment,
      message: moderation.approved ? "Commentaire publié avec succès" : "Commentaire en attente de modération",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json({ error: "articleId is required" }, { status: 400 });
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { articleId, approved: true },
        orderBy: { createdAt: "desc" },
        select: {
          id: true, content: true, approved: true, createdAt: true, parentId: true,
          users: { select: { id: true, name: true, avatar: true } },
        },
      }),
      prisma.comment.count({ where: { articleId, approved: true } }),
    ]);

    return NextResponse.json({ comments, total, articleId });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
