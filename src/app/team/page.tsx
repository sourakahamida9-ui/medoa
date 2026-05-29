import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/db/articles";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notre Équipe",
  description:
    "Découvrez l'équipe de Ligne Rouge, dédiée à l'information rigoureuse et indépendante.",
};

export default async function TeamPage() {
  const teamMembers = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "EDITOR", "AUTHOR"] } },
    orderBy: [{ role: "asc" }, { name: "asc" }],
  });

  if (teamMembers.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[#7A7A7A]">Aucun membre d'équipe configuré.</p>
      </div>
    );
  }

  const allArticles = await getPublishedArticles(100);

  return (
    <div className="py-12 sm:py-16 bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#C01D35] text-xs font-bold tracking-[0.12em] uppercase mb-4">
            Rédaction
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D1B2A] dark:text-white leading-tight mb-6">
            Notre Équipe
          </h1>
          <p className="text-base sm:text-lg text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed max-w-[600px] mx-auto">
            Les professionnels derrière Ligne Rouge — rigueur journalistique et
            maîtrise technologique au service de l&apos;information publique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {teamMembers.map((member) => {
            const memberArticles = allArticles.filter((a) => a.author.id === member.id);
            const roleLabel = member.role === "ADMIN" ? "Rédacteur en Chef" : member.role === "EDITOR" ? "Éditeur" : "Auteur";

            return (
              <div key={member.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start p-5 sm:p-6 rounded-xl border border-[#DEDBD4] dark:border-[#2a2a3e] bg-[#F2F1EE] dark:bg-[#12121e] hover:border-[#C01D35] transition-all">
                <div className="relative w-40 h-40 sm:w-36 sm:h-36 rounded-xl overflow-hidden shrink-0 shadow-lg bg-[#DEDBD4] dark:bg-[#2a2a3e]">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name || "Membre"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 160px, 144px"
                      quality={100}
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#7A7A7A]">
                      {(member.name || "?").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#0D1B2A] dark:text-white mb-1">
                    {member.name}
                  </h2>
                  <span className="inline-block text-xs font-bold text-[#C01D35] uppercase tracking-wider mb-3">
                    {roleLabel}
                  </span>
                  <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed mb-4 line-clamp-3">
                    {member.bio || "Contributeur de Ligne Rouge"}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
                    <span className="font-bold text-[#0D1B2A] dark:text-white">
                      {memberArticles.length}{" "}
                      <span className="font-normal text-[#7A7A7A]">
                        article{memberArticles.length !== 1 ? "s" : ""}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {allArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
              <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white">
                Derniers articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allArticles.slice(0, 6).map((article) => (
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
