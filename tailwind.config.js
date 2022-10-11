/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'violet': '#845ec2',
        'purple': {
          DEFAULT: '#2c73d2',
          'light': '#4c88d9',
          'dark': '#2561b2'
        },
        'dark-blue': '#0081cf',
        'dark-cyan': '#0089ba',
        'green': '#008f7a',
        'dark-gray': '#272727'
      }
    },
  },
  plugins: [],
}