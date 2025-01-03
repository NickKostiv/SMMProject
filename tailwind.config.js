/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        "custom-dark-blue": "rgb(2, 8, 45)",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
      },
      letterSpacing: {
        "extra-wide": "0.5em",
      },
      colors: {
        "custom-green": "#00c891", // Доданий колір
      },
    },
  },
  plugins: [],
};
