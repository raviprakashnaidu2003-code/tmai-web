"use client";

import { useState } from "react";

export const NSE_STOCKS = [
  { code: "RELIANCE", name: "Reliance Industries", sector: "Energy" },
  { code: "TCS", name: "Tata Consultancy Services", sector: "IT" },
  { code: "INFY", name: "Infosys", sector: "IT" },
  { code: "HDFCBANK", name: "HDFC Bank", sector: "Banking" },
  { code: "ICICIBANK", name: "ICICI Bank", sector: "Banking" },
  { code: "LT", name: "Larsen & Toubro", sector: "Infrastructure" },
  { code: "SBIN", name: "State Bank of India", sector: "Banking" },
  { code: "ITC", name: "ITC Limited", sector: "FMCG" },
];


type Stock = {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
};

export default function StockPrice() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStock = async () => {
    if (!symbol) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/stocks?symbol=${symbol.toUpperCase()}`);
      if (!res.ok) throw new Error();

      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to fetch stock data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white shadow rounded p-6">
      <div className="bg-indigo-600 text-white p-3 rounded mb-4">
        📈 Live Stock Price
      </div>

      <div className="flex gap-3">
        <input
          placeholder="RELIANCE, TCS, INFY"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={fetchStock}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Get
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {data && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">{data.symbol}</h2>
          <p className="text-2xl font-bold">₹ {data.price}</p>

          <p
            className={`mt-1 ${
              data.change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {data.change} ({data.percentChange}%)
          </p>
        </div>
      )}
    </div>
  );
}
