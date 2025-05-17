/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        success: "rgba(var(--success))",
        danger: "rgba(var(--danger))",
        primary: "rgba(var(--primary))",
        secondary: "rgba(var(--secondary))",
        text: "rgba(var(--text))",
        subheading: "rgba(var(--subheading))",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    // screens: {
    //   xs: "480px",
    //   ss: "620px",
    //   sm: "768px",
    //   md: "1060px",
    //   lg: "1200px",
    //   xl: "1700px",
    // },
  },
  plugins: [
    
  ],
};
