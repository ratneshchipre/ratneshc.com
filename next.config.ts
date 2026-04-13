import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/rss",
        destination: "/rss.xml",
      },
      {
        source: "/registry/rss",
        destination: "/components/rss.xml",
      },
    ];
  },
};

export default nextConfig;
