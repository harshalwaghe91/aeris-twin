/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#07130f", mint: "#7fffc7", lime: "#d6ff65", fog: "#edf7f2" },
      fontFamily: { sans: ["DM Sans", "sans-serif"], display: ["Manrope", "sans-serif"] },
      boxShadow: { glow: "0 20px 70px -25px rgba(83, 255, 183, .35)" }
    }
  },
  plugins: []
};
