/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        scrollbar: '#FFA500', 
        scrollbarHover: '#FF8C00', 
      },
    },
  },
  plugins: [],
}