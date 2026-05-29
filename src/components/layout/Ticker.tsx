"use client";

import { useState, useEffect } from "react";

export function Ticker() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    async function loadHeadlines() {
      try {
        const res = await fetch("/api/articles?limit=5");
        if (res.ok) {
          const data = await res.json();
          if (data.articles && data.articles.length > 0) {
            setItems(data.articles.map((a: { title: string }) => a.title));
            return;
          }
        }
      } catch {
        // silent
      }
      setItems(["Bienvenue sur Ligne Rouge — Plateforme d'information internationale"]);
    }
    loadHeadlines();
  }, []);

  const doubled = [...items, ...items];

  if (items.length === 0) return null;

  return (
    <div
      className="bg-[#0D1B2A] h-10 flex items-center overflow-hidden relative z-[100]"
      role="marquee"
      aria-label="Actualités défilantes"
    >
      <div className="bg-[#C01D35] text-white text-[0.68rem] sm:text-[0.72rem] font-bold tracking-wider uppercase px-2.5 sm:px-3.5 py-1 whitespace-nowrap shrink-0 h-full flex items-center z-10">
        Flash Info
      </div>
      <div className="flex items-center w-full overflow-hidden flex-1 h-full">
        <div className="flex whitespace-nowrap animate-ticker hover:[animation-play-state:paused]">
          {doubled.map((title, i) => (
            <span
              key={i}
              className="text-[#E8E4DC] text-[0.75rem] sm:text-[0.8rem] font-medium px-6 sm:px-12 inline-flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-[#C01D35] rounded-full shrink-0" />
              {title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
