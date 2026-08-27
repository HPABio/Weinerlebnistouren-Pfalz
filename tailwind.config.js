module.exports = {
  content: ["./src/**/*.{astro,js,jsx,ts,tsx,mdx,md}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        background: "#F4F0E6",
        text: "#4B3A2B",
        accent1: "#C8A974",
        accent2: {
          brick: "#B46B54",
          plum: "#55354E",
          wine: "#8A2D52",
        },
        soft: {
          beige: "#D8C7B5",
          sand: "#EAE3D5",
        },
        // shadcn/ui-Token: CSS-Variablen aus src/styles/global.css.
        // Nötig, weil die von shadcn generierten Styles (v4-Konvention)
        // unter Tailwind v3 sonst keine passenden Utility-Klassen finden.
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: "var(--destructive)",
      },
      borderRadius: {
        // shadcn/ui-Radius-Token
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        headline: ["Bona Nova SC", "serif"],
        body: ["Newsreader", "serif"],
        accent: ["Doulaise", "Monsieur La Doulaise", "cursive"],
        doulaise: ["Monsieur La Doulaise", "cursive"],
        meie: ["Meie Script", "cursive"],
        playfair: ["Playfair Display", "serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        inter: ["Inter", "sans-serif"],
        sourcesans: ["Source Sans 3", "Source Sans Pro", "sans-serif"],
        ballet: ["Ballet", "cursive"],
        bodoni: ["Bodoni Moda", "serif"],
        bonanova: ["Bona Nova SC", "serif"],
        dmserifdisplay: ["DM Serif Display", "serif"],
        dmseriftext: ["DM Serif Text", "serif"],
        gloock: ["Gloock", "serif"],
        caveat: ["Caveat", "cursive"],
        indie: ["Indie Flower", "cursive"],
        lusitana: ["Lusitana", "serif"],
      },
    },
  },
  plugins: [],
};
