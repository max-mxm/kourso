import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Technical articles and guides are written directly in TSX, often in French.
      // Escaping every apostrophe makes long-form content much harder to maintain.
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: [
      "app/demos/_components/heavy-list-examples.tsx",
      "app/demos/_components/performance-demo.tsx",
    ],
    rules: {
      // These demos intentionally run expensive/impure work so readers can measure
      // bad vs optimized rendering strategies in the browser.
      "react-hooks/purity": "off",
    },
  },
  {
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "remotion/**",
  ]),
]);

export default eslintConfig;
