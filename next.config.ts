import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env["NEXT_PUBLIC_FILE_SHARE"]}`,
        port: "",
        pathname: "/media/pictures/**",
        search: "",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@/components"],
  },
};

export default nextConfig;
