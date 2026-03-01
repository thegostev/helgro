import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";  
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://helgro.com/",
  integrations: [tailwindcss(), sitemap(), mdx()],
});
