import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,ts,tsx,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
  {
    ignores: [
      "dist",
      "node_modules",
      ".vscode",
      ".eslintrc.js",
      "**/*.config.ts",
      "vite-env.d.ts",
      "*.md"
    ],
    rules: {
      // 'vue/multi-word-component-names': 'off'
    }
  }
];