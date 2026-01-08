"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../themetoggle/themetoggle";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-72 bg-white dark:bg-zinc-900 h-full p-6 flex flex-col shadow-xl">
            
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="self-end mb-4 p-2 rounded-md hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40"
            >
              <X size={24} />
            </button>

            {/* Menu Items */}
            <div className="flex flex-col gap-6 text-lg">
              <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
              <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            </div>

            {/* Login */}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-6 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 
              hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40 transition"
            >
              Login
            </Link>

            {/* Theme toggle */}
            <div className="mt-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
