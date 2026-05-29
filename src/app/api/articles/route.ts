import { NextRequest, NextResponse } from "next/server";
import { getPublishedArticles, getArticlesByCategoryFromDb } from "@/lib/db/articles";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    let all;
    if (category) {
      all = await getArticlesByCategoryFromDb(category, 100);
    } else {
      all = await getPublishedArticles(100);
    }

    const total = all.length;
    const data = all.slice(offset, offset + limit);

    return NextResponse.json({
      articles: data,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
