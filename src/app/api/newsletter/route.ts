import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    newsletterSchema.parse(body);

    return NextResponse.json({
      success: true,
      message: "Inscription réussie ! Merci de votre intérêt.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
