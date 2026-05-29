"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit2, Loader2, CheckCircle2, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

const COLORS = [
  "#C01D35", "#1B4F72", "#0E6655", "#B7950B", "#7D3C98",
  "#E74C3C", "#3498DB", "#2ECC71", "#F39C12", "#9B59B6"
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({ name: "", color: COLORS[0] });

  // Fetch categories
  useEffect(() => {
    async function fetch() {
      try {
        const res = await fetch("/api/admin/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        showToast("error", "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("error", "Le nom est obligatoire");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: editingId }),
      });

      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");

      showToast("success", editingId ? "Catégorie mise à jour" : "Catégorie créée");
      setFormData({ name: "", color: COLORS[0] });
      setEditingId(null);
      setShowForm(false);

      // Reload
      const catRes = await fetch("/api/admin/categories");
      if (catRes.ok) {
        const data = await catRes.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirmer la suppression ?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      showToast("success", "Catégorie supprimée");
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Erreur");
    }
  };

  const handleEdit = (cat: Category) => {
    setFormData({ name: cat.name, color: cat.color });
    setEditingId(cat.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#F2F1EE] dark:bg-[#0f0f1a]">
      {/* Header */}
      <div className="bg-[#0D1B2A] text-white px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo variant="white" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50 border-l border-white/20 pl-4">
            Catégories
          </span>
        </div>
        <Link
          href="/admin"
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" />
          Dashboard
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white">
            Catégories
          </h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (editingId) {
                setEditingId(null);
                setFormData({ name: "", color: COLORS[0] });
              }
            }}
            className="bg-[#C01D35] text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-[#A01728] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvelle catégorie
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSave} className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6 mb-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
                Nom *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Politique, Économie, Sports..."
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-2">
                Couleur
              </label>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({...formData, color})}
                    className={`w-full h-10 rounded-lg transition-all ${
                      formData.color === color ? "ring-2 ring-offset-2" : ""
                    }`}
                    style={{
                      backgroundColor: color,
                      ringColor: color
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#C01D35] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#A01728] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingId ? "Mettre à jour" : "Créer"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: "", color: COLORS[0] });
                }}
                className="px-4 py-2.5 rounded-lg border border-[#DEDBD4] dark:border-[#3a3a4e] text-[#7A7A7A] hover:bg-[#F2F1EE] dark:hover:bg-[#2a2a3e] transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#C01D35]" />
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] divide-y divide-[#DEDBD4] dark:divide-[#2a2a3e]">
            {categories.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#7A7A7A]">
                Aucune catégorie. Créez-en une !
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-[#F2F1EE] dark:hover:bg-[#12121e] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: cat.color }} />
                    <div>
                      <h3 className="font-semibold text-sm text-[#1A1A1A] dark:text-white">{cat.name}</h3>
                      <p className="text-xs text-[#7A7A7A]">{cat.slug}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#DEDBD4] dark:hover:bg-[#3a3a4e] text-[#7A7A7A]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-[#7A7A7A] hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-2xl text-sm font-semibold text-white ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
}
