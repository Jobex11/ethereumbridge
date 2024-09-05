/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        primary: "#0C4E86", // Example primary color
        secondary: "#F59E0B",
        main: "#35af74",
        "light-primary": "",
        "light-secondary": "",
        "light-tertiary": "",
        "dark-primary": "",
        "dark-secondary": "",
        "dark-tertiary": "",
      },
      colors: {
        primary: "#0C4E86", // Example primary color
        secondary: "#F59E0B", // Example secondary color
        main: "#35af74",
        "light-primary": "",
        "light-secondary": "",
        "light-tertiary": "",
        "dark-primary": "",
        "dark-secondary": "",
        "dark-tertiary": "",
      },
    },
  },
  plugins: [],
};
