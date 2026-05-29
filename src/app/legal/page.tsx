import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Ligne Rouge.",
};

export default function LegalPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-[820px] mx-auto px-6">
        <h1 className="font-serif text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] dark:text-white mb-8">
          Mentions légales
        </h1>

        <div className="font-body text-base leading-relaxed text-[#4A4A4A] dark:text-[#a0a0b0] space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white">
            Éditeur
          </h2>
          <p>
            Le site Ligne Rouge est édité par Ligne Rouge Media, société de presse
            en ligne spécialisée dans l&apos;information internationale.
          </p>
          <p>
            <strong>Siège social :</strong> Dakar, Sénégal<br />
            <strong>Email :</strong> contact@lignerouge.media
          </p>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Directeur de publication
          </h2>
          <p>Le directeur de la publication est le représentant légal de Ligne Rouge Media.</p>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Hébergement
          </h2>
          <p>
            Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, États-Unis.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu de ce site (articles, photographies,
            illustrations, logos, marques) est protégé par le droit d&apos;auteur.
            Toute reproduction, même partielle, est soumise à autorisation
            préalable.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Responsabilité
          </h2>
          <p>
            Ligne Rouge s&apos;efforce d&apos;assurer l&apos;exactitude des
            informations publiées. Toutefois, nous ne pouvons garantir
            l&apos;absence d&apos;erreurs ou d&apos;omissions.
          </p>
        </div>
      </div>
    </div>
  );
}
