import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Eye, Share2, Bookmark, ArrowLeft } from "lucide-react";
import { getArticleBySlugFromDb, getRelatedArticlesFromDb, getAllPublishedSlugs } from "@/lib/db/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { CommentSection } from "@/components/articles/CommentSection";
import { ReadingProgress } from "@/components/articles/ReadingProgress";
import { FloatingShare } from "@/components/articles/FloatingShare";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugFromDb(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlugFromDb(slug);

  if (!article) notFound();

  const related = await getRelatedArticlesFromDb(article.id, article.category.id, 3);

  const articleUrl = `${siteConfig.url}/article/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: [
      {
        "@type": "Person",
        name: article.author.name,
        url: `${siteConfig.url}/author/${article.author.slug}`,
        jobTitle: article.author.role,
      },
    ],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    articleSection: article.category.name,
    keywords: article.tags.join(", "),
    wordCount: article.body.split(/\s+/).length,
    isAccessibleForFree: true,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: article.category.name, item: `${siteConfig.url}/category/${article.categorySlug}` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <FloatingShare title={article.title} url={articleUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article>
        <div className="py-12 lg:py-16 bg-white dark:bg-[#1a1a2e]">
          <div className="max-w-[820px] mx-auto px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#7A7A7A] hover:text-[#C01D35] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l&apos;accueil
            </Link>

            <span className="inline-block text-[#C01D35] text-xs font-bold tracking-wider uppercase mb-4">
              {article.category.name}
            </span>

            <h1 className="font-serif text-3xl lg:text-[2.8rem] font-extrabold leading-[1.1] text-[#0D1B2A] dark:text-white mb-6">
              {article.title}
            </h1>

            <p className="font-body text-xl text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed mb-8 italic">
              {article.subtitle}
            </p>

            <div className="flex items-center justify-between py-5 border-t border-b border-[#DEDBD4] dark:border-[#2a2a3e] mb-10">
              <Link
                href={`/author/${article.author.slug}`}
                className="flex items-center gap-3 group"
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                    quality={100}
                    unoptimized
                  />
                </div>
                <div>
                  <div className="font-bold text-sm group-hover:text-[#C01D35] transition-colors">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-[#7A7A7A]">
                    <time dateTime={article.publishedAt}>
                      {format(new Date(article.publishedAt), "d MMMM yyyy", { locale: fr })}
                    </time>
                    {" · "}
                    {article.readTime} min de lecture
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#7A7A7A]">
                  <Eye className="w-3.5 h-3.5" />
                  {article.views.toLocaleString("fr-FR")}
                </div>
                <button
                  className="w-9 h-9 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-full flex items-center justify-center hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e] transition-all"
                  aria-label="Partager"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-full flex items-center justify-center hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e] transition-all"
                  aria-label="Sauvegarder"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-12 rounded-lg overflow-hidden">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="820px"
                />
              </div>
              {article.imageCaption && (
                <p className="text-xs text-[#7A7A7A] mt-2 italic">
                  {article.imageCaption}
                </p>
              )}
            </div>

            <div
              className="article-body font-body text-lg leading-[1.8] text-[#1A1A1A] dark:text-[#d0d0d8]"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#DEDBD4] dark:border-[#2a2a3e]">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="text-xs font-medium text-[#4A4A4A] dark:text-[#a0a0b0] bg-[#F2F1EE] dark:bg-[#2a2a3e] px-3 py-1.5 rounded-full hover:bg-[#DEDBD4] dark:hover:bg-[#3a3a4e] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <CommentSection articleId={article.id} articleSlug={article.slug} />

            {/* Author bio */}
            <div className="mt-12 p-6 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] bg-[#F2F1EE] dark:bg-[#12121e]">
              <Link
                href={`/author/${article.author.slug}`}
                className="flex items-start gap-4 group"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <div className="font-serif font-bold text-lg group-hover:text-[#C01D35] transition-colors">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-[#C01D35] font-semibold uppercase tracking-wider mb-2">
                    {article.author.role}
                  </div>
                  <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed">
                    {article.author.bio}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="py-12 bg-[#F2F1EE] dark:bg-[#0f0f1a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center mb-6 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
                <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white flex items-center gap-2.5">
                  <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
                  Articles similaires
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
