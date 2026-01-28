/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}", // Añadido para detectar archivos en la raíz
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
        brand: {
          green: '#10B981',
          'dark-green': '#047857',
        },
        alert: {
          red: '#EF4444',
          orange: '#F97316',
          yellow: '#F59E0B',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1F2937',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
        'fade-out': 'fadeOut 0.3s ease-in forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
