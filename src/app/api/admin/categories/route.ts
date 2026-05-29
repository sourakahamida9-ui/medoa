import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, color } = await req.json();
    if (!name) throw new Error("Name is required");

    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const category = await prisma.category.create({
      data: { name, slug, color: color || "#C01D35", order: 0 },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, color } = await req.json();
    if (!id || !name) throw new Error("ID and name are required");

    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const category = await prisma.category.update({
      where: { id },
      data: { name, slug, color: color || "#C01D35" },
    });
    return NextResponse.json(category);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
