/** @type {import('tailwindcss').Config} */
const { Colors } = require("./constants");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: Colors,
    },
    screens: {
      xs: "320px",
      sm: "380px",
      md: "480px",
      lg: "680px",
      tablet: "744px",
      desktop: "1024px",
    },
  },
};
