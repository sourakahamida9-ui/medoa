"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { Article } from "@/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/articles?limit=6")
      .then((r) => r.json())
      .then((data) => setLatestArticles(data.articles || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (submittedQuery.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(submittedQuery)}`)
      .then((r) => r.json())
      .then((data) => setResults(data.articles || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [submittedQuery]);

  const hasSearched = submittedQuery.length >= 2;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSubmittedQuery(query);
    }
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-[680px] mx-auto mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] dark:text-white mb-6 text-center">
            Rechercher
          </h1>

          <form onSubmit={handleSearch}>
            <div className="flex items-center border-2 border-[#CCCAC3] dark:border-[#3a3a4e] rounded-lg overflow-hidden transition-colors focus-within:border-[#0D1B2A] dark:focus-within:border-[#C01D35]">
              {loading ? (
                <Loader2 className="w-5 h-5 ml-4 text-[#7A7A7A] shrink-0 animate-spin" />
              ) : (
                <Search className="w-5 h-5 ml-4 text-[#7A7A7A] shrink-0" />
              )}
              <input
                type="text"
                placeholder="Rechercher un article, un sujet, un auteur..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border-none outline-none text-lg py-4 px-4 bg-transparent text-[#1A1A1A] dark:text-white placeholder:text-[#7A7A7A] font-sans"
                aria-label="Terme de recherche"
              />
              <button
                type="submit"
                className="bg-[#0D1B2A] dark:bg-[#C01D35] text-white px-6 py-4 font-semibold hover:bg-[#162233] dark:hover:bg-[#A01728] transition-colors"
              >
                Chercher
              </button>
            </div>
          </form>
        </div>

        {hasSearched ? (
          <>
            <div className="mb-6 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white">
                {results.length} résultat{results.length !== 1 ? "s" : ""} pour «{" "}
                {submittedQuery} »
              </h2>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-[#7A7A7A] mb-2">
                  Aucun résultat trouvé.
                </p>
                <p className="text-sm text-[#7A7A7A]">
                  Essayez d&apos;utiliser des termes différents ou plus généraux.
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-6 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white flex items-center gap-2.5">
                <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
                Derniers articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
