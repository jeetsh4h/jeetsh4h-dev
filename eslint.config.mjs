import { defineConfig, globalIgnores } from "eslint/config";
import * as mdx from "eslint-plugin-mdx";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import localMdx from "./tools/eslint-rules/index.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ...mdx.flat,
    files: ["**/*.{md,mdx}"],
  },
  {
    files: ["**/*.mdx"],
    plugins: {
      "local-mdx": localMdx,
    },
    rules: {
      "local-mdx/mdx-typecheck": "error",
    },
  },
  {
    files: ["diary/*.mdx"],
    rules: {
      "local-mdx/diary-entry-metadata": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
