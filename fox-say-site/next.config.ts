import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = isGithubActions && repositoryName ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

const withNextIntl = createNextIntlPlugin("./src/app/i18n/request.ts");
export default withNextIntl(nextConfig);
