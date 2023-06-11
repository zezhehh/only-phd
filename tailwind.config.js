/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: "var(--primary-color)",
      secondary: "var(--secondary-color)",
      neutral: "var(--neutral-color)",
      orange: "var(--orange-color)",
      error: "var(--error-color)",
      black: "var(--black-color)",
      white: "var(--white-color)",
    },
  },
  plugins: [],
}
