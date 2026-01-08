"use client";

import Link from "next/link";
import ThemeToggle from "../themetoggle/themetoggle";
import MobileMenu from "../mobilemenu/mobilemenu";
import "./navigation.css";

export default function Navigation() {
  return (
    <nav className="navbar-gradient border-b border-white/20 dark:border-zinc-700/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img src="/threematrix.svg" className="w-10 h-10" alt="logo" />
          <div className="font-semibold text-lg tracking-wide">ThreeMatrix</div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/products">Products</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Login + Theme */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-zinc-700 hover:bg-white/30 dark:hover:bg-black/30 transition"
          >
            Login
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
