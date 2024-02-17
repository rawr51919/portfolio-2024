import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import robotsTxt from 'astro-robots-txt';
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "./src/consts";
// import node from "@astrojs/node"; .
import vercel from '@astrojs/vercel/serverless';
import vitePwa from "@vite-pwa/astro";
import compress from "astro-compress";
import lighthouse from "astro-lighthouse";
import critters from "astro-critters";
import icon from "astro-icon";
const defaultLocale = DEFAULT_LOCALE;
const locales = LOCALES;
// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  build: {
    format: "directory",
    minify: true,
    esbuild: {
      target: 'es5' // Transpile to ES5 for broader browser support
    }
  },
  vite: {
    logLevel: "error",
    define: {
      __DATE__: `'${new Date()}'`
    }
  },
  integrations: [mdx(), robotsTxt(), sitemap({
    i18n: {
      locales,
      defaultLocale
    },
    filter: filterSitemapByDefaultLocale({
      defaultLocale
    })
  }), tailwind({
    applyBaseStyles: false
  }), alpinejs(), i18n({
    locales,
    defaultLocale,
    exclude: ["pages/api/**/*", "pages/rss.xml.ts", "pages/[locale]/rss.xml.ts"]
  }), vitePwa(), compress(), lighthouse(), critters(), icon()],
  output: "server",
  adapter: vercel({
  imageService: true,
  }),
//   adapter: node({
//     mode: "standalone",
//     standalone: true
//   }),
});
