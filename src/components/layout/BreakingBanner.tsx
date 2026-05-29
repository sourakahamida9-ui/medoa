"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface BreakingAlert {
  id: string;
  message: string;
  url?: string;
  priority: "high" | "medium";
}

const defaultAlerts: BreakingAlert[] = [
  {
    id: "brk-1",
    message: "ALERTE — Sommet extraordinaire de l'Union Africaine à Addis-Abeba : les chefs d'État réunis pour discuter de la crise sécuritaire au Sahel",
    url: "/article/nouveaux-enjeux-geopolitiques-afrique-ouest",
    priority: "high",
  },
];

export function BreakingBanner() {
  const [alerts, setAlerts] = useState<BreakingAlert[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch("/api/breaking");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setAlerts(data);
            return;
          }
        }
      } catch {
        // fallback
      }
      setAlerts(defaultAlerts);
    }
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60_000);
    return () => clearInterval(interval);
  }, []);

  const visible = alerts.filter((a) => !dismissed.has(a.id));
  if (visible.length === 0) return null;

  const alert = visible[0];

  return (
    <div
      className={`relative ${
        alert.priority === "high"
          ? "bg-[#C01D35] text-white"
          : "bg-yellow-500 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2 sm:gap-3">
        <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse" />
        <div className="flex-1 overflow-hidden min-w-0">
          {alert.url ? (
            <a
              href={alert.url}
              className="text-[0.7rem] sm:text-xs font-bold tracking-wide hover:underline block truncate"
            >
              {alert.message}
            </a>
          ) : (
            <span className="text-[0.7rem] sm:text-xs font-bold tracking-wide block truncate">
              {alert.message}
            </span>
          )}
        </div>
        <button
          onClick={() => setDismissed((prev) => new Set([...prev, alert.id]))}
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Fermer l'alerte"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
