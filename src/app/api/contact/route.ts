import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    console.log("Contact message received:", {
      timestamp: new Date().toISOString(),
      ...validated,
    });

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues[0].message;
      return NextResponse.json(
        { success: false, message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 }
    );
  }
}
