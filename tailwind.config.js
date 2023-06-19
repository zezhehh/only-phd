/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#6a9fb4",
      secondary: "#e8dab2",
      accent: "#3f94b8",
      neutral: "#9ca496",
      info: "#4f6d7a",
      success: "#6cd390",
      warning: "#e3a47a",
      error: "#df2b2b",
      black: "#200f09",
      white: "#eaeaea",
      "base-100": "#eaeaea",
    },
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6a9fb4",
          secondary: "#e8dab2",
          accent: "#3f94b8",
          neutral: "#9ca496",
          info: "#4f6d7a",
          success: "#6cd390",
          warning: "#e3a47a",
          error: "#df2b2b",
          black: "#200f09",
          white: "#eaeaea",
          "base-100": "#eaeaea",
        },
      },
    ],
    base: false,
  },
};
