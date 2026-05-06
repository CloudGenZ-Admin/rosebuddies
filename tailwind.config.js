/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6',
        sunset: '#FD5E53',
        terracotta: '#E2725B',
        mustard: '#E1AD01',
        rose: '#DCAE96',
        dark: '#2A2A2A'
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'xl': '24px',
      },
      animation: {
        'jiggle': 'jiggle 0.4s ease-in-out infinite',
        'draw': 'draw 1.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        jiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        draw: {
          'to': { strokeDashoffset: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}