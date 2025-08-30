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
          100: "#EDE9FE",
          600: "#7C3AED",
          700: "#5B21B6",
        },
        secondary: {
          600: "#22C55E",
        },
      },
    },
  },
  plugins: [],
}