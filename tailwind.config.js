/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'violet': {
          DEFUALT: '#845ec2'
        },
        'purple': {
          DEFAULT: '#2c73d2',
          'light': '#4c88d9',
          'dark': '#2561b2'
        },
        'blue': { 
          'dark': '#0081cf'
        },
        'cyan': {
          'dark': '#0089ba'
        },
        'green': {
          DEFAULT: '#008f7a',
          'dark': '#006859',
          'light': '#00b69b',
          'light2': '#00caac'
        },
        'gray': { 
          DEFAULT: '#242424',
          'light': '#505050',
          'lighter': '#a7a7a7',
          'dark': '#202020',
        },
        'main': {
          DEFAULT: '#cc570e',
          'megalight': '#ffa770',
          'superlight': '#fc7b28',
          'light': '#f56911',
          'dark': '#b34d0c'
        }
      }
    },
  },
  plugins: [],
}