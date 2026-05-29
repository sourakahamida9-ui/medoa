"use client";

import Link from "next/link";

export function Logo({ variant = "default" }: { variant?: "default" | "footer" | "white" }) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Ligne Rouge — Accueil">
      <svg
        width="32"
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="4" fill="#C01D35" />
        <path
          d="M8 10h4v14h8v4H8V10z"
          fill="white"
        />
        <path
          d="M22 10h4.5c2 0 3.5.5 4.5 1.5s1.5 2.3 1.5 4c0 1.5-.4 2.7-1.2 3.6-.8.9-1.9 1.4-3.3 1.5L32 28h-4.5l-3.5-7H26v-4h-4V10z"
          fill="white"
        />
      </svg>
      <span
        className={`font-serif text-xl font-bold tracking-tight ${
          variant === "white" ? "text-white" : "text-[#0D1B2A] dark:text-white"
        }`}
      >
        Ligne<span className="text-[#C01D35]">Rouge</span>
      </span>
    </Link>
  );
}
