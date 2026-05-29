import { NextResponse } from "next/server";

const breakingAlerts = [
  {
    id: "brk-1",
    message: "ALERTE — Sommet extraordinaire de l'Union Africaine à Addis-Abeba : les chefs d'État réunis pour discuter de la crise sécuritaire au Sahel",
    url: "/article/nouveaux-enjeux-geopolitiques-afrique-ouest",
    priority: "high" as const,
    active: true,
    createdAt: "2026-05-14T08:00:00Z",
  },
];

export async function GET() {
  const active = breakingAlerts.filter((a) => a.active);
  return NextResponse.json(active);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, url, priority } = body;

    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const alert = {
      id: `brk-${Date.now()}`,
      message,
      url: url || null,
      priority: priority || "medium",
      active: true,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, alert });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
