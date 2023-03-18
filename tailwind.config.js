/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      p1: "#3F3B6C",
      p2: "#A3C7D6",
      p3: "#9F73AB",
      p4: "#624F82",
      s1: "#D5B1DF",
      t1: "#D0C7D2",
      s2: "#2B2757",
      s3: "#1D1A41",
      w1: "#FFFFFF",
    },
    extend: {
      
    },
    themes: ["cupcake", "dark", "cmyk"],
  

  },
  plugins: [require("daisyui")],
}
