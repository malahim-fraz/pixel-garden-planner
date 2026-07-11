/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        sans: ['"VT323"', "monospace"],
      },
      colors: {
        earth: {
          light: "#8b5a2b",
          DEFAULT: "#6b4423",
          dark: "#4a2f16",
        },
        nature: {
          light: "#8fbc8f",
          DEFAULT: "#5e8b3d",
          dark: "#3a5e26",
        },
        sky: {
          light: "#87ceeb",
          DEFAULT: "#6fb7d4",
        },
      },
      boxShadow: {
        pixel: "4px 4px 0px 0px rgba(0,0,0,0.3)",
        "pixel-sm": "2px 2px 0px 0px rgba(0,0,0,0.3)",
        "pixel-inset":
          "inset 2px 2px 0px 0px rgba(255,255,255,0.2), inset -2px -2px 0px 0px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
