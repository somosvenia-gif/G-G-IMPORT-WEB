/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLight: "#FFFFFF", // Fondo completamente blanco
        neonPink: "#FF1493", // Rosa neón
        deepBlack: "#000000", // Negro
        lightGray: "#808080", // Gris
        techWhite: "#FFFFFF",
        // Re-mapping legacy names to black/white strictly to avoid burgundy/beige
        bgAnnounce: "#FFFFFF",
        brandDark: "#000000",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // Legacy
        inter: ['Inter', 'sans-serif'],
        playfair: ['Inter', 'sans-serif'],
        grotesk: ['Inter', 'sans-serif'],
        mono: ['Inter', 'sans-serif'],
        dm: ['Inter', 'sans-serif']
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
      }
    },
  },
  plugins: [],
}
