import { notFound } from "next/navigation";
import Image from "next/image";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getPublishedArticles } from "@/lib/db/articles";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

async function findAuthorBySlug(slug: string) {
  const users = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "AUTHOR", "EDITOR"] } },
  });
  return users.find((u: { name: string | null }) => {
    const userSlug = (u.name || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return userSlug === slug;
  });
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await findAuthorBySlug(slug);
  if (!author) return {};

  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio || undefined,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await findAuthorBySlug(slug);

  if (!author) notFound();

  const allPublished = await getPublishedArticles(100);
  const authorArticles = allPublished.filter((a) => a.author.id === author.id);

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
            <Image
              src={author.avatar || "/images/team/alassane-ibraima.jpg"}
              alt={author.name || "Rédaction"}
              fill
              className="object-cover"
              sizes="96px"
              quality={100}
              unoptimized
            />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-[#0D1B2A] dark:text-white mb-2">
              {author.name}
            </h1>
            <div className="text-sm text-[#C01D35] font-semibold uppercase tracking-wider mb-3">
              {author.role}
            </div>
            <p className="text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed max-w-2xl">
              {author.bio}
            </p>
          </div>
        </div>

        <div className="mb-6 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white flex items-center gap-2.5">
            <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
            Articles par {author.name} ({authorArticles.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
