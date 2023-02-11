/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {

      backgroundImage: {
        'orange': "url('/styles/img/krug.svg')",
      },

      colors: {
        'dark-orange': '#FF5C00',
        'light-orange': "#FFAB08",
        'light-grey': "#F9F9F9",
        'grey': "#F2F2F3",
        'desc-grey': "#B1B1B1",
        'btn-orange': "#FF7020"
      },

      padding: {
        '10': '10px',
      },

      lineHeight: {
        's': '36px',
        'm': '43px',
        'l': '60px',
      }

    },

    screens: {
      'small': '480px',
      // => @media (min-width: 480px) { ... }

      'small2': '530px',
      // => @media (min-width: 1024px) { ... }

      'tablet': '768px',
      // => @media (min-width: 768px) { ... }
      'comp': '1024px',
      'special': '1220px',
      'bigcomp': '1440px',
      'fullhd': '1720px',
    },

    fontSize: {
      s: '12px',
      m: '16px',
      header: '28px',
      l: '30px',
      xl: '36px',
      xxl: '50px',

      },

    container: {
      center: true,
      },

    maxWidth: {
        'xsm': '320px',
        'sm': '530px',
        'm': '562px',
        'l': '764px',
      }
  
  },
  plugins: [],
}
