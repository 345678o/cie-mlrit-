import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next's built-in optimizer needs `sharp`, which can't run on Cloudflare
    // Workers. Serve images as-is instead of paying for Cloudflare Images.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
};

export default nextConfig;
