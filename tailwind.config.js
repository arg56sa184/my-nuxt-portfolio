import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue",
    "./pages/**/*.vue",
    "./components/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
}