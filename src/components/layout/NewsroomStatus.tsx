"use client";

import { useSyncExternalStore, useCallback } from "react";

const timezones = [
  { city: "Dakar", tz: "Africa/Dakar", flag: "🇸🇳" },
  { city: "Paris", tz: "Europe/Paris", flag: "🇫🇷" },
  { city: "New York", tz: "America/New_York", flag: "🇺🇸" },
  { city: "Londres", tz: "Europe/London", flag: "🇬🇧" },
];

function formatTimes(): Record<string, string> {
  const now = new Date();
  const result: Record<string, string> = {};
  for (const zone of timezones) {
    result[zone.tz] = now.toLocaleTimeString("fr-FR", {
      timeZone: zone.tz,
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return result;
}

let cachedTimes = formatTimes();
let listeners: Array<() => void> = [];

if (typeof window !== "undefined") {
  setInterval(() => {
    cachedTimes = formatTimes();
    for (const l of listeners) l();
  }, 30_000);
}

function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => { listeners = listeners.filter((l) => l !== cb); };
}

function getSnapshot() { return cachedTimes; }
function getServerSnapshot(): Record<string, string> { return {}; }

export function NewsroomStatus() {
  const times = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isServer = useCallback(() => Object.keys(times).length === 0, [times]);

  if (isServer()) return null;

  return (
    <div className="bg-[#0D1B2A] text-white py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-semibold tracking-wider uppercase text-green-400">
            Rédaction en ligne
          </span>
          <span className="text-white/40 hidden sm:inline">— Couverture 24/7</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {timezones.map((zone) => (
            <div key={zone.tz} className="flex items-center gap-1.5 text-white/60">
              <span>{zone.flag}</span>
              <span className="font-medium text-white/80">
                {times[zone.tz] || "--:--"}
              </span>
              <span className="text-white/40">{zone.city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
