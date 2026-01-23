/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aquí definimos los colores personalizados
        primary: {
          DEFAULT: '#1B396A', // Azul institucional (puedes cambiarlo)
          light: '#2A5298',
          dark: '#122646',
        },
        secondary: {
          DEFAULT: '#D4AF37', // Dorado o color de énfasis
          light: '#E5C76B',
          dark: '#A68A25',
        },
      },
    },
  },
  plugins: [],
}
