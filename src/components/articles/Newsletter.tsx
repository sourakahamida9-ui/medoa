"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="py-20 bg-[#0D1B2A] text-white text-center">
      <div className="max-w-[600px] mx-auto px-6">
        <div className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#C01D35] mb-4">
          Newsletter
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold leading-tight mb-4">
          L&apos;information, directement chez vous
        </h2>
        <p className="text-base text-white/70 mb-8">
          Recevez chaque matin les articles les plus importants sélectionnés par
          la rédaction de Ligne Rouge.
        </p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400 font-medium">
            Merci pour votre inscription ! Vous recevrez notre prochaine newsletter.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto mb-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/5 border border-white/15 rounded px-5 py-3.5 text-white font-sans outline-none focus:border-[#C01D35] transition-colors placeholder:text-white/40"
              aria-label="Votre adresse email"
            />
            <button
              type="submit"
              className="bg-[#C01D35] text-white font-bold px-7 py-3.5 rounded hover:bg-[#A01728] transition-colors"
            >
              S&apos;abonner
            </button>
          </form>
        )}

        <p className="text-xs text-white/50">
          En vous inscrivant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
    </section>
  );
}
