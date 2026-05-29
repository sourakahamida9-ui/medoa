"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Loader2, CheckCircle2, X } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { Logo } from "@/components/layout/Logo";

interface DbCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface DbUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Article {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string;
  image: string;
  imageCaption: string;
  categoryId: string;
  authorId: string;
  status: "draft" | "published";
  featured: boolean;
  breaking: boolean;
  tags: string[];
  slug: string;
}

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featured, setFeatured] = useState(false);
  const [breaking, setBreaking] = useState(false);
  const [tags, setTags] = useState("");

  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [users, setUsers] = useState<DbUser[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, userRes, articleRes] = await Promise.all([
          fetch("/api/admin/categories"),
          fetch("/api/admin/users"),
          fetch(`/api/admin/articles/${id}`),
        ]);

        if (catRes.ok && userRes.ok && articleRes.ok) {
          const cats = await catRes.json();
          const usrs = await userRes.json();
          const article = await articleRes.json();

          setCategories(Array.isArray(cats) ? cats : []);
          setUsers(Array.isArray(usrs) ? usrs : []);

          if (article) {
            setTitle(article.title || "");
            setSubtitle(article.subtitle || "");
            setExcerpt(article.excerpt || "");
            setContent(article.body || "");
            setImage(article.image || "");
            setImageCaption(article.imageCaption || "");
            setCategoryId(article.categoryId || "");
            setAuthorId(article.authorId || "");
            setStatus(article.status || "draft");
            setFeatured(article.featured || false);
            setBreaking(article.breaking || false);
            setTags(article.tags?.join(", ") || "");
          }
        } else {
          setError("Erreur lors du chargement des données");
        }
      } catch (err) {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError("Titre, extrait et contenu sont obligatoires.");
      return;
    }
    if (!categoryId || !authorId) {
      setError("Catégorie et auteur sont obligatoires.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          excerpt,
          content: formatContent(content),
          categoryId,
          authorId,
          image,
          imageCaption,
          status,
          featured,
          breaking,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      setSaved(true);
      setToast({ type: "success", message: "Article mis à jour avec succès!" });
      setTimeout(() => { setSaved(false); setToast(null); router.push("/admin"); }, 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setError(msg);
      setToast({ type: "error", message: msg });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F1EE] dark:bg-[#0f0f1a] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#C01D35]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F1EE] dark:bg-[#0f0f1a]">
      <div className="bg-[#0D1B2A] text-white px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo variant="white" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50 border-l border-white/20 pl-4">
            Éditer article
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
        {saved && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Article mis à jour avec succès!</span>
          </div>
        )}

        <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6 space-y-6">
          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Titre *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'article..."
              className="w-full text-lg font-serif font-bold px-4 py-3 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Sous-titre
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Sous-titre (optionnel)..."
              className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Extrait / Chapeau *
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Résumé court de l'article..."
              rows={2}
              className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Contenu * <span className="text-[#7A7A7A] font-normal normal-case">(HTML supporté)</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Rédigez votre article ici..."
              rows={12}
              className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors resize-y font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Image de couverture
            </label>
            <ImageUpload value={image} onChange={(url) => setImage(url)} />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Légende image
            </label>
            <input
              type="text"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              placeholder="Description de l'image..."
              className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
                Catégorie *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              >
                <option value="">Sélectionner une catégorie...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
                Auteur *
              </label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              >
                <option value="">Sélectionner un auteur...</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Tags <span className="text-[#7A7A7A] font-normal normal-case">(séparés par des virgules)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="politique, afrique, économie..."
              className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-[#4A4A4A] dark:text-[#a0a0b0] cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#C01D35]"
              />
              Article à la une
            </label>
            <label className="flex items-center gap-2 text-sm text-[#4A4A4A] dark:text-[#a0a0b0] cursor-pointer">
              <input
                type="checkbox"
                checked={breaking}
                onChange={(e) => setBreaking(e.target.checked)}
                className="w-4 h-4 accent-[#C01D35]"
              />
              Breaking News
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#DEDBD4] dark:border-[#2a2a3e]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStatus("draft")}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                  status === "draft"
                    ? "bg-[#DEDBD4] dark:bg-[#3a3a4e] text-[#0D1B2A] dark:text-white"
                    : "text-[#7A7A7A] hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e]"
                }`}
              >
                Brouillon
              </button>
              <button
                onClick={() => setStatus("published")}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                  status === "published"
                    ? "bg-green-600 text-white"
                    : "text-[#7A7A7A] hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e]"
                }`}
              >
                Publier
              </button>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#C01D35] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#A01728] transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
        </div>

        {title && (
          <div className="mt-8 bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-[#7A7A7A]" />
              <span className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider">
                Aperçu
              </span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[#4A4A4A] dark:text-[#a0a0b0] mb-4">{subtitle}</p>
            )}
            <p className="text-sm text-[#7A7A7A] italic mb-4">{excerpt}</p>
            <div
              className="prose dark:prose-invert max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: formatContent(content) }}
            />
          </div>
        )}
      </div>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-2xl text-sm font-semibold text-white animate-slide-up ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
          {toast.message}
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function formatContent(text: string): string {
  if (text.includes("<p>") || text.includes("<h2>")) return text;
  return text
    .split("\n\n")
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/\n/g, "<br />")}</p>`)
    .join("\n");
}
