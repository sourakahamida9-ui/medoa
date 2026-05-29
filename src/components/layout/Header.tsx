"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Search, Menu, X, Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";
import { SearchOverlay } from "./SearchOverlay";
import { navCategories } from "@/config/site";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <nav
        className="bg-white dark:bg-[#1a1a2e] border-b border-[#DEDBD4] dark:border-[#2a2a3e] sticky top-0 z-[200] h-16"
        role="navigation"
        aria-label="Menu principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-full gap-0 relative">
          <Logo />

          <div className="w-px h-7 bg-[#CCCAC3] dark:bg-[#3a3a4e] mx-5 shrink-0 hidden lg:block" aria-hidden="true" />

          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {navCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-[0.78rem] font-semibold tracking-wider uppercase text-[#4A4A4A] dark:text-[#a0a0b0] px-3 py-2 rounded transition-colors hover:text-[#0D1B2A] dark:hover:text-white hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e] whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e] text-[#4A4A4A] dark:text-[#a0a0b0]"
              aria-label="Changer le thème"
            >
              <Sun className="h-4 w-4 hidden dark:block" />
              <Moon className="h-4 w-4 dark:hidden" />
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 text-[0.8rem] font-medium text-[#4A4A4A] dark:text-[#a0a0b0] bg-[#F2F1EE] dark:bg-[#2a2a3e] border border-[#DEDBD4] dark:border-[#3a3a4e] px-3.5 py-[7px] rounded-full transition-all hover:border-[#CCCAC3] hover:text-[#1A1A1A] dark:hover:text-white"
              aria-label="Ouvrir la recherche"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Rechercher</span>
            </button>

            <button
              className="lg:hidden flex flex-col gap-[5px] p-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#1a1a2e] border-t border-[#DEDBD4] dark:border-[#2a2a3e] absolute left-0 right-0 top-16 z-50 shadow-lg">
            <div className="py-4 px-6 flex flex-col gap-1">
              {navCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider uppercase text-[#4A4A4A] dark:text-[#a0a0b0] px-3 py-3 rounded transition-colors hover:text-[#0D1B2A] dark:hover:text-white hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
