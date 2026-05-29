"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  category: { name: string };
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleOpen = useCallback(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    handleOpen();
  }, [handleOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.articles || []);
        }
      } catch {
        // silent
      }
      setSearching(false);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-[#0D1B2A]/85 z-[500] flex items-start justify-center pt-20 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Recherche d'articles"
    >
      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg p-6 w-full max-w-[680px] mx-6 shadow-2xl">
        <div className="flex items-center border-2 border-[#CCCAC3] dark:border-[#3a3a4e] rounded overflow-hidden transition-colors focus-within:border-[#0D1B2A] dark:focus-within:border-[#C01D35]">
          {searching ? (
            <Loader2 className="w-5 h-5 ml-4 text-[#7A7A7A] shrink-0 animate-spin" />
          ) : (
            <Search className="w-5 h-5 ml-4 text-[#7A7A7A] shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un article, un sujet..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-none outline-none text-lg font-sans py-3 px-4 bg-transparent text-[#1A1A1A] dark:text-white placeholder:text-[#7A7A7A]"
            aria-label="Terme de recherche"
          />
        </div>

        <button
          onClick={handleClose}
          className="text-[#7A7A7A] text-sm mt-3.5 flex items-center gap-1.5 hover:text-[#1A1A1A] dark:hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" /> Fermer la recherche
        </button>

        {results.length > 0 && (
          <div className="mt-5 flex flex-col gap-3 max-h-80 overflow-y-auto">
            {results.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                onClick={handleClose}
                className="p-3 rounded border border-[#DEDBD4] dark:border-[#2a2a3e] hover:border-[#CCCAC3] hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e] transition-all"
              >
                <div className="text-[0.7rem] font-bold tracking-wider uppercase text-[#C01D35] mb-1">
                  {article.category.name}
                </div>
                <div className="font-serif font-semibold text-[#1A1A1A] dark:text-white leading-snug">
                  {article.title}
                </div>
              </Link>
            ))}
          </div>
        )}

        {query.length >= 2 && !searching && results.length === 0 && (
          <p className="mt-5 text-[#7A7A7A] text-center py-4">
            Aucun résultat pour « {query} »
          </p>
        )}
      </div>
    </div>
  );
}
