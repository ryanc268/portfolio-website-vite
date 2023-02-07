/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        extra: "120%",
      },
      colors: {
        "cyan-custom": "#01c4fa",
      },
      fontFamily: {
        lobster: ["Lobster", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
    },
  },
  plugins: [],
};
