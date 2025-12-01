/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B568A",
          blueLight: "#6D9BB9",
          gray: "#B5BCC0",
          dark: "#1A1A1A",
          light: "#F4F6F8",
        },
      },
    },
  },
  plugins: [],
};
