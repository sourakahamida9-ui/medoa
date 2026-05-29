import type { Author } from "@/types";

export const authors: Author[] = [
  {
    id: "author-1",
    name: "Alassane Ibraima",
    slug: "alassane-ibraima",
    bio: "Journaliste d'investigation et architecte de données, originaire de Kouandé. Après un parcours académique marqué par l'excellence au Collège Saint-Augustin de Natitingou, il s'est spécialisé dans le traitement de l'information numérique. Aujourd'hui rédacteur en chef de Ligne Rouge, il fusionne rigueur journalistique et maîtrise technologique pour offrir une information vérifiée, structurée et d'intérêt public.",
    avatar: "/images/team/alassane-ibraima.jpg",
    role: "Rédacteur en Chef",
    social: {
      twitter: "https://twitter.com/lignerouge",
      linkedin: "https://linkedin.com/in/lignerouge",
    },
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
