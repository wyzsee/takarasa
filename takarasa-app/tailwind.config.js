/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        brand: {
          primary: "#ADA8D5",
          accent: "#FFB367",
          primary50: "#D4D0F2",
        },
        success: {
          DEFAULT: "#56C365",
        },
        warning: {
          DEFAULT: "#FFD074",
        },
        error: {
          DEFAULT: "#FF4D64",
        },
        grey: {
          10: "#FAFAFF",
          20: "#DEDDE8",
          30: "#C7C6D1",
          40: "#B1B0BA",
          50: "#9A99A3",
          60: "#84838B",
          70: "#6D6C74",
          80: "#57565D",
          90: "#403F46",
          100: "#2A292F",
        },
      },
      fontFamily: {
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      keyframes: {
        "caret-blink": {
        "0%,70%,100%": { opacity: "1" },
        "20%,50%": { opacity: "0" },
        },
        animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
