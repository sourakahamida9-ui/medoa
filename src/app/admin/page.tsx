"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  MessageSquare,
  Eye,
  TrendingUp,
  Plus,
  Search,
  Settings,
  Clock,
  Edit,
  Trash2,
  AlertTriangle,
  Zap,
  Database,
  Loader2,
  RefreshCw,
  LogOut,
  Layers,
  Users,
} from "lucide-react";

import { Logo } from "@/components/layout/Logo";

interface DbArticle {
  id: string;
  slug: string;
  title: string;
  status: string;
  featured: boolean;
  breaking: boolean;
  readTime: number;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  author: { id: string; name: string; avatar: string | null };
  category: { id: string; name: string; slug: string; color: string };
}

type TabId = "dashboard" | "articles" | "comments" | "analytics" | "breaking";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [dbArticles, setDbArticles] = useState<DbArticle[]>([]);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesCount, setCategoriesCount] = useState(0);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const [healthRes, articlesRes, catRes] = await Promise.all([
        fetch("/api/health"),
        fetch("/api/admin/articles?limit=100"),
        fetch("/api/admin/categories"),
      ]);
      if (healthRes.ok) {
        setDbConnected(true);
        if (articlesRes.ok) {
          const data = await articlesRes.json();
          setDbArticles(data.articles || []);
        }
        if (catRes.ok) {
          const cats = await catRes.json();
          setCategoriesCount(Array.isArray(cats) ? cats.length : 0);
        }
      } else {
        setDbConnected(false);
      }
    } catch {
      setDbConnected(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!cancelled) await fetchArticles();
    })();
    return () => { cancelled = true; };
  }, [fetchArticles]);

  const displayArticles = dbArticles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    categoryName: a.category.name,
    categoryColor: a.category.color,
    authorName: a.author.name,
    readTime: a.readTime,
    views: a.views,
    status: a.status.toLowerCase(),
    featured: a.featured,
  }));

  const totalViews = displayArticles.reduce((sum, a) => sum + a.views, 0);
  const publishedCount = displayArticles.filter((a) => a.status === "published").length;

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
    { id: "articles" as const, label: "Articles", icon: FileText },
    { id: "comments" as const, label: "Commentaires", icon: MessageSquare },
    { id: "analytics" as const, label: "Analytics", icon: TrendingUp },
    { id: "breaking" as const, label: "Breaking News", icon: Zap },
  ];

  const managementLinks = [
    { href: "/admin/categories", label: "Catégories", icon: Layers },
    { href: "/admin/authors", label: "Auteurs", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F2F1EE] dark:bg-[#0f0f1a]">
      {/* Admin Header */}
      <div className="bg-[#0D1B2A] text-white px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo variant="white" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50 border-l border-white/20 pl-4">
            Administration
          </span>
        </div>
        <div className="flex items-center gap-3">
          {dbConnected !== null && (
            <span className={`text-[0.65rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1.5 ${
              dbConnected
                ? "bg-green-600/20 text-green-400"
                : "bg-yellow-600/20 text-yellow-400"
            }`}>
              <Database className="w-3 h-3" />
              {dbConnected ? "DB connectée" : "Mode local"}
            </span>
          )}
          <Link
            href="/"
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            ← Voir le site
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="text-xs text-white/60 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3 h-3" />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 bg-white dark:bg-[#1a1a2e] border-r border-[#DEDBD4] dark:border-[#2a2a3e] min-h-[calc(100vh-52px)] p-4 shrink-0 hidden md:block">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#C01D35] text-white"
                    : "text-[#4A4A4A] dark:text-[#a0a0b0] hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t border-[#DEDBD4] dark:border-[#2a2a3e]">
            <p className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider px-3 mb-2">
              Gestion
            </p>
            {managementLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#4A4A4A] dark:text-[#a0a0b0] hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e] transition-all"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/settings"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#4A4A4A] dark:text-[#a0a0b0] hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e] transition-all"
            >
              <Settings className="w-4 h-4" />
              Paramètres
            </Link>
          </div>
        </div>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a1a2e] border-t border-[#DEDBD4] dark:border-[#2a2a3e] flex z-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 text-[0.6rem] font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#C01D35]"
                  : "text-[#7A7A7A]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-8 pb-20 md:pb-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-[#C01D35]" />
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <DashboardView
                  totalViews={totalViews}
                  publishedCount={publishedCount}
                  categoriesCount={categoriesCount}
                  articles={displayArticles}
                  dbConnected={dbConnected}
                  onSeed={async () => {
                    await fetch("/api/admin/seed", { method: "POST" });
                    fetchArticles();
                  }}
                />
              )}
              {activeTab === "articles" && (
                <ArticlesView
                  articles={displayArticles}
                  dbConnected={dbConnected}
                  onDelete={async (id) => {
                    if (!dbConnected) return;
                    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
                    fetchArticles();
                  }}
                  onRefresh={fetchArticles}
                />
              )}
              {activeTab === "comments" && <CommentsView />}
              {activeTab === "analytics" && <AnalyticsView totalViews={totalViews} articles={displayArticles} />}
              {activeTab === "breaking" && <BreakingNewsView />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface DisplayArticle {
  id: string;
  title: string;
  slug: string;
  categoryName: string;
  categoryColor: string;
  authorName: string;
  readTime: number;
  views: number;
  status: string;
  featured: boolean;
}

function DashboardView({
  totalViews,
  publishedCount,
  categoriesCount,
  articles,
  dbConnected,
  onSeed,
}: {
  totalViews: number;
  publishedCount: number;
  categoriesCount: number;
  articles: DisplayArticle[];
  dbConnected: boolean | null;
  onSeed: () => Promise<void>;
}) {
  const [seeding, setSeeding] = useState(false);

  const stats = [
    { label: "Articles publiés", value: publishedCount, icon: FileText, color: "#C01D35" },
    { label: "Vues totales", value: totalViews.toLocaleString("fr-FR"), icon: Eye, color: "#1B4F72" },
    { label: "Catégories", value: categoriesCount, icon: BarChart3, color: "#0E6655" },
    { label: "Commentaires", value: 0, icon: MessageSquare, color: "#B7950B" },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white">
          Tableau de bord
        </h1>
        <Link
          href="/admin/articles/new"
          className="bg-[#C01D35] text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-[#A01728] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nouvel article
        </Link>
      </div>

      {dbConnected === false && (
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
            Mode local — Base de données non synchronisée
          </p>
          <p className="text-xs text-yellow-700 dark:text-yellow-500 mb-3">
            Le CMS fonctionne avec les données locales. Pour activer la création d&apos;articles en direct, initialisez la base de données Supabase.
          </p>
          <button
            onClick={async () => { setSeeding(true); await onSeed(); setSeeding(false); }}
            disabled={seeding}
            className="bg-yellow-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-yellow-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {seeding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Database className="w-3 h-3" />}
            {seeding ? "Initialisation..." : "Synchroniser avec Supabase"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.65rem] sm:text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider">
                {stat.label}
              </span>
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-[#0D1B2A] dark:text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e]">
        <div className="p-4 sm:p-5 border-b border-[#DEDBD4] dark:border-[#2a2a3e]">
          <h2 className="font-serif font-bold text-[#0D1B2A] dark:text-white">
            Derniers articles
          </h2>
        </div>
        <div className="divide-y divide-[#DEDBD4] dark:divide-[#2a2a3e]">
          {articles.slice(0, 5).map((article) => (
            <div key={article.id} className="p-4 flex items-center justify-between hover:bg-[#F2F1EE] dark:hover:bg-[#12121e] transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-[#1A1A1A] dark:text-white truncate">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#7A7A7A]">
                  <span className="text-[#C01D35] font-semibold">{article.categoryName}</span>
                  <span>{article.authorName}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views.toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className={`text-[0.68rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                  article.status === "published"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}>
                  {article.status === "published" ? "Publié" : "Brouillon"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ArticlesView({
  articles,
  dbConnected,
  onDelete,
  onRefresh,
}: {
  articles: DisplayArticle[];
  dbConnected: boolean | null;
  onDelete: (id: string) => Promise<void>;
  onRefresh: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery
    ? articles.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : articles;

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white">
          Articles
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="text-[#7A7A7A] hover:text-[#0D1B2A] dark:hover:text-white transition-colors p-2"
            title="Rafraîchir"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/admin/articles/new"
            className="bg-[#C01D35] text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-[#A01728] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvel article
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e]">
        <div className="p-4 border-b border-[#DEDBD4] dark:border-[#2a2a3e] flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg">
            <Search className="w-4 h-4 text-[#7A7A7A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un article..."
              className="flex-1 text-sm bg-transparent outline-none text-[#1A1A1A] dark:text-white"
            />
          </div>
        </div>
        <div className="divide-y divide-[#DEDBD4] dark:divide-[#2a2a3e]">
          {filtered.map((article) => (
            <div key={article.id} className="p-4 flex items-center justify-between hover:bg-[#F2F1EE] dark:hover:bg-[#12121e] transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-[#1A1A1A] dark:text-white truncate">
                  {article.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#7A7A7A]">
                  <span className="text-[#C01D35] font-semibold">{article.categoryName}</span>
                  <span>{article.authorName}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views.toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className={`text-[0.68rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                  article.status === "published"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}>
                  {article.status === "published" ? "Publié" : "Brouillon"}
                </span>
                {dbConnected && (
                  <>
                    <Link
                      href={`/article/${article.slug}`}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#DEDBD4] dark:hover:bg-[#3a3a4e] transition-colors text-[#7A7A7A]"
                      title="Voir"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(article.id)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-[#7A7A7A] hover:text-red-600"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
                {!dbConnected && (
                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#DEDBD4] dark:hover:bg-[#3a3a4e] transition-colors text-[#7A7A7A]">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-[#7A7A7A]">
              Aucun article trouvé
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CommentsView() {
  const mockComments = [
    { id: 1, author: "Marie Dupont", article: "Innovation technologique", content: "Excellent article, très bien documenté !", date: "Il y a 2 heures", approved: true },
    { id: 2, author: "Jean Martin", article: "Lions de la Téranga", content: "Vivement la Coupe du Monde ! Allez les Lions !", date: "Il y a 5 heures", approved: true },
    { id: 3, author: "Fatima Ndiaye", article: "Biennale de Dakar", content: "J'y étais, c'était magnifique. Merci pour ce compte-rendu.", date: "Il y a 1 jour", approved: false },
  ];

  return (
    <>
      <h1 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white mb-8">
        Commentaires
      </h1>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] divide-y divide-[#DEDBD4] dark:divide-[#2a2a3e]">
        {mockComments.map((comment) => (
          <div key={comment.id} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-[#0D1B2A] dark:text-white">{comment.author}</span>
                <span className="text-xs text-[#7A7A7A]">sur « {comment.article} »</span>
              </div>
              <span className={`text-[0.68rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                comment.approved
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}>
                {comment.approved ? "Approuvé" : "En attente"}
              </span>
            </div>
            <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] mb-2">{comment.content}</p>
            <span className="text-xs text-[#7A7A7A]">{comment.date}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function AnalyticsView({ totalViews, articles }: { totalViews: number; articles: DisplayArticle[] }) {
  const topArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <>
      <h1 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white mb-8">
        Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6">
          <h3 className="font-semibold text-sm text-[#7A7A7A] uppercase tracking-wider mb-4">
            Vues totales
          </h3>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0D1B2A] dark:text-white mb-2">
            {totalViews.toLocaleString("fr-FR")}
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            +12.5% vs mois dernier
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6">
          <h3 className="font-semibold text-sm text-[#7A7A7A] uppercase tracking-wider mb-4">
            Engagement moyen
          </h3>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0D1B2A] dark:text-white mb-2">
            4m 32s
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            +8.3% vs mois dernier
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e]">
        <div className="p-5 border-b border-[#DEDBD4] dark:border-[#2a2a3e]">
          <h2 className="font-serif font-bold text-[#0D1B2A] dark:text-white">
            Articles les plus lus
          </h2>
        </div>
        <div className="divide-y divide-[#DEDBD4] dark:divide-[#2a2a3e]">
          {topArticles.map((article, i) => (
            <div key={article.id} className="p-4 flex items-center gap-4">
              <span className="text-2xl font-serif font-bold text-[#DEDBD4] dark:text-[#2a2a3e] w-8">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-[#1A1A1A] dark:text-white truncate">
                  {article.title}
                </h3>
                <span className="text-xs text-[#7A7A7A]">{article.categoryName}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm text-[#0D1B2A] dark:text-white">
                  {article.views.toLocaleString("fr-FR")}
                </div>
                <span className="text-xs text-[#7A7A7A]">vues</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function BreakingNewsView() {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [priority, setPriority] = useState<"high" | "medium">("high");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      await fetch("/api/breaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, url, priority }),
      });
      setSent(true);
      setMessage("");
      setUrl("");
      setTimeout(() => setSent(false), 3000);
    } catch {
      // handle error
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-[#C01D35]" />
          Breaking News
        </h1>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6 mb-6">
        <h2 className="font-bold text-sm text-[#0D1B2A] dark:text-white mb-4">
          Publier une alerte urgente
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1">
              Message d&apos;alerte
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="ALERTE — Description de l'événement..."
              rows={2}
              className="w-full text-sm px-3 py-2 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors resize-none"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1">
                Lien (optionnel)
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="/article/slug-de-larticle"
                className="w-full text-sm px-3 py-2 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1">
                Priorité
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPriority("high")}
                  className={`flex-1 text-sm py-2 rounded font-semibold transition-colors ${
                    priority === "high"
                      ? "bg-[#C01D35] text-white"
                      : "border border-[#DEDBD4] dark:border-[#3a3a4e] text-[#7A7A7A]"
                  }`}
                >
                  Haute
                </button>
                <button
                  type="button"
                  onClick={() => setPriority("medium")}
                  className={`flex-1 text-sm py-2 rounded font-semibold transition-colors ${
                    priority === "medium"
                      ? "bg-yellow-500 text-black"
                      : "border border-[#DEDBD4] dark:border-[#3a3a4e] text-[#7A7A7A]"
                  }`}
                >
                  Moyenne
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#C01D35] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#A01728] transition-colors flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Publier l&apos;alerte
          </button>
        </form>

        {sent && (
          <div className="mt-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm font-medium p-3 rounded">
            Alerte publiée avec succès
          </div>
        )}
      </div>
    </>
  );
}
