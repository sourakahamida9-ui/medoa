"use client";

import { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from "lucide-react";

interface CityWeather {
  city: string;
  country: string;
  temp: number;
  condition: string;
  icon: string;
}

const fallbackWeather: CityWeather[] = [
  { city: "Dakar", country: "SN", temp: 28, condition: "Ensoleillé", icon: "sun" },
  { city: "Paris", country: "FR", temp: 18, condition: "Nuageux", icon: "cloud" },
  { city: "New York", country: "US", temp: 22, condition: "Partiellement nuageux", icon: "cloud-sun" },
  { city: "Londres", country: "GB", temp: 15, condition: "Pluvieux", icon: "rain" },
  { city: "Abidjan", country: "CI", temp: 30, condition: "Ensoleillé", icon: "sun" },
];

function WeatherIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "sun": return <Sun className={className} />;
    case "rain": return <CloudRain className={className} />;
    case "snow": return <CloudSnow className={className} />;
    case "wind": return <Wind className={className} />;
    default: return <Cloud className={className} />;
  }
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<CityWeather[]>(fallbackWeather);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const cities = ["Dakar", "Paris", "New York", "London", "Abidjan"];
        const results: CityWeather[] = [];
        for (const city of cities) {
          const res = await fetch(
            `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
            { next: { revalidate: 1800 } }
          );
          if (res.ok) {
            const data = await res.json();
            const current = data.current_condition?.[0];
            if (current) {
              const tempC = parseInt(current.temp_C, 10);
              const desc = current.weatherDesc?.[0]?.value || "N/A";
              let iconType = "cloud";
              const code = parseInt(current.weatherCode, 10);
              if (code === 113) iconType = "sun";
              else if ([176, 263, 266, 293, 296, 299, 302, 305, 308, 356, 359].includes(code)) iconType = "rain";
              else if ([227, 230, 320, 323, 326, 329, 332, 335, 338, 368, 371].includes(code)) iconType = "snow";
              results.push({
                city: city === "London" ? "Londres" : city,
                country: "",
                temp: tempC,
                condition: desc,
                icon: iconType,
              });
            }
          }
        }
        if (results.length > 0) setWeather(results);
      } catch {
        // Use fallback data
      }
    }
    fetchWeather();
  }, []);

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#DEDBD4] dark:border-[#2a2a3e]">
        <h3 className="text-xs font-bold tracking-wider uppercase text-[#0D1B2A] dark:text-white">
          Météo Internationale
        </h3>
      </div>
      <div className="divide-y divide-[#DEDBD4] dark:divide-[#2a2a3e]">
        {weather.map((w) => (
          <div key={w.city} className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2.5">
              <WeatherIcon icon={w.icon} className="w-4 h-4 text-[#7A7A7A]" />
              <span className="text-xs font-semibold text-[#0D1B2A] dark:text-white">{w.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A7A7A] hidden sm:inline">{w.condition}</span>
              <span className="text-sm font-bold text-[#0D1B2A] dark:text-white">{w.temp}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
