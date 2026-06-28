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
          DEFAULT: "#1E3A8A", // Royal Blue
          light: "#2563EB",
          dark: "#172554"
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber Gold
          dark: "#D97706", // Dark Accent Gold
          light: "#FBBF24"
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
