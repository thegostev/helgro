import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";  
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://sandsonte-astro.pages.dev",
  integrations: [tailwindcss(), sitemap(), mdx()],
});
