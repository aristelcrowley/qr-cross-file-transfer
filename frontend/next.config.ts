import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // <--- ADD THIS
  images: {
    unoptimized: true,   // <--- ADD THIS (Next/Image won't work without a Node server otherwise)
  },
};

export default nextConfig;