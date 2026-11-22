import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
};

export default createNextIntlPlugin("./src/app/i18n/request.ts")(nextConfig);
