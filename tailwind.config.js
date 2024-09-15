/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        nav: "rgba(var(--nav))",
        background: "rgba(var(--background))",
        card: "rgba(var(--card))",
        success: "rgba(var(--success))",
        danger: "rgba(var(--danger))",
        primary: "rgba(var(--primary))",
        secondary: "rgba(var(--secondary))",
        accent: "rgba(var(--accent))",
        heading: "rgba(var(--heading))",
        subheading: "rgba(var(--subheading))",
        paragraph: "rgba(var(--paragraph))",
        border: "rgb(var(--border))",
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
