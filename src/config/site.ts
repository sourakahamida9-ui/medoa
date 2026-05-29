import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Ligne Rouge",
  description:
    "Plateforme d'information internationale indépendante. Actualité, Politique, Économie, Sport, Société, International, Culture, Technologie.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ligne-rouge.vercel.app",
  locale: "fr",
  locales: ["fr", "en"],
};

export const navCategories = [
  { name: "Actualité", slug: "actualite" },
  { name: "Politique", slug: "politique" },
  { name: "International", slug: "international" },
  { name: "Économie", slug: "economie" },
  { name: "Technologie", slug: "technologie" },
  { name: "Sport", slug: "sport" },
  { name: "Société", slug: "societe" },
  { name: "Culture", slug: "culture" },
] as const;
