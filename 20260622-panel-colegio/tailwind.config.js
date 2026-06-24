/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./*.jsx" // Por si acaso tu App.jsx se quedó fuera de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
