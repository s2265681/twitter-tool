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
        theme_bg: "var(--color-theme_bg)",
        theme_text: "var(--color-theme_text)",
        theme_text_light: "var(--color-theme_text_light)",
        input_bg: "var(--color-input-bg)",
        input_default: "var(--color-input-default)",
        input_selected: "var(--color-input-selected)",
        input_primary: "var(--color-input-primary)",
        drowdown_bg: "var(--color-dropdown-bg)",
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
