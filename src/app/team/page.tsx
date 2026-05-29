import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/db/articles";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notre Équipe",
  description:
    "Découvrez le rédacteur en chef de Ligne Rouge, dédié à l'information rigoureuse et indépendante.",
};

export default async function TeamPage() {
  const editor = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!editor) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[#7A7A7A]">Aucun rédacteur configuré.</p>
      </div>
    );
  }

  const allArticles = await getPublishedArticles(100);
  const editorArticles = allArticles.filter((a) => a.author.id === editor.id);

  const editorSlug = (editor.name || "redaction")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <div className="py-12 sm:py-16 bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#C01D35] text-xs font-bold tracking-[0.12em] uppercase mb-4">
            Rédaction
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D1B2A] dark:text-white leading-tight mb-6">
            Le Rédacteur en Chef
          </h1>
          <p className="text-base sm:text-lg text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed max-w-[600px] mx-auto">
            L&apos;homme derrière Ligne Rouge — rigueur journalistique et
            maîtrise technologique au service de l&apos;information publique.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start p-5 sm:p-8 rounded-xl border border-[#DEDBD4] dark:border-[#2a2a3e] bg-[#F2F1EE] dark:bg-[#12121e] mb-12">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden shrink-0 shadow-lg">
            <Image
              src={editor.avatar || "/images/team/alassane-ibraima.jpg"}
              alt={editor.name || "Rédacteur"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 224px"
              quality={100}
              priority
              unoptimized
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0D1B2A] dark:text-white mb-1">
              {editor.name}
            </h2>
            <span className="inline-block text-xs font-bold text-[#C01D35] uppercase tracking-wider mb-4">
              Rédacteur en Chef
            </span>
            <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed mb-6">
              {editor.bio}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm">
              <span className="font-bold text-[#0D1B2A] dark:text-white">
                {editorArticles.length}{" "}
                <span className="font-normal text-[#7A7A7A]">
                  article{editorArticles.length !== 1 ? "s" : ""} publiés
                </span>
              </span>
            </div>
          </div>
        </div>

        {editorArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
              <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white">
                Derniers articles
              </h2>
            </div>
            <div className="space-y-3">
              {editorArticles.slice(0, 5).map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e] hover:border-[#C01D35] transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[#C01D35] text-xs font-semibold uppercase tracking-wider">
                      {article.category.name}
                    </span>
                    <h3 className="font-semibold text-sm text-[#0D1B2A] dark:text-white truncate group-hover:text-[#C01D35] transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <span className="text-xs text-[#7A7A7A] ml-4 shrink-0">
                    {article.readTime} min
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center p-6 sm:p-8 rounded-lg bg-[#0D1B2A] text-white">
          <h2 className="font-serif text-xl font-bold mb-3">
            Contacter la rédaction
          </h2>
          <p className="text-sm text-white/70 mb-4 max-w-[400px] mx-auto">
            Pour toute question, proposition d&apos;article ou collaboration,
            n&apos;hésitez pas à nous écrire.
          </p>
          <a
            href="mailto:redaction@lignerouge.info"
            className="inline-block bg-[#C01D35] text-white text-sm font-bold px-6 py-3 rounded hover:bg-[#A01728] transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}
