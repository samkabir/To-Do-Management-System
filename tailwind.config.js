/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green":"#17c769",
        "darkGreen":"#2a985d",
        "newGreen":"#16A637",
        "orange":"#FFA500",
        "lightOrange":"#fff5d1",
        "yellow":"#ffd231",
        "darkYellow":"#ffc700",
        "lighterGrey":"#f7f7f7",
        "grey":"#ededed",
        "lightGrey":"#EAEAEA",
        "darkGrey":"#848484",
        "red":"#f3274c",
        "darkRed":"#94122a",
        "lightBlack":"#363636",
        scrollbar: '#FFA500', 
        scrollbarHover: '#FF8C00', 
      },
    },
  },
  plugins: [],
}