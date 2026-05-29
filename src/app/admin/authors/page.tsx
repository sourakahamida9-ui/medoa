"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit2, Loader2, CheckCircle2, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

interface Author {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

const ROLES = ["admin", "editor", "author"];

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({ name: "", email: "", role: "author", avatar: "" });

  // Fetch authors
  useEffect(() => {
    async function loadAuthors() {
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
          const data = await res.json();
          setAuthors(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        showToast("error", "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    }
    loadAuthors();
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast("error", "Nom et email sont obligatoires");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: editingId }),
      });

      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");

      showToast("success", editingId ? "Auteur mis à jour" : "Auteur créé");
      setFormData({ name: "", email: "", role: "author", avatar: "" });
      setEditingId(null);
      setShowForm(false);

      // Reload
      const authRes = await fetch("/api/admin/users");
      if (authRes.ok) {
        const data = await authRes.json();
        setAuthors(Array.isArray(data) ? data : []);
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
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      showToast("success", "Auteur supprimé");
      setAuthors(authors.filter(a => a.id !== id));
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Erreur");
    }
  };

  const handleEdit = (author: Author) => {
    setFormData({
      name: author.name,
      email: author.email,
      role: author.role,
      avatar: author.avatar || ""
    });
    setEditingId(author.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#F2F1EE] dark:bg-[#0f0f1a]">
      {/* Header */}
      <div className="bg-[#0D1B2A] text-white px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo variant="white" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50 border-l border-white/20 pl-4">
            Auteurs
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
            Auteurs
          </h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (editingId) {
                setEditingId(null);
                setFormData({ name: "", email: "", role: "author", avatar: "" });
              }
            }}
            className="bg-[#C01D35] text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-[#A01728] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvel auteur
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
                placeholder="John Doe"
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
                Rôle
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
                Avatar (URL)
              </label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                placeholder="https://..."
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
              />
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
                  setFormData({ name: "", email: "", role: "author", avatar: "" });
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
            {authors.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#7A7A7A]">
                Aucun auteur. Créez-en un !
              </div>
            ) : (
              authors.map((author) => (
                <div key={author.id} className="p-4 flex items-center justify-between hover:bg-[#F2F1EE] dark:hover:bg-[#12121e] transition-colors">
                  <div className="flex items-center gap-3">
                    {author.avatar && (
                      <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div>
                      <h3 className="font-semibold text-sm text-[#1A1A1A] dark:text-white">{author.name}</h3>
                      <p className="text-xs text-[#7A7A7A]">
                        {author.email} • <span className="capitalize">{author.role}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(author)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#DEDBD4] dark:hover:bg-[#3a3a4e] text-[#7A7A7A]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(author.id)}
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
            <X className="w-5 h-4" />
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
}
