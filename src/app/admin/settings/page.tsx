"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  Globe,
  Database,
  Shield,
  Palette,
  Bell,
  Loader2,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export default function SettingsPage() {
  const [siteName] = useState("Ligne Rouge");
  const [siteDescription] = useState(
    "Plateforme d'information internationale indépendante"
  );
  const [dbStatus, setDbStatus] = useState<"connected" | "disconnected" | "loading">("loading");

  useEffect(() => {
    async function checkDb() {
      try {
        const res = await fetch("/api/admin/articles?limit=1");
        setDbStatus(res.ok ? "connected" : "disconnected");
      } catch {
        setDbStatus("disconnected");
      }
    }
    checkDb();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#F2F1EE] dark:bg-[#0f0f1a]">
      <div className="bg-[#0D1B2A] text-white px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo variant="white" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50 border-l border-white/20 pl-4">
            Paramètres
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Site Info */}
        <section className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-[#C01D35]" />
            <h2 className="text-lg font-serif font-bold text-[#0D1B2A] dark:text-white">
              Informations du site
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
                Nom du site
              </label>
              <input
                type="text"
                value={siteName}
                readOnly
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-[#F2F1EE] dark:bg-[#12121e] text-[#1A1A1A] dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
                Description
              </label>
              <input
                type="text"
                value={siteDescription}
                readOnly
                className="w-full text-sm px-4 py-2.5 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-[#F2F1EE] dark:bg-[#12121e] text-[#1A1A1A] dark:text-white outline-none"
              />
            </div>
          </div>
        </section>

        {/* Database Status */}
        <section className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-[#C01D35]" />
            <h2 className="text-lg font-serif font-bold text-[#0D1B2A] dark:text-white">
              Base de données
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {dbStatus === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#7A7A7A]" />
            ) : dbStatus === "connected" ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Supabase connectée — PostgreSQL opérationnel
                </span>
              </>
            ) : (
              <>
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                  Mode local — base de données non connectée
                </span>
              </>
            )}
          </div>
        </section>

        {/* Security */}
        <section className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[#C01D35]" />
            <h2 className="text-lg font-serif font-bold text-[#0D1B2A] dark:text-white">
              Sécurité
            </h2>
          </div>
          <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] mb-4">
            Toutes les routes d&apos;administration sont protégées par un système d&apos;authentification avec session sécurisée.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </section>

        {/* Theme */}
        <section className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-[#C01D35]" />
            <h2 className="text-lg font-serif font-bold text-[#0D1B2A] dark:text-white">
              Apparence
            </h2>
          </div>
          <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0]">
            Le thème du site (clair/sombre) est géré automatiquement par les préférences système de l&apos;utilisateur avec possibilité de basculer manuellement.
          </p>
        </section>

        {/* Notifications */}
        <section className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#C01D35]" />
            <h2 className="text-lg font-serif font-bold text-[#0D1B2A] dark:text-white">
              Notifications
            </h2>
          </div>
          <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0]">
            Les alertes Breaking News sont gérées depuis le tableau de bord principal. Les notifications toast s&apos;affichent automatiquement lors de la publication d&apos;articles.
          </p>
        </section>
      </div>
    </div>
  );
}
