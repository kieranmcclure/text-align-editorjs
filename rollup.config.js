import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/main.js",
    output: {
      name: "TextAlign",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [resolve(), commonjs(), terser()],
  },

  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: "src/main.js",
    output: [
      { file: pkg.main, format: "cjs", exports: "auto" }, // Explicitly set exports to auto
      { file: pkg.module, format: "es" },
    ],
    plugins: [resolve(), commonjs(), terser()],
  },
];
