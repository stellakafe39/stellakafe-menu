import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// Standalone SPA build for Vercel — bypasses the Cloudflare/TanStack Start
// server adapter so Vite produces a standard index.html + assets bundle.
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: false }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist/spa",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./index.html",
        admin: "./admin.html",
      },
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
