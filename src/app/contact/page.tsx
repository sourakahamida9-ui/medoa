"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-[820px] mx-auto px-6">
        <h1 className="font-serif text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] dark:text-white mb-4">
          Contact
        </h1>
        <p className="text-lg text-[#4A4A4A] dark:text-[#a0a0b0] mb-12">
          Vous avez une question, une suggestion ou souhaitez collaborer avec nous ? N&apos;hésitez pas à nous contacter.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <div>
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-green-800 dark:text-green-400">
                <h3 className="font-bold mb-2">Message envoyé</h3>
                <p className="text-sm">Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0D1B2A] dark:text-white mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0D1B2A] dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0D1B2A] dark:text-white mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
                    placeholder="Sujet de votre message"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0D1B2A] dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded-lg bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors resize-none"
                    placeholder="Votre message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C01D35] text-white font-bold px-8 py-3.5 rounded-lg hover:bg-[#A01728] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Envoyer"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#C01D35] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-[#0D1B2A] dark:text-white mb-1">
                  Email
                </h3>
                <p className="text-sm text-[#7A7A7A]">contact@lignerouge.media</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C01D35] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-[#0D1B2A] dark:text-white mb-1">
                  Adresse
                </h3>
                <p className="text-sm text-[#7A7A7A]">
                  Dakar, Sénégal<br />
                  Plateau, Rue Carnot
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#C01D35] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-[#0D1B2A] dark:text-white mb-1">
                  Téléphone
                </h3>
                <p className="text-sm text-[#7A7A7A]">+221 33 000 00 00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
