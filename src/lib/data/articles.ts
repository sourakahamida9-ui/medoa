import type { Article } from "@/types";
import { categories } from "./categories";
import { authors } from "./authors";

export const articles: Article[] = [
  {
    id: "art-0",
    slug: "ligne-rouge-lancement-plateforme-information-internationale",
    title: "Ligne Rouge : naissance d'une plateforme d'information internationale indépendante",
    subtitle: "Le premier éditorial du rédacteur en chef — une vision pour un journalisme numérique rigoureux et accessible",
    excerpt: "Ligne Rouge voit le jour avec une ambition claire : offrir une information vérifiée, structurée et d'intérêt public, à la croisée du journalisme d'investigation et de la maîtrise technologique.",
    body: `<p>Aujourd'hui marque le lancement officiel de <strong>Ligne Rouge</strong>, une plateforme d'information internationale conçue pour répondre aux exigences d'un monde en constante mutation. Ce projet est le fruit d'une conviction profonde : le journalisme de qualité n'est pas un luxe, c'est une nécessité démocratique.</p>
<h2>Pourquoi Ligne Rouge ?</h2>
<p>Dans un paysage médiatique saturé par l'instantanéité et la désinformation, il manquait un espace dédié à l'analyse rigoureuse, au recoupement systématique des sources et à la mise en perspective des événements. Ligne Rouge comble ce vide.</p>
<p>Le nom « Ligne Rouge » symbolise notre engagement : il y a des principes que nous ne franchirons jamais — la vérité des faits, l'indépendance éditoriale, et le respect du public.</p>
<h2>Notre approche</h2>
<p>Originaire de Kouandé, formé au Collège Saint-Augustin de Natitingou, j'ai consacré ma carrière à la jonction entre journalisme et technologie. Cette double compétence est au cœur de Ligne Rouge : chaque article est non seulement vérifié selon les standards les plus exigeants du métier, mais aussi optimisé pour être accessible, rapide et agréable à lire sur tous les supports.</p>
<blockquote>« L'information n'a de valeur que si elle est fiable, accessible et utile au citoyen. C'est la promesse de Ligne Rouge. »</blockquote>
<h2>Ce que vous trouverez ici</h2>
<p>Ligne Rouge couvre l'actualité politique, économique, technologique, culturelle et sportive avec une attention particulière portée au continent africain et à ses enjeux dans un monde globalisé. Nos rubriques incluent :</p>
<ul>
<li><strong>Politique & International</strong> — Analyses géopolitiques et décryptages institutionnels</li>
<li><strong>Économie</strong> — Marchés, indicateurs macroéconomiques, fintech</li>
<li><strong>Technologie</strong> — Innovation, startups, transformation numérique</li>
<li><strong>Société & Culture</strong> — Enjeux sociétaux, arts, éducation</li>
<li><strong>Sport</strong> — Résultats, analyses tactiques, événements majeurs</li>
</ul>
<h2>Un engagement pour la transparence</h2>
<p>Nous publions notre <a href="/ethics">charte éthique</a> en toute transparence. Notre processus de vérification des faits, nos politiques de correction et nos engagements déontologiques sont accessibles à tous. C'est la condition sine qua non de la confiance.</p>
<p>Bienvenue sur Ligne Rouge. L'information commence ici.</p>`,
    category: categories[0],
    categorySlug: "actualite",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "La rédaction de Ligne Rouge",
    publishedAt: "2026-05-14T12:00:00Z",
    readTime: 5,
    views: 0,
    status: "published",
    featured: true,
    breaking: false,
    tags: ["éditorial", "ligne rouge", "lancement", "journalisme"],
    locale: "fr",
  },
  {
    id: "art-1",
    slug: "nouveaux-enjeux-geopolitiques-afrique-ouest",
    title: "Nouveaux enjeux géopolitiques en Afrique de l'Ouest : vers un nouvel ordre régional",
    subtitle: "Une analyse approfondie des dynamiques de pouvoir qui redessinent la carte politique de la région",
    excerpt: "L'Afrique de l'Ouest traverse une période de transformation politique majeure, marquée par des changements institutionnels profonds et de nouvelles alliances stratégiques.",
    body: `<p>L'Afrique de l'Ouest traverse une période de transformation politique majeure. Les récents changements institutionnels dans plusieurs pays de la région redessinent profondément la carte géopolitique du continent.</p>
<h2>Un contexte régional en mutation</h2>
<p>Les organisations régionales comme la CEDEAO font face à des défis sans précédent. La montée des mouvements souverainistes, combinée aux questions sécuritaires persistantes, oblige les acteurs régionaux à repenser leurs modèles de coopération.</p>
<p>Les experts s'accordent à dire que la région entre dans une nouvelle ère où les paradigmes traditionnels de gouvernance et de coopération internationale sont remis en question de manière fondamentale.</p>
<h2>Les nouvelles alliances stratégiques</h2>
<p>Parallèlement, de nouvelles alliances se forment. L'Alliance des États du Sahel, créée récemment, illustre cette tendance à la recomposition des blocs régionaux. Cette dynamique pourrait avoir des répercussions durables sur l'architecture de sécurité collective en Afrique de l'Ouest.</p>
<blockquote>« Nous assistons à une reconfiguration historique des rapports de force dans la région », analyse le Pr. Abdoulaye Diop, politologue à l'Université de Dakar.</blockquote>
<h2>Implications pour les populations</h2>
<p>Au-delà des considérations géostratégiques, ces changements ont des implications directes pour les 400 millions d'habitants de la région. Les questions de libre circulation, de commerce transfrontalier et d'accès aux services de base sont au cœur des préoccupations citoyennes.</p>
<p>La communauté internationale observe attentivement ces développements, consciente que la stabilité de l'Afrique de l'Ouest est cruciale pour l'équilibre global.</p>`,
    category: categories[1],
    categorySlug: "politique",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Vue aérienne de Dakar, Sénégal",
    publishedAt: "2026-05-12T08:00:00Z",
    readTime: 6,
    views: 12450,
    status: "published",
    featured: true,
    breaking: false,
    tags: ["géopolitique", "afrique", "cedeao", "sahel"],
    locale: "fr",
  },
  {
    id: "art-2",
    slug: "lions-teranga-preparatifs-coupe-monde",
    title: "Lions de la Téranga : les secrets de la préparation pour la Coupe du Monde 2026",
    subtitle: "Le Sénégal affine sa stratégie avec une approche scientifique révolutionnaire",
    excerpt: "L'équipe nationale du Sénégal se prépare intensivement pour la compétition mondiale avec une méthodologie innovante qui pourrait faire école.",
    body: `<p>L'équipe nationale du Sénégal se prépare intensivement pour la Coupe du Monde 2026, avec une approche qui combine technologie de pointe et tradition footballistique africaine.</p>
<h2>Une préparation scientifique</h2>
<p>Le staff technique a intégré des outils d'analyse de données avancés, notamment l'intelligence artificielle pour optimiser les performances individuelles et collectives. Chaque joueur dispose d'un programme personnalisé basé sur des données biométriques en temps réel.</p>
<p>« Nous avons investi massivement dans la data science sportive », confie le sélectionneur. « Notre objectif est de combiner le talent naturel de nos joueurs avec une préparation physique et tactique de classe mondiale. »</p>
<h2>Un effectif renouvelé</h2>
<p>La nouvelle génération de joueurs, formée dans les meilleures académies européennes et africaines, apporte un souffle nouveau à l'équipe. Le mélange entre l'expérience des cadres et la fougue des jeunes talents promet une équipe compétitive à tous les niveaux.</p>
<h2>L'ambition d'un continent</h2>
<p>Au-delà du football, cette Coupe du Monde représente une vitrine pour l'ensemble du continent africain. Les Lions de la Téranga portent les espoirs de millions de supporters à travers le monde.</p>`,
    category: categories[5],
    categorySlug: "sport",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Stade de Dakar lors d'un match international",
    publishedAt: "2026-05-11T10:30:00Z",
    readTime: 4,
    views: 8900,
    status: "published",
    featured: false,
    breaking: false,
    tags: ["football", "coupe du monde", "senegal", "sport"],
    locale: "fr",
  },
  {
    id: "art-3",
    slug: "hub-numerique-dakar-innovation-technologique",
    title: "Innovation technologique : le hub numérique de Dakar attire les géants de la tech",
    subtitle: "La capitale sénégalaise s'affirme comme le nouveau pôle d'innovation du continent africain",
    excerpt: "Dakar continue d'attirer les investissements technologiques majeurs, se positionnant comme un leader continental de l'innovation numérique.",
    body: `<p>Dakar continue d'attirer les investissements technologiques majeurs. Le nouveau Parc Numérique de Diamniadio, inauguré cette année, accueille déjà plus de 200 startups et plusieurs bureaux de géants technologiques internationaux.</p>
<h2>Un écosystème en pleine effervescence</h2>
<p>L'écosystème tech sénégalais connaît une croissance exponentielle. Les investissements en capital-risque dans les startups africaines ont atteint des niveaux record, avec le Sénégal en tête de file pour l'Afrique de l'Ouest.</p>
<p>Les secteurs les plus dynamiques incluent la fintech, l'agritech, la healthtech et l'edtech, avec des solutions innovantes adaptées aux réalités locales mais à portée internationale.</p>
<h2>Formation et talents</h2>
<p>Le pays mise également sur la formation d'une nouvelle génération de développeurs et d'entrepreneurs. Les bootcamps de codage, les incubateurs et les programmes universitaires spécialisés se multiplient pour répondre à la demande croissante du marché.</p>
<blockquote>« Dakar est en train de devenir le Silicon Valley de l'Afrique francophone », affirme Mariama Ndoye, directrice de Dakar Tech Hub.</blockquote>
<h2>Défis et perspectives</h2>
<p>Malgré ces avancées, des défis persistent : l'accès au financement pour les startups en phase précoce, la connectivité dans les zones rurales et la rétention des talents face à la concurrence internationale restent des enjeux majeurs.</p>`,
    category: categories[4],
    categorySlug: "technologie",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Le Parc Numérique de Diamniadio",
    publishedAt: "2026-05-10T14:00:00Z",
    readTime: 5,
    views: 5600,
    status: "published",
    featured: true,
    breaking: false,
    tags: ["technologie", "innovation", "startup", "dakar"],
    locale: "fr",
  },
  {
    id: "art-4",
    slug: "biennale-dakar-art-contemporain-africain",
    title: "Biennale de Dakar 2026 : l'art contemporain africain conquiert le monde",
    subtitle: "L'édition la plus ambitieuse de l'événement artistique majeur du continent",
    excerpt: "L'édition 2026 de la Biennale de Dakar a battu tous les records d'affluence, confirmant la place de l'Afrique sur la scène artistique mondiale.",
    body: `<p>L'édition 2026 de la Biennale de Dakar, connue sous le nom de Dak'Art, a accueilli plus de 350 000 visiteurs en un mois, un record historique qui témoigne de l'engouement croissant pour l'art contemporain africain.</p>
<h2>Une programmation audacieuse</h2>
<p>Sous le thème « Horizons Partagés », cette édition a réuni 89 artistes de 42 pays, avec une majorité d'artistes du continent africain et de sa diaspora. Les installations monumentales, performances et expositions ont investi plus de 30 lieux dans toute la ville de Dakar.</p>
<h2>La diaspora en lumière</h2>
<p>Cette année, la Biennale a particulièrement mis en avant les artistes de la diaspora africaine, créant des ponts entre les créations du continent et celles de ses communautés à travers le monde.</p>
<blockquote>« L'art africain n'est plus une niche. C'est un mouvement global qui redéfinit les standards de l'art contemporain mondial », déclare le commissaire général de l'exposition.</blockquote>
<h2>Impact économique</h2>
<p>Au-delà de sa dimension culturelle, la Biennale génère des retombées économiques significatives : tourisme culturel, marché de l'art, formation professionnelle et rayonnement international de la destination Sénégal.</p>`,
    category: categories[7],
    categorySlug: "culture",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Installation artistique lors de Dak'Art 2026",
    publishedAt: "2026-05-09T09:00:00Z",
    readTime: 7,
    views: 4200,
    status: "published",
    featured: false,
    breaking: false,
    tags: ["art", "biennale", "culture", "dakar"],
    locale: "fr",
  },
  {
    id: "art-5",
    slug: "sommet-climat-engagements-afrique",
    title: "Sommet sur le climat : les engagements historiques de l'Afrique pour une transition verte",
    subtitle: "Les dirigeants africains portent une voix unie pour un financement climatique équitable",
    excerpt: "Les dirigeants africains ont porté une voix unie lors du dernier sommet sur le climat, exigeant un financement climatique plus équitable.",
    body: `<p>Les dirigeants africains ont porté une voix unie lors du Sommet mondial sur le climat, présentant un plan d'action ambitieux pour la transition énergétique du continent.</p>
<h2>Un plan d'action continental</h2>
<p>Le plan prévoit l'installation de 300 GW de capacité en énergie renouvelable d'ici 2035, un objectif qui nécessitera des investissements estimés à 600 milliards de dollars. Les énergies solaire et éolienne sont au cœur de cette stratégie.</p>
<h2>Justice climatique</h2>
<p>Les représentants africains ont rappelé que le continent, qui contribue à moins de 4% des émissions mondiales de gaz à effet de serre, subit de manière disproportionnée les effets du changement climatique : sécheresses, inondations et montée des eaux menacent des millions de personnes.</p>
<blockquote>« L'Afrique ne demande pas la charité. Nous demandons la justice climatique et les moyens de mettre en œuvre nos propres solutions », a déclaré le porte-parole du groupe africain.</blockquote>
<h2>Innovations vertes africaines</h2>
<p>Le sommet a également mis en lumière les innovations vertes développées sur le continent : solutions de stockage d'énergie, agriculture résiliente, systèmes d'alerte précoce et technologies de dessalement alimentées par le solaire.</p>`,
    category: categories[2],
    categorySlug: "international",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1444653300305-64505342738d?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Sommet sur le climat - Session plénière",
    publishedAt: "2026-05-08T11:00:00Z",
    readTime: 8,
    views: 3100,
    status: "published",
    featured: false,
    breaking: false,
    tags: ["climat", "environnement", "afrique", "transition"],
    locale: "fr",
  },
  {
    id: "art-6",
    slug: "croissance-economique-afrique-ouest-2026",
    title: "Croissance économique : l'Afrique de l'Ouest dépasse les prévisions du FMI",
    subtitle: "Les indicateurs macroéconomiques révèlent une dynamique positive portée par la diversification",
    excerpt: "L'Afrique de l'Ouest affiche des taux de croissance supérieurs aux prévisions, portée par la diversification économique et l'essor du numérique.",
    body: `<p>Les dernières données économiques confirment une tendance positive pour l'Afrique de l'Ouest. Le taux de croissance moyen de la région atteint 5,8% au premier trimestre 2026, dépassant les prévisions du FMI de 4,2%.</p>
<h2>Les moteurs de la croissance</h2>
<p>La diversification économique, longtemps prônée par les institutions internationales, commence à porter ses fruits. Le secteur des services, en particulier le numérique et la fintech, connaît une expansion remarquable.</p>
<p>Le commerce intra-africain, stimulé par la Zone de libre-échange continentale africaine (ZLECAf), contribue significativement à cette dynamique positive.</p>
<h2>Le rôle du secteur privé</h2>
<p>Les entreprises locales et les investisseurs étrangers augmentent leurs engagements dans la région. Les IDE ont progressé de 23% par rapport à l'année précédente, avec des secteurs comme les infrastructures, l'énergie et l'agroalimentaire en tête.</p>`,
    category: categories[3],
    categorySlug: "economie",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Centre financier de Lagos",
    publishedAt: "2026-05-07T07:30:00Z",
    readTime: 5,
    views: 6700,
    status: "published",
    featured: false,
    breaking: false,
    tags: ["économie", "croissance", "fmi", "afrique"],
    locale: "fr",
  },
  {
    id: "art-7",
    slug: "education-numerique-revolution-senegal",
    title: "Éducation numérique : la révolution silencieuse dans les écoles du Sénégal",
    subtitle: "Comment le numérique transforme l'accès à l'éducation dans les zones rurales",
    excerpt: "Le programme national de numérisation de l'éducation transforme l'accès au savoir dans les régions les plus reculées du Sénégal.",
    body: `<p>Le Sénégal mène une transformation ambitieuse de son système éducatif grâce au numérique. Le programme « Sénégal Éducation 2030 » a déjà équipé 2 500 écoles en tablettes et connexion internet.</p>
<h2>Des résultats encourageants</h2>
<p>Les premiers résultats sont prometteurs : le taux de réussite aux examens dans les écoles connectées a augmenté de 15%, et le taux d'abandon scolaire a diminué de 22% dans les zones pilotes.</p>
<p>Les plateformes d'apprentissage adaptatives, développées par des startups locales, permettent un enseignement personnalisé qui s'adapte au rythme de chaque élève.</p>
<h2>Former les enseignants</h2>
<p>La clé du succès réside dans la formation des enseignants. Plus de 10 000 professeurs ont été formés aux outils numériques pédagogiques, avec un programme de mentorat continu.</p>`,
    category: categories[6],
    categorySlug: "societe",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Élèves utilisant des tablettes numériques",
    publishedAt: "2026-05-06T13:00:00Z",
    readTime: 6,
    views: 3800,
    status: "published",
    featured: false,
    breaking: false,
    tags: ["éducation", "numérique", "sénégal", "innovation"],
    locale: "fr",
  },
  {
    id: "art-8",
    slug: "breaking-accord-commercial-historique-cedeao",
    title: "URGENT — Accord commercial historique signé entre les pays de la CEDEAO",
    subtitle: "Un accord sans précédent qui pourrait transformer les échanges régionaux",
    excerpt: "Les 15 pays membres de la CEDEAO viennent de signer un accord commercial historique visant à supprimer les barrières douanières restantes d'ici 2028.",
    body: `<p>Dans un développement majeur pour l'intégration régionale, les 15 pays membres de la CEDEAO ont signé ce matin un accord commercial historique à Abuja.</p>
<h2>Les termes de l'accord</h2>
<p>L'accord prévoit la suppression progressive de toutes les barrières tarifaires et non-tarifaires restantes d'ici 2028, la création d'un marché commun numérique et l'harmonisation des réglementations commerciales.</p>
<h2>Réactions internationales</h2>
<p>La communauté internationale a salué cet accord. L'Union européenne, les États-Unis et la Chine ont exprimé leur soutien à cette initiative d'intégration économique régionale.</p>`,
    category: categories[0],
    categorySlug: "actualite",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Signature de l'accord à Abuja",
    publishedAt: "2026-05-13T16:00:00Z",
    readTime: 3,
    views: 15200,
    status: "published",
    featured: true,
    breaking: true,
    tags: ["cedeao", "commerce", "accord", "breaking"],
    locale: "fr",
  },
  {
    id: "art-9",
    slug: "intelligence-artificielle-afrique-opportunites",
    title: "Intelligence artificielle en Afrique : entre promesses technologiques et défis éthiques",
    subtitle: "Le continent se positionne comme laboratoire mondial de l'IA responsable",
    excerpt: "L'Afrique développe une approche unique de l'intelligence artificielle, centrée sur l'impact social et le développement durable.",
    body: `<p>L'intelligence artificielle transforme rapidement le paysage technologique africain. Des chatbots multilingues aux systèmes de diagnostic médical, les applications se multiplient à travers le continent.</p>
<h2>L'IA au service du développement</h2>
<p>Contrairement aux tendances occidentales souvent centrées sur l'optimisation commerciale, l'IA africaine se distingue par son orientation vers la résolution de problèmes sociaux concrets : prédiction des récoltes, détection précoce des épidémies, inclusion financière des populations non bancarisées.</p>
<h2>Les défis éthiques</h2>
<p>Le développement de l'IA en Afrique soulève également des questions éthiques importantes. La protection des données personnelles, les biais algorithmiques et la souveraineté numérique sont au cœur des débats.</p>
<blockquote>« L'Afrique a l'opportunité unique de développer une IA éthique dès le départ, sans reproduire les erreurs des pionniers », souligne Dr. Ousmane Mbaye, chercheur en éthique de l'IA.</blockquote>`,
    category: categories[4],
    categorySlug: "technologie",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Laboratoire de recherche en IA à Dakar",
    publishedAt: "2026-05-05T10:00:00Z",
    readTime: 7,
    views: 4500,
    status: "published",
    featured: false,
    breaking: false,
    tags: ["intelligence artificielle", "technologie", "éthique", "afrique"],
    locale: "fr",
  },
  {
    id: "art-10",
    slug: "reforme-constitutionnelle-senegal-enjeux",
    title: "Réforme constitutionnelle au Sénégal : les enjeux d'une transformation institutionnelle",
    subtitle: "Analyse des propositions de réforme et de leurs implications pour la démocratie sénégalaise",
    excerpt: "Le Sénégal engage une réforme constitutionnelle majeure qui pourrait redéfinir l'équilibre des pouvoirs et renforcer les institutions démocratiques.",
    body: `<p>Le Sénégal s'engage dans un processus de réforme constitutionnelle d'envergure, porté par une volonté de moderniser les institutions et de renforcer l'État de droit.</p>
<h2>Les axes principaux de la réforme</h2>
<p>La commission constitutionnelle propose plusieurs changements significatifs : renforcement de l'indépendance judiciaire, décentralisation accrue, meilleure représentation des femmes et des jeunes dans les institutions, et création d'un conseil constitutionnel rénové.</p>
<h2>Le débat citoyen</h2>
<p>Des forums citoyens ont été organisés dans toutes les régions du pays pour recueillir les avis et propositions de la population. Cette approche participative est saluée par les organisations de la société civile.</p>`,
    category: categories[1],
    categorySlug: "politique",
    author: authors[0],
    authorSlug: "alassane-ibraima",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Assemblée nationale du Sénégal",
    publishedAt: "2026-05-04T08:00:00Z",
    readTime: 9,
    views: 7800,
    status: "published",
    featured: false,
    breaking: false,
    tags: ["politique", "constitution", "sénégal", "réforme"],
    locale: "fr",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles
    .filter((a) => a.categorySlug === categorySlug && a.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedArticles(): Article[] {
  return articles
    .filter((a) => a.featured && a.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBreakingNews(): Article[] {
  return articles.filter((a) => a.breaking && a.status === "published");
}

export function getLatestArticles(limit = 10): Article[] {
  return articles
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.status === "published" &&
      (a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.category.name.toLowerCase().includes(q))
  );
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return articles
    .filter(
      (a) =>
        a.id !== article.id &&
        a.status === "published" &&
        (a.categorySlug === article.categorySlug ||
          a.tags.some((t) => article.tags.includes(t)))
    )
    .slice(0, limit);
}
