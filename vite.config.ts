import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: true,
    manifest: true,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 500,
  },
  server: { proxy: { "/api": "http://127.0.0.1:8080" } },
  preview: { host: "127.0.0.1", port: 4173 },
});
