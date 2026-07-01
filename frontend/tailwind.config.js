/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A", // Deep Midnight Navy
          light: "#1E293B",
          dark: "#020617"
        },
        secondary: {
          DEFAULT: "#00aeef", // New Logo Sky Blue
          light: "#40c5f4",
          dark: "#008bbf"
        },
        accent: {
          DEFAULT: "#f58320", // New Logo Orange
          light: "#f8a760",
          dark: "#c46410"
        },
        slateBg: "#F8FAFC", // Cool white background
        slateText: "#334155" // Muted dark text
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"]
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(15, 23, 42, 0.08)",
        glass: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
      }
    },
  },
  plugins: [],
}
