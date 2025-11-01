// astro.config.mjs
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import compress from "vite-plugin-compression";
import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";

const { WEB3FORMS_ACCESS_KEY } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  env: {
    schema: {
      WEB3FORMS_ACCESS_KEY: envField.string({ context: "server", access: "secret" })
    },
  },
  site: "https://www.weinerlebnistouren-pfalz.de",
  integrations: [react(), tailwind(), sitemap()],
  vite: {
    plugins: [
      compress({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 10240,
        deleteOriginFile: false,
        compressionOptions: { level: 11 },
      }),
      // Gzip (fallback)
      compress({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 10240,
        deleteOriginFile: false,
      }),
    ],
  },
});