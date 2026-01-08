import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Currency API
      {
        source: "/api/currency/convert",
        destination: "http://localhost:8080/api/currency/convert",
      },
        // Weather API (query params are automatic)
      {
        source: "/weather",
        destination: "http://localhost:8080/weather",
      },
      // Stock API
      {
        source: "/api/stocks",
        destination: "http://localhost:8080/api/stocks",
      },  
    ];
  },
};

export default nextConfig;