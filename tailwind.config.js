/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pages/**/*.html", "./partials/**/*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#23262B",
        "ink-soft": "#565B63",
        paper: "#FBFAF6",
        card: "#FFFFFF",
        primary: { DEFAULT: "#14304F", deep: "#0C1F35" },
        accent: { DEFAULT: "#C8912F", soft: "#F4E9D2", dark: "#B57F22" },
        notice: "#A6392F",
        line: "#E6E2D7",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Archivo", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "1180px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(20,48,79,.07)",
      },
      borderRadius: {
        DEFAULT: "10px",
      },
    },
  },
  plugins: [],
};
