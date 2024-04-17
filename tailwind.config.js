/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        "red-dark": "#BF3B44",
        "red-mid": "#F3BABD",
        "red-light": "#F4E6E7",
        "green-dark": "#639339",
        "green-mid": "#CBE4B4",
        "green-light": "#E5F0DB",
        gray: {
          1: "#1B1D1E",
          2: "#333638",
          3: "#5C6265",
          4: "#B9BBBC",
          5: "#DDDEDF",
          6: "#EFF0F0",
          7: "#FAFAFA",
        },
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
      fontSize: {
        12: "0.75rem",
        14: "0.875rem",
        16: "1rem",
        18: "1.125rem",
        24: "1.5rem",
        32: "2rem",
      },
      rotate: {
        135: "135deg",
      },
    },
  },
  plugins: [],
};
