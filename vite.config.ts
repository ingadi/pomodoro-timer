import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants/index.ts"),
      "@types": path.resolve(__dirname, "./src/types/index.d.ts"),
    },
  },
  base: "",
  root: "",
  build: {
    outDir: "./docs",
    emptyOutDir: true,
  },
});
