/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Hind Siliguri"', 'sans-serif'],
        display: ['"Fraunces"', '"Hind Siliguri"', 'serif'],
      },
      colors: {
        // Plum: calm, dignified primary
        brand: {
          50: '#fbf6fb',
          100: '#f5e9f4',
          200: '#ead2e8',
          300: '#d9acd5',
          400: '#c07dba',
          500: '#a5569e',
          600: '#8a3f84',
          700: '#72336d',
          800: '#5e2c5a',
          900: '#4f284c',
          950: '#2f122c',
        },
        cream: '#fbf8f5',
        safety: {
          500: '#10b981', // Green for help
        },
        alert: {
          500: '#dc2626', // Red for emergency / report
        }
      }
    },
  },
  plugins: [],
};
