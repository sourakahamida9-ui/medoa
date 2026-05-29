import { NextResponse, NextRequest } from "next/server";
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

export async function POST(req: NextRequest) {
  try {
    const { name, email, role, avatar } = await req.json();
    if (!name || !email) throw new Error("Name and email are required");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: role?.toUpperCase() || "AUTHOR",
        avatar: avatar || null,
      },
      select: { id: true, name: true, email: true, avatar: true, role: true },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, email, role, avatar } = await req.json();
    if (!id) throw new Error("ID is required");

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role: role.toUpperCase() }),
        ...(avatar !== undefined && { avatar }),
      },
      select: { id: true, name: true, email: true, avatar: true, role: true },
    });
    return NextResponse.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
