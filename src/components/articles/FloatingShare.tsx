"use client";

import { useState, useEffect } from "react";
import { Share2, X } from "lucide-react";

interface FloatingShareProps {
  title: string;
  url: string;
}

export function FloatingShare({ title, url }: FloatingShareProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const channels = [
    {
      name: "WhatsApp",
      icon: "💬",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25D366",
    },
    {
      name: "X",
      icon: "𝕏",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "#000000",
    },
    {
      name: "LinkedIn",
      icon: "in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#0077B5",
    },
    {
      name: "Email",
      icon: "✉",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      color: "#4A4A4A",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[250] flex flex-col items-end gap-2">
      {open && (
        <div className="flex flex-col gap-2 mb-1 animate-in slide-in-from-bottom-2">
          {channels.map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-110 transition-transform"
              style={{ backgroundColor: ch.color }}
              aria-label={`Partager sur ${ch.name}`}
            >
              {ch.icon}
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-[#C01D35] text-white flex items-center justify-center shadow-lg hover:bg-[#A01728] transition-colors"
        aria-label={open ? "Fermer le menu de partage" : "Partager cet article"}
      >
        {open ? <X className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
