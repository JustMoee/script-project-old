/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    themes: ["cupcake", "dark", "cmyk"],
  

  },
  plugins: [require("daisyui")],
}
