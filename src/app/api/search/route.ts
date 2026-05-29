import { NextRequest, NextResponse } from "next/server";
import { searchArticlesInDb } from "@/lib/db/articles";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ articles: [], total: 0, query: query || "" });
  }

  const results = await searchArticlesInDb(query);

  return NextResponse.json({
    articles: results,
    total: results.length,
    query,
  });
}
