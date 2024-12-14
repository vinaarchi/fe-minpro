import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        customDarkNavy: "rgb(18, 31, 47)",
        customSlateBlue: "rgb(43, 50, 78)",
        customMignightBlue: "rgb(20, 29, 46)",
        customDeppNavy: "rgb(19, 31, 47)",
        customCharcoalBlue: "rgb(19, 28, 45)",
      },
    },
  },
  plugins: [],
} satisfies Config;
