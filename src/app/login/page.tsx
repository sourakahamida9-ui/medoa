"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur de connexion");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo variant="white" />
          </div>
          <h1 className="text-white text-xl font-serif font-bold">
            Espace Administration
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Connectez-vous pour accéder au tableau de bord
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl p-8 space-y-5"
        >
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A7A]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lignerouge.info"
                autoComplete="email"
                className="w-full text-sm pl-10 pr-4 py-3 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-[#F2F1EE] dark:bg-[#12121e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] focus:ring-1 focus:ring-[#C01D35] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider block mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A7A]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                autoComplete="current-password"
                className="w-full text-sm pl-10 pr-12 py-3 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-[#F2F1EE] dark:bg-[#12121e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] focus:ring-1 focus:ring-[#C01D35] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-[#0D1B2A] dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C01D35] text-white text-sm font-bold py-3 rounded-lg hover:bg-[#A01728] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Se connecter
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#7A7A7A] mt-4">
            Accès réservé à l&apos;équipe éditoriale de Ligne Rouge
          </p>
        </form>
      </div>
    </div>
  );
}
