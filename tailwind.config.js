/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['Dancing Script', 'cursive'],
        'text': ['Playfair Display',' serif'],
        'text2': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}

