// astro.config.mjs
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";

const { WEB3FORMS_ACCESS_KEY } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

export default defineConfig({
  env: {
    schema: {
      WEB3FORMS_ACCESS_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  site: "https://www.weinerlebnistouren-pfalz.de",
  integrations: [react(), tailwind(), sitemap()],
  vite: {
    css: {
      devSourcemap: false
    },
    plugins: [],
  },
});
