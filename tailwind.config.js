/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        success: "var(--color-success)",
        warning: "var(--color-success)",
        error: "var(--color-error)",
        base: {
          DEFAULT: "#222222",
          bbb: "#BBBBBB",
          999: "#999999",
          666: "#666666",
          222: "#222222",
        },
      },
    },
  },
};
