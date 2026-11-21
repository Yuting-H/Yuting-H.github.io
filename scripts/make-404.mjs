// GitHub Pages serves 404.html for unknown paths. Copying the built
// index.html there lets the client-side router handle deep links such as
// /calculator on a hard refresh.
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const indexFile = join(dist, "index.html");

if (!existsSync(indexFile)) {
  console.error("dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

copyFileSync(indexFile, join(dist, "404.html"));
console.log("Created dist/404.html for GitHub Pages SPA fallback.");
