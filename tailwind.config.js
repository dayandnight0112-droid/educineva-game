/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf2f7',
          100: '#fde7f0',
          200: '#fbcfe1',
          300: '#f8a5c4',
          400: '#f36e9e',
          500: '#e60067',
          600: '#d0005d',
          700: '#b0004e',
          800: '#910041',
          900: '#790038',
        }
      },
      fontFamily: {
        sans: [
          'PingFang SC',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ]
      }
    },
  },
  plugins: [],
}
