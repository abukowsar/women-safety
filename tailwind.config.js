/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hind Siliguri"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf2f8',
          100: '#fce7f3',
          500: '#ec4899', // Pink for activism
          600: '#db2777',
          700: '#be185d',
          900: '#831843',
        },
        safety: {
          500: '#10b981', // Green for help
        },
        alert: {
          500: '#ef4444', // Red for report
        }
      }
    },
  },
  plugins: [],
}
