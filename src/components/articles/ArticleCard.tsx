import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  rank?: number;
  variant?: "default" | "compact" | "horizontal";
}

export function ArticleCard({ article, rank, variant = "default" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="flex gap-4 p-4 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] hover:border-[#CCCAC3] hover:shadow-md transition-all group bg-white dark:bg-[#1a1a2e]"
      >
        <div className="relative w-40 h-28 rounded overflow-hidden shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="text-[0.68rem] font-bold tracking-wider uppercase text-[#C01D35] mb-1">
            {article.category.name}
          </div>
          <h3 className="font-serif text-lg font-bold leading-snug text-[#1A1A1A] dark:text-white line-clamp-2 group-hover:text-[#C01D35] transition-colors mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] line-clamp-2 mb-2">
            {article.excerpt}
          </p>
          <div className="text-xs text-[#7A7A7A]">
            {article.author.name} ·{" "}
            {formatDistanceToNow(new Date(article.publishedAt), {
              addSuffix: true,
              locale: fr,
            })}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative w-full aspect-[16/10] rounded overflow-hidden mb-3">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      {rank !== undefined && (
        <div className="text-[0.68rem] font-bold tracking-wider uppercase text-[#C01D35] mb-1.5">
          #{rank}
        </div>
      )}
      <div className="text-[0.68rem] font-semibold tracking-wider uppercase text-[#7A7A7A] dark:text-[#a0a0b0] mb-1">
        {article.category.name}
      </div>
      <h3 className="font-serif text-base font-bold leading-snug text-[#1A1A1A] dark:text-white line-clamp-3 mb-2 group-hover:text-[#C01D35] transition-colors">
        {article.title}
      </h3>
      <div className="text-xs text-[#7A7A7A]">
        {formatDistanceToNow(new Date(article.publishedAt), {
          addSuffix: true,
          locale: fr,
        })}
        {" · "}
        {article.readTime} min
      </div>
    </Link>
  );
}
