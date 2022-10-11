import sassSyntax from 'postcss-scss';

export default {
  syntax: sassSyntax,
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "@csstools/postcss-sass": {}
  }
  // plugins: {
  //   tailwindcss: {},
  //   autoprefixer: {},
  //   sassPlugin({})
  // },
};
