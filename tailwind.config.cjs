/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {    
      colors: {
        'cyan-custom': '#01c4fa',
      },
      fontFamily: {
        lobster: ['Lobster', 'cursive']
      },
    },
  },
  plugins: [],
}