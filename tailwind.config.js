/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d82622",
        "primary-hover": "#eb3834",
        secondary: "#ecf0f4",
        "secondary-hover": "#f5f6f7",
        grey: "#888888",
        green: "#31b748",
        red: "#C74F4F",
        placeholder: "#EEEEEE",
        input: "#F5F5F5",
        "input-focus": "#F3F3F3",
        black: "#000000",
        white: "#FFFFFF",
        "white-contrast": "#F8F8F8",
        yellow: "#fbe041",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
