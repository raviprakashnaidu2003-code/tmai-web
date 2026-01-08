import "./globals.css";
import Navigation from "@/app/components/navigation/navigation";
import type { Metadata } from "next";
import Footer from "@/app/components/footer/footer";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ThreeMatrix.AI",
  description: "AI-powered solutions",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
