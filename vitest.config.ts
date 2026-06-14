import path from "node:path";

import mdx from "@mdx-js/rollup";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [mdx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
