// astro.config.mjs
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

const { WEB3FORMS_ACCESS_KEY } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// Bearbeitungs-Instanz (edit.weinerlebnistouren-pfalz.de): serverseitig
// gerendert, liest das CMS bei jedem Aufruf. Die öffentliche Website bleibt
// ein statischer Build ohne Abhängigkeit vom CMS zur Laufzeit.
const EDIT_MODE = process.env.CMS_EDIT_MODE === "1";

export default defineConfig({
  output: EDIT_MODE ? "server" : "static",
  ...(EDIT_MODE ? { adapter: node({ mode: "standalone" }) } : {}),
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
