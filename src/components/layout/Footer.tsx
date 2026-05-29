"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { navCategories } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1a1a2e] border-t border-[#DEDBD4] dark:border-[#2a2a3e] pt-20 pb-10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-5">
              <Logo variant="footer" />
            </div>
            <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] mb-6 leading-relaxed">
              Plateforme d&apos;information internationale indépendante dédiée à
              l&apos;actualité rigoureuse et à l&apos;analyse approfondie.
            </p>
            <div className="flex gap-3">
              <SocialButton label="Twitter" icon="𝕏" />
              <SocialButton label="Facebook" icon="f" />
              <SocialButton label="LinkedIn" icon="in" />
              <SocialButton label="YouTube" icon="▶" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#0D1B2A] dark:text-white mb-6">
              Rubriques
            </h3>
            <nav className="flex flex-col gap-3">
              {navCategories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] hover:text-[#C01D35] transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#0D1B2A] dark:text-white mb-6">
              À propos
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] hover:text-[#C01D35] transition-colors">
                Qui sommes-nous
              </Link>
              <Link href="/team" className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] hover:text-[#C01D35] transition-colors">
                Notre équipe
              </Link>
              <Link href="/ethics" className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] hover:text-[#C01D35] transition-colors">
                Charte éthique
              </Link>
              <Link href="/contact" className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] hover:text-[#C01D35] transition-colors">
                Contact
              </Link>
              <Link href="/legal" className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] hover:text-[#C01D35] transition-colors">
                Mentions légales
              </Link>
              <Link href="/privacy" className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] hover:text-[#C01D35] transition-colors">
                Confidentialité
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#0D1B2A] dark:text-white mb-6">
              Newsletter
            </h3>
            <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] mb-4">
              Recevez chaque matin les informations essentielles.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 text-sm px-3 py-2 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#C01D35] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#A01728] transition-colors"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#DEDBD4] dark:border-[#2a2a3e] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7A7A7A]">
          <p>© {new Date().getFullYear()} Ligne Rouge. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/legal" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/privacy" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({ label, icon }: { label: string; icon: string }) {
  return (
    <button
      className="w-9 h-9 rounded-full bg-[#F2F1EE] dark:bg-[#2a2a3e] flex items-center justify-center text-sm text-[#0D1B2A] dark:text-[#a0a0b0] hover:bg-[#0D1B2A] hover:text-white dark:hover:bg-[#C01D35] transition-all"
      aria-label={label}
    >
      {icon}
    </button>
  );
}
