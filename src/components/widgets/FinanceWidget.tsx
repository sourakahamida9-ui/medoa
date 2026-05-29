"use client";

import { useCallback, useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

interface CurrencyRate {
  pair: string;
  rate: number;
  change: number;
  flag: string;
}

interface IndexData {
  name: string;
  value: string;
  change: number;
}

const fallbackCurrencies: CurrencyRate[] = [
  { pair: "EUR/XOF", rate: 655.957, change: 0, flag: "🇪🇺" },
  { pair: "USD/XOF", rate: 605.42, change: -0.12, flag: "🇺🇸" },
  { pair: "GBP/XOF", rate: 764.33, change: 0.25, flag: "🇬🇧" },
  { pair: "EUR/USD", rate: 1.0835, change: 0.08, flag: "🇪🇺" },
];

const fallbackIndices: IndexData[] = [
  { name: "BRVM Composite", value: "234.56", change: 1.2 },
  { name: "CAC 40", value: "7,892.45", change: -0.34 },
  { name: "S&P 500", value: "5,432.10", change: 0.56 },
  { name: "FTSE 100", value: "8,234.78", change: 0.12 },
];

export function FinanceWidget() {
  const [currencies, setCurrencies] = useState<CurrencyRate[]>(fallbackCurrencies);
  const [indices] = useState<IndexData[]>(fallbackIndices);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
      if (res.ok) {
        const data = await res.json();
        setCurrencies([
          { pair: "EUR/XOF", rate: data.rates.XOF || 655.957, change: 0, flag: "🇪🇺" },
          { pair: "USD/XOF", rate: (data.rates.XOF || 655.957) / (data.rates.USD || 1.08), change: -0.12, flag: "🇺🇸" },
          { pair: "GBP/XOF", rate: (data.rates.XOF || 655.957) / (data.rates.GBP || 0.86), change: 0.25, flag: "🇬🇧" },
          { pair: "EUR/USD", rate: data.rates.USD || 1.0835, change: 0.08, flag: "🇪🇺" },
        ]);
        setLastUpdate(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch {
      // Use fallback data
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#DEDBD4] dark:border-[#2a2a3e]">
        <h3 className="text-xs font-bold tracking-wider uppercase text-[#0D1B2A] dark:text-white">
          Marchés & Devises
        </h3>
        <div className="flex items-center gap-2">
          {lastUpdate && (
            <span className="text-[0.65rem] text-[#7A7A7A]">{lastUpdate}</span>
          )}
          <button
            onClick={fetchRates}
            disabled={loading}
            className="text-[#7A7A7A] hover:text-[#0D1B2A] dark:hover:text-white transition-colors"
            aria-label="Actualiser les cours"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="divide-y divide-[#DEDBD4] dark:divide-[#2a2a3e]">
        {currencies.map((c) => (
          <div key={c.pair} className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-sm">{c.flag}</span>
              <span className="text-xs font-semibold text-[#0D1B2A] dark:text-white">{c.pair}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#0D1B2A] dark:text-white">
                {c.rate.toFixed(c.rate > 100 ? 2 : 4)}
              </span>
              <span className={`flex items-center gap-0.5 text-[0.65rem] font-semibold ${
                c.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}>
                {c.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {c.change >= 0 ? "+" : ""}{c.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#DEDBD4] dark:border-[#2a2a3e] px-4 py-2">
        <span className="text-[0.65rem] font-bold tracking-wider uppercase text-[#7A7A7A]">Indices</span>
      </div>
      <div className="divide-y divide-[#DEDBD4] dark:divide-[#2a2a3e]">
        {indices.map((idx) => (
          <div key={idx.name} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-xs font-semibold text-[#0D1B2A] dark:text-white">{idx.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#0D1B2A] dark:text-white">{idx.value}</span>
              <span className={`flex items-center gap-0.5 text-[0.65rem] font-semibold ${
                idx.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}>
                {idx.change >= 0 ? "+" : ""}{idx.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
