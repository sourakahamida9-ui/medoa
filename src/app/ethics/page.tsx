import type { Metadata } from "next";
import { Shield, CheckCircle, AlertTriangle, FileText, Scale, Users } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Charte Éthique & Déontologie",
  description:
    "Notre engagement en matière de déontologie journalistique, de vérification des faits et de politiques de correction.",
};

const principles = [
  {
    icon: Shield,
    title: "Indépendance éditoriale",
    description:
      "Ligne Rouge garantit une indépendance totale vis-à-vis de tout pouvoir politique, économique ou institutionnel. Nos choix éditoriaux sont guidés exclusivement par l'intérêt public et la recherche de la vérité.",
  },
  {
    icon: CheckCircle,
    title: "Vérification des faits",
    description:
      "Chaque information publiée fait l'objet d'une vérification rigoureuse. Nous appliquons la règle des sources multiples : au minimum deux sources indépendantes sont requises avant publication. Notre cellule de fact-checking opère en continu.",
  },
  {
    icon: AlertTriangle,
    title: "Politique de correction",
    description:
      "Nous reconnaissons le droit à l'erreur. Toute inexactitude signalée fait l'objet d'un examen immédiat. Les corrections sont publiées de manière transparente avec la mention de la modification, la date et la raison de la correction.",
  },
  {
    icon: FileText,
    title: "Transparence des sources",
    description:
      "Nous identifions systématiquement nos sources, sauf lorsque leur protection est nécessaire (lanceurs d'alerte, sources en danger). Dans ce cas, la rédaction en chef assume la responsabilité de l'information publiée.",
  },
  {
    icon: Scale,
    title: "Équilibre & pluralisme",
    description:
      "Nous nous engageons à présenter les différents points de vue sur chaque sujet d'actualité. Le droit de réponse est garanti à toute personne ou organisation mise en cause dans nos publications.",
  },
  {
    icon: Users,
    title: "Respect des personnes",
    description:
      "La dignité humaine est au cœur de notre pratique journalistique. Nous respectons la vie privée, la présomption d'innocence et veillons à ne jamais contribuer à la stigmatisation de groupes ou d'individus.",
  },
];

const factCheckProcess = [
  {
    step: "01",
    title: "Collecte",
    description: "Identification et collecte des affirmations à vérifier auprès de sources primaires.",
  },
  {
    step: "02",
    title: "Vérification",
    description: "Recoupement systématique avec au minimum deux sources indépendantes et fiables.",
  },
  {
    step: "03",
    title: "Contextualisation",
    description: "Mise en perspective des faits dans leur contexte historique, politique et social.",
  },
  {
    step: "04",
    title: "Publication",
    description: "Validation finale par la rédaction en chef avant diffusion, avec traçabilité complète.",
  },
];

export default function EthicsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Charte Éthique & Déontologie — Ligne Rouge",
    description: "Notre engagement en matière de déontologie journalistique.",
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
      ethicsPolicy: `${siteConfig.url}/ethics`,
      correctionsPolicy: `${siteConfig.url}/ethics#corrections`,
      verificationFactCheckingPolicy: `${siteConfig.url}/ethics#fact-checking`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-16 bg-white dark:bg-[#1a1a2e]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[#C01D35] text-xs font-bold tracking-[0.12em] uppercase mb-4">
              Déontologie
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-extrabold text-[#0D1B2A] dark:text-white leading-tight mb-6">
              Charte Éthique &<br />Déontologie Journalistique
            </h1>
            <p className="text-lg text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed max-w-[600px] mx-auto">
              Notre engagement fondamental envers la vérité, la transparence et
              l&apos;intégrité de l&apos;information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {principles.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] bg-[#F2F1EE] dark:bg-[#12121e]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C01D35]/10 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-[#C01D35]" />
                </div>
                <h2 className="font-serif text-lg font-bold text-[#0D1B2A] dark:text-white mb-3">
                  {p.title}
                </h2>
                <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <div id="fact-checking" className="mb-20">
            <div className="flex items-center gap-2.5 mb-8 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
              <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
              <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white">
                Processus de Fact-Checking
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {factCheckProcess.map((item) => (
                <div
                  key={item.step}
                  className="relative p-5 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e]"
                >
                  <span className="text-4xl font-extrabold text-[#C01D35]/15 absolute top-3 right-4 font-serif">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-sm text-[#0D1B2A] dark:text-white mb-2 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div id="corrections" className="mb-20">
            <div className="flex items-center gap-2.5 mb-8 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
              <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
              <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white">
                Politique de Correction
              </h2>
            </div>
            <div className="space-y-6 font-body text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed">
              <p>
                Ligne Rouge s&apos;engage à corriger rapidement et de manière transparente
                toute erreur factuelle dans ses publications. Notre processus de
                correction suit les standards internationaux du journalisme de qualité.
              </p>
              <div className="bg-[#F2F1EE] dark:bg-[#12121e] border border-[#DEDBD4] dark:border-[#2a2a3e] rounded-lg p-6">
                <h3 className="font-bold text-[#0D1B2A] dark:text-white mb-3">
                  Comment signaler une erreur ?
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C01D35] mt-1.5 shrink-0" />
                    Envoyez un email à{" "}
                    <span className="font-semibold text-[#0D1B2A] dark:text-white">
                      corrections@lignerouge.info
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C01D35] mt-1.5 shrink-0" />
                    Précisez l&apos;article concerné et la nature de l&apos;erreur
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C01D35] mt-1.5 shrink-0" />
                    Fournissez si possible des sources corroborant votre signalement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C01D35] mt-1.5 shrink-0" />
                    Délai de réponse : 24 heures maximum
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center p-8 rounded-lg bg-[#0D1B2A] text-white">
            <h2 className="font-serif text-xl font-bold mb-3">
              Médiateur de la rédaction
            </h2>
            <p className="text-sm text-white/70 mb-4 max-w-[400px] mx-auto">
              Pour toute question relative à notre déontologie, vous pouvez
              contacter notre médiateur indépendant.
            </p>
            <a
              href="mailto:mediateur@lignerouge.info"
              className="inline-block bg-[#C01D35] text-white text-sm font-bold px-6 py-3 rounded hover:bg-[#A01728] transition-colors"
            >
              Contacter le médiateur
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
