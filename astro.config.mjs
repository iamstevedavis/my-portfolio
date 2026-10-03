// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://visda.ca",
  // Preserve Astro 5's HTML whitespace behavior during the Astro 7 upgrade.
  compressHTML: true,
  integrations: [react(), sitemap()],
  vite: {
      plugins: [tailwindcss()],
  },
});
