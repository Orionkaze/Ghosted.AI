import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          elevated: "var(--color-bg-elevated)",
        },
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        teal: {
          DEFAULT: "var(--color-teal)",
          dim: "var(--color-teal-dim)",
        },
        green: "var(--color-green)",
        blue: "var(--color-blue)",
        red: "var(--color-red)",
        yellow: "var(--color-yellow)",
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        }
      },
    },
  },
  plugins: [],
};
export default config;
