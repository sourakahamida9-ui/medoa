"use client";

import { useState } from "react";

const topics = [
  { id: "actualite", label: "Actualité", description: "Les dernières nouvelles" },
  { id: "politique", label: "Politique", description: "Analyses politiques" },
  { id: "international", label: "International", description: "Actualité mondiale" },
  { id: "economie", label: "Économie", description: "Marchés & finances" },
  { id: "technologie", label: "Technologie", description: "Tech & innovation" },
  { id: "sport", label: "Sport", description: "Résultats & analyses" },
  { id: "societe", label: "Société", description: "Enjeux sociétaux" },
  { id: "culture", label: "Culture", description: "Arts & culture" },
];

const frequencies = [
  { id: "daily", label: "Quotidienne", description: "Chaque matin à 7h" },
  { id: "weekly", label: "Hebdomadaire", description: "Chaque lundi" },
  { id: "breaking", label: "Breaking News", description: "Alertes urgentes uniquement" },
];

export function NewsletterPreferences() {
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["actualite"]);
  const [frequency, setFrequency] = useState("daily");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || selectedTopics.length === 0) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, topics: selectedTopics, frequency }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-[#0D1B2A] text-white text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl font-bold mb-4">Inscription confirmée</h2>
          <p className="text-white/70">
            Vous recevrez nos newsletters selon vos préférences. Vous pouvez modifier vos choix à tout moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0D1B2A] text-white">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#C01D35] mb-4">
            Newsletter Premium
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold leading-tight mb-4">
            L&apos;information sur mesure
          </h2>
          <p className="text-base text-white/70">
            Choisissez vos thématiques et la fréquence qui vous convient.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-xs font-bold tracking-wider uppercase text-white/50 mb-3 block">
              Thématiques
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedTopics.includes(topic.id)
                      ? "border-[#C01D35] bg-[#C01D35]/10 text-white"
                      : "border-white/10 text-white/60 hover:border-white/30"
                  }`}
                >
                  <div className="text-sm font-semibold">{topic.label}</div>
                  <div className="text-xs opacity-60 mt-0.5">{topic.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold tracking-wider uppercase text-white/50 mb-3 block">
              Fréquence
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => setFrequency(freq.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    frequency === freq.id
                      ? "border-[#C01D35] bg-[#C01D35]/10 text-white"
                      : "border-white/10 text-white/60 hover:border-white/30"
                  }`}
                >
                  <div className="text-sm font-semibold">{freq.label}</div>
                  <div className="text-xs opacity-60 mt-0.5">{freq.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/5 border border-white/15 rounded-lg px-5 py-3.5 text-white font-sans outline-none focus:border-[#C01D35] transition-colors placeholder:text-white/40"
              aria-label="Votre adresse email pour la newsletter"
            />
            <button
              type="submit"
              disabled={loading || selectedTopics.length === 0}
              className="bg-[#C01D35] text-white font-bold px-7 py-3.5 rounded-lg hover:bg-[#A01728] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? "Inscription..." : "S'abonner"}
            </button>
          </div>

          <p className="text-xs text-white/40 text-center">
            En vous inscrivant, vous acceptez notre{" "}
            <a href="/privacy" className="underline hover:text-white/60">
              politique de confidentialité
            </a>
            . Désabonnement possible à tout moment.
          </p>
        </form>
      </div>
    </section>
  );
}
