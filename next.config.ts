import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-acefd57b6fc84cc7b0cca167ba207abd.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
