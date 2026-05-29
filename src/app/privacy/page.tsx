import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Ligne Rouge.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-[820px] mx-auto px-6">
        <h1 className="font-serif text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] dark:text-white mb-8">
          Politique de confidentialité
        </h1>

        <div className="font-body text-base leading-relaxed text-[#4A4A4A] dark:text-[#a0a0b0] space-y-6">
          <p>
            <em>Dernière mise à jour : Mai 2026</em>
          </p>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white">
            Collecte des données
          </h2>
          <p>
            Ligne Rouge collecte uniquement les données strictement nécessaires
            au fonctionnement du service : adresse email (newsletter), données de
            navigation anonymisées (analytics), et informations fournies via le
            formulaire de contact.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Utilisation des données
          </h2>
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>L&apos;envoi de la newsletter (avec votre consentement)</li>
            <li>L&apos;amélioration de nos services</li>
            <li>Le traitement de vos demandes via le formulaire de contact</li>
            <li>L&apos;analyse statistique anonymisée de la fréquentation</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Cookies
          </h2>
          <p>
            Ce site utilise des cookies techniques nécessaires au bon
            fonctionnement du service et des cookies d&apos;analyse anonymisés
            pour mesurer l&apos;audience. Aucun cookie publicitaire n&apos;est
            utilisé sans votre consentement explicite.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Vos droits
          </h2>
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés, vous
            disposez d&apos;un droit d&apos;accès, de rectification, de
            suppression et de portabilité de vos données. Pour exercer ces
            droits, contactez-nous à : privacy@lignerouge.media
          </p>

          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white pt-4">
            Sécurité
          </h2>
          <p>
            Nous mettons en œuvre les mesures techniques et organisationnelles
            appropriées pour garantir la sécurité de vos données personnelles
            contre tout accès, modification ou divulgation non autorisé.
          </p>
        </div>
      </div>
    </div>
  );
}
