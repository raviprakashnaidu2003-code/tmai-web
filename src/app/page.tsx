import CurrencyConverter from "./components/currencyconverter/currencyconverter";
import WeatherChecker from "./components/weatherchecking/weatherchecking";

import StockPrice from "./components/stockprice/stockprice";
export default function HomePage() {
  return (
    <main className="min-h-screen dark:bg-zinc-950">
     <section className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
        {/* Logo / Company Name */}
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Welcome to <span className="text-blue-600 dark:text-blue-400">ThreeMatrix.AI !!</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          Build ultra-scalable AI systems using modern components, blazing-fast 
          infrastructure, and a next-generation developer experience.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/products"
            className="px-6 py-3 rounded-full bg-blue-600 text-white dark:bg-blue-500 
                       hover:bg-blue-700 dark:hover:bg-blue-400 transition shadow-sm"
          >
            Explore Products
          </a>

          <a
            href="/contact"
            className="px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Contact Us
          </a>
        </div>
        <CurrencyConverter />
        <WeatherChecker />
         <StockPrice /> 
      </section>
    </main>
  );
}
