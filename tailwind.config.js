/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      colors: {
        blue: "#3AB8EB",
        orange: "#F9784B",
        yellow: "#FDBF0F",
        "dark-gray": "#3D3C3C",
        "light-gray": "#676767",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(180deg, rgba(58,184,235,1) 0%, rgba(249,120,75,1) 35%, rgba(253,191,15,1) 73%, rgba(255,255,255,1) 100%)",
      },
    },
  },
  plugins: [],
};
