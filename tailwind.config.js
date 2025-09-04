/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'poker-green': '#0F5132',
        'poker-felt': '#1B5E20',
        'card-bg': '#FAFAFA',
        'chip-blue': '#1976D2',
        'chip-red': '#D32F2F',
        'chip-green': '#388E3C',
        'chip-black': '#424242',
        'gold': '#FFD700',
      },
      fontFamily: {
        'poker': ['Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0,0,0,0.3)',
        'chip': '0 2px 4px rgba(0,0,0,0.4)',
        'table': 'inset 0 0 50px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}

