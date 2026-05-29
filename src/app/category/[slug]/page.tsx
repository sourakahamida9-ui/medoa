import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getArticlesByCategoryFromDb } from "@/lib/db/articles";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};

  return {
    title: `${category.name} — Actualités et analyses`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Ligne Rouge`,
      description: category.description || undefined,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) notFound();

  const categoryArticles = await getArticlesByCategoryFromDb(slug, 50);

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div
            className="w-12 h-1 rounded mb-4"
            style={{ backgroundColor: category.color }}
          />
          <h1 className="font-serif text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] dark:text-white mb-3">
            {category.name}
          </h1>
          <p className="text-lg text-[#4A4A4A] dark:text-[#a0a0b0]">
            {category.description}
          </p>
        </div>

        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#7A7A7A] text-lg">
              Aucun article dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
