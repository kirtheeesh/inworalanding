import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

let rawPort = process.env.PORT;

// Provide a sensible default for local development if PORT is not set
if (!rawPort) {
  rawPort = '5173';
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Default BASE_PATH to root for local development
const basePath = process.env.BASE_PATH ?? '/';

// The PHP backend the dev server proxies /api, /admin and /uploads to, so the
// admin panel opens at <frontend>/admin and the API is same-origin (no CORS).
const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:8000';

// `changeOrigin: false` keeps the original Host header (e.g. localhost:5173),
// so links the PHP backend generates point back at the frontend origin.
const backendProxy = {
  '/api': { target: backendUrl, changeOrigin: false },
  '/admin': { target: backendUrl, changeOrigin: false },
  '/uploads': { target: backendUrl, changeOrigin: false },
};

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
  "@assets": path.resolve(import.meta.dirname, "public", "assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: backendProxy,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: backendProxy,
  },
});
