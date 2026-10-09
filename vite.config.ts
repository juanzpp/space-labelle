import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Standalone Vite/TanStack Start configuration; no Lovable build plugin.
export default defineConfig({
  plugins: [tsconfigPaths(), tanstackStart(), viteReact(), tailwindcss()],
  server: { host: "0.0.0.0" },
});
