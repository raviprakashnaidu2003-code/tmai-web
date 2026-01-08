"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-neutral-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">
        {/* Branding */}
        <h2 className="text-2xl font-bold tracking-tight">
          ThreeMatrix<span className="text-primary">.AI</span>
        </h2>

        {/* Tagline */}
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          AI-powered intelligence for modern businesses.
        </p>

        {/* Links */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <a
            href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-primary transition"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-primary transition"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-primary transition"
          >
            Privacy
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 dark:text-gray-500 text-xs mt-8">
          © {new Date().getFullYear()} ThreeMatrix.AI — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
