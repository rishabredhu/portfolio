import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
      "plugin:@typescript-eslint/recommended",
      "next/core-web-vitals"
    ],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-console": "warn"
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@components", "./components"],
            ["@utils", "./utils"],
            ["@styles", "./styles"],
            ["@pages", "./pages"]],
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        }
      }
    }
  }
];