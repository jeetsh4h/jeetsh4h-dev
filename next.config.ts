import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  /* the commit used for terminal prompt */
  // VERCEL_GIT_COMMIT_SHA for vercel
  // GITHUB_SHA for github actions
  // HEAD for local
  env: {
    NEXT_PUBLIC_COMMIT_SHA:
      process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "HEAD",
  },
  async headers() {
    return [
      {
        source: "/cv.pdf",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
    ];
  },
};

export default nextConfig;
