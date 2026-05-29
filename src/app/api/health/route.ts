import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await prisma.$queryRawUnsafe("SELECT 1 AS ok");
    return NextResponse.json({
      status: "connected",
      database: "supabase",
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "disconnected", error: message },
      { status: 500 }
    );
  }
}
