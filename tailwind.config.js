/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '3s': '3s',
      },
      transitionTimingFunction: {
        'ease-in': 'ease-in',
      },
    },
  },
  plugins: [require("daisyui")],
}

