import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00875a",
          primary: "#00875a", // Official Viator Emerald Green
          hover: "#00704a",
          dark: "#004f34",
          light: "#e6f3ee",
          subtle: "#f0f7f4",
          accent: "#d93025", // "Likely to Sell Out" alert badge
          gold: "#e39a00",   // Star ratings
          badge: "#1a5336",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          150: "#eeeeee",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        cardHover: "0 6px 16px rgba(0, 0, 0, 0.12)",
        sidebar: "0 4px 20px rgba(0, 0, 0, 0.1)",
        modal: "0 10px 40px rgba(0, 0, 0, 0.2)",
      },
      fontFamily: {
        sans: [
          "var(--font-aeonik)",
          "Aeonik",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        aeonik: [
          "var(--font-aeonik)",
          "Aeonik",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
