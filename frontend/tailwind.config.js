// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
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
        primary: "#61BEE6",
        border: {
          primary: "#E3E9F0",
          secondary: "#E0E0E0",
        },
        text: {
          primary: "#4898CC",
          secondary: "#68768B",
          tertiary: "#1F3048",
        },
      },
      backgroundImage: {
        "sidebar-gradient":
          "linear-gradient(90deg, #65C0D8 0%, #4898CC 50%, #2E77C3 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".3" },
        },
      },
      fontFamily: {
        "articulat-cf-medium": ["var(--font-articulat-cf-medium)"],
        "articulat-cf-normal": ["var(--font-articulat-cf-normal)"],
        "articulat-cf-bold": ["var(--font-articulat-cf-bold)"],
      },
      boxShadow: {
        sidebar: "0px 4px 116px 2px rgba(0, 0, 0, 0.15)",
        navbar: "0px 4px 9.1px -2px rgba(0, 0, 0, 0.1)",
        card: "1px 1px 15.2px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
