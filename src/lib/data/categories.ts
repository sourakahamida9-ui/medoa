import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Actualité",
    slug: "actualite",
    description: "Les dernières informations en temps réel",
    color: "#C01D35",
  },
  {
    id: "cat-2",
    name: "Politique",
    slug: "politique",
    description: "Analyses politiques et institutionnelles",
    color: "#1B4F72",
  },
  {
    id: "cat-3",
    name: "International",
    slug: "international",
    description: "L'actualité mondiale décryptée",
    color: "#0E6655",
  },
  {
    id: "cat-4",
    name: "Économie",
    slug: "economie",
    description: "Marchés, entreprises et finances",
    color: "#B7950B",
  },
  {
    id: "cat-5",
    name: "Technologie",
    slug: "technologie",
    description: "Innovation, numérique et sciences",
    color: "#6C3483",
  },
  {
    id: "cat-6",
    name: "Sport",
    slug: "sport",
    description: "Résultats, analyses et reportages sportifs",
    color: "#D35400",
  },
  {
    id: "cat-7",
    name: "Société",
    slug: "societe",
    description: "Société, éducation et environnement",
    color: "#2874A6",
  },
  {
    id: "cat-8",
    name: "Culture",
    slug: "culture",
    description: "Arts, musique, cinéma et littérature",
    color: "#A04000",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
