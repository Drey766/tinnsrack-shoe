import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0808",
          dark: "#141010",
          dark2: "#1E1818",
          mid: "#332826",
          muted: "#A08C82",
          light: "#E8DCD4",
          white: "#FAF6F2",
          gold: "#C9A227",
          "gold-light": "#E0BC46",
          "gold-dark": "#A5851C",
          blush: "#C97D8C",
          "blush-light": "#DB9AA6",
          wine: "#7A2E3A",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        accent: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-dmsans)", "sans-serif"],
      },
      keyframes: {
        "gold-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "gold-shimmer": "gold-shimmer 3s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
