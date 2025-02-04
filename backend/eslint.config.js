import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    rules: {
      "no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
        },
      ],
    },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
