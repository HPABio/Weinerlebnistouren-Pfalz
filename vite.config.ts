import { defineConfig } from "vite";

export default defineConfig({
  preview: {
    allowedHosts: [
      "weinerlebnistouren-pfalz.de",
      ".weinerlebnistouren-pfalz.de",
      "weinerlebnistouren-heyl.de",
      ".weinerlebnistouren-heyl.de"
    ],
    host: "0.0.0.0",
    port: 80,
  },
});
