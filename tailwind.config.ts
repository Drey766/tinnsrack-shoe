import type { Config } from "tailwindcss";

// "Tissue & Bordeaux" — drawn from the inside of a good shoe box:
// rose-tinted tissue paper, a deep bordeaux lid, and a touch of foil stamping.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "#FAF7F5",
        tissue: { DEFAULT: "#F1E7E4", deep: "#E8DAD6" },
        bordeaux: { DEFAULT: "#4A1426", deep: "#360D1B", soft: "#6B2A3E" },
        ink: "#231F20",
        stone: "#857A77",
        line: "#E4D8D4",
        foil: "#A8875A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", '"Bodoni 72"', "serif"],
        sans: ["var(--font-sans)", "Futura", "system-ui", "sans-serif"],
      },
      fontSize: {
        // A classical-ish scale (≈1.25 ratio), tuned for Bodoni's high contrast.
        xs: ["0.8125rem", { lineHeight: "1.5" }],
        sm: ["0.9375rem", { lineHeight: "1.6" }],
        base: ["1.0625rem", { lineHeight: "1.7" }],
      },
      letterSpacing: {
        display: "-0.02em",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        unveil: {
          "0%": { clipPath: "inset(100% 0 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 1s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        unveil: "unveil 1.4s cubic-bezier(0.7, 0, 0.2, 1) both",
        "slide-in": "slide-in 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "fade-in": "fade-in 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
