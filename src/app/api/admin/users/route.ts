import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { role: { in: ["EDITOR", "AUTHOR", "ADMIN", "SUPER_ADMIN"] } },
      select: { id: true, name: true, email: true, avatar: true, role: true, bio: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
