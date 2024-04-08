const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Rubik", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        veryDarkGray: "hsl(var(--veryDarkGray) / <alpha-value>)",
        darkGray: "hsl(var(--darkGray) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
