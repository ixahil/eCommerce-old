/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1536px",
      },
    },
    extend: {
      gridTemplateColumns: {
        12: "repeat(12, minmax(0, 1fr))",
        "1fr": "repeat(auto-fit, minmax(300px, 1fr))",
        "400px": "repeat(auto-fit, minmax(400px, 1fr))",
        "120px": "repeat(auto-fit, minmax(120px, 1fr))",
        "product-card": "repeat(auto-fit, minmax(250px, 1fr))",
      },
      colors: {
        accent: {
          DEFAULT: "#e1eb58",
          backend: "#bbf7d0",
        },
        success: "#4bb543",
        delete: "#d11a2a",
        primary: {
          DEFAULT: "#e1eb58",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shake: {
          "0% ": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-1px)" },
          "20%, 40%, 60%, 80%, 100%": { transform: "translateX(1px)" },
        },
      },
      animation: {
        slide: "slide 16s infinite linear",
        shake: "shake 1s infinite",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
