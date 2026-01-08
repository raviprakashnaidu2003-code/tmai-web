"use client";

import { useState } from "react";
import CurrencySelect from "../currencyselectdropdown/currencyselectdropdown";

export const CURRENCIES = [
  { code: "USD", label: "US Dollar", flag: "🇺🇸" },
  { code: "INR", label: "Indian Rupee", flag: "🇮🇳" },
  { code: "EUR", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", label: "British Pound", flag: "🇬🇧" },
];

type ApiResponse = {
  convertedAmount: number;
  rate: number;
  from: string;
  to: string;
  amount: number;
};

export default function CurrencyConverter() {
   
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async () => {
    if (!amount || !from || !to) {
      setError("Please select amount, from and to currencies");
      return;
    }   ``

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `/api/currency/convert?from=${from}&to=${to}&amount=${amount}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("API error");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to fetch conversion rate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      {/* Header */}
      <div className="bg-blue-700 text-white p-4 rounded mb-6 text-lg font-semibold">
        🔁 Live Currency Exchange
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <CurrencySelect
          label="From"
          value={from}
          currencies={CURRENCIES}
          onChange={setFrom}
        />

        <CurrencySelect
          label="To"
          value={to}
          currencies={CURRENCIES}
          onChange={setTo}
        />
      </div>

      {/* Button */}
      <div className="mt-6">
        <button
          onClick={convert}
          className="bg-blue-100 text-white px-6 py-2 rounded hover:bg-blue-300"
        >
          Convert
        </button>
      </div>

      {/* Error */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Result */}
      {loading && <p className="mt-4">Loading...</p>}

      {result && !loading && (
        <div className="mt-6">
          <p className="text-xl font-semibold text-blue-600">
            {result.amount} {result.from} ={" "}
            {result.convertedAmount.toLocaleString()} {result.to}
          </p>

          <div className="text-sm text-gray-600 mt-2">
            <p>1 {result.from} = {result.rate} {result.to}</p>
            <p>
              1 {result.to} = {(1 / result.rate).toFixed(5)} {result.from}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
