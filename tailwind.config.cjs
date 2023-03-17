/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Global custom colors here
        primaryblue: "#1e40af",
        navyblue: "#000080",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          128: "32rem",
          144: "36rem",
        },
      },
      animation: {
        "ping-active": "ping .2s linear ",
      },
    },
  },
  plugins: [],
};
