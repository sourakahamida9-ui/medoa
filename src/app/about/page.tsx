import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez Ligne Rouge, votre plateforme d'information internationale indépendante.",
};

export default async function AboutPage() {
  const editor = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  const editorSlug = editor
    ? (editor.name || "redaction")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : "redaction";

  return (
    <div className="py-10 lg:py-16">
      <div className="max-w-[820px] mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] dark:text-white mb-6">
          À propos de Ligne Rouge
        </h1>

        <div className="font-body text-base sm:text-lg leading-relaxed text-[#4A4A4A] dark:text-[#a0a0b0] space-y-6 mb-16">
          <p>
            <strong className="text-[#0D1B2A] dark:text-white">Ligne Rouge</strong>{" "}
            est une plateforme d&apos;information internationale indépendante, fondée
            avec la conviction que le journalisme de qualité est essentiel à la
            démocratie.
          </p>
          <p>
            Dirigée par un rédacteur en chef passionné et rigoureux, Ligne Rouge
            couvre l&apos;actualité politique, économique, technologique, culturelle et
            sportive avec rigueur et indépendance.
          </p>
          <p>
            Nous nous engageons à offrir une information fiable, vérifiée et
            accessible à tous. Notre approche éditoriale privilégie l&apos;analyse
            approfondie, le décryptage et la mise en perspective.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Notre mission
          </h2>
          <p>
            Informer, analyser et décrypter l&apos;actualité internationale avec une
            attention particulière portée au continent africain et à ses enjeux dans
            un monde globalisé.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Nos valeurs
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Indépendance</strong> — Aucune pression politique ou économique
              n&apos;influence notre ligne éditoriale.
            </li>
            <li>
              <strong>Rigueur</strong> — Chaque information est vérifiée et sourcée
              avant publication.
            </li>
            <li>
              <strong>Diversité</strong> — Nous représentons la pluralité des points
              de vue et des voix.
            </li>
            <li>
              <strong>Innovation</strong> — Nous explorons de nouvelles formes
              narratives pour mieux informer.
            </li>
          </ul>
        </div>

        {editor && (
          <>
            <div className="mb-6 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white flex items-center gap-2.5">
                <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
                Le Rédacteur en Chef
              </h2>
            </div>

            <Link
              href={`/author/${editorSlug}`}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 sm:p-6 rounded-xl border border-[#DEDBD4] dark:border-[#2a2a3e] hover:border-[#C01D35] hover:shadow-md transition-all group"
            >
              <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={editor.avatar || "/images/team/alassane-ibraima.jpg"}
                  alt={editor.name || "Rédacteur"}
                  fill
                  className="object-cover"
                  sizes="128px"
                  quality={100}
                  unoptimized
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white group-hover:text-[#C01D35] transition-colors">
                  {editor.name}
                </h3>
                <div className="text-xs text-[#C01D35] font-bold uppercase tracking-wider mb-3">
                  Rédacteur en Chef
                </div>
                <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed">
                  {editor.bio}
                </p>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
