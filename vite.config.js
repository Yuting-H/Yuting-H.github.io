import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Yuting-H.github.io is a GitHub Pages user site, so it is served from "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
