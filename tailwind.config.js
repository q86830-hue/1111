/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFD93D', orange: '#FF8400', green: '#6BCB77',
          blue: '#4D96FF', pink: '#FF6B6B', purple: '#9D4EDD'
        }
      }
    },
  },
  plugins: [],
}