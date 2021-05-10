module.exports = {
  purge: [],
  theme: {
    extend: {
      boxShadow: {
        navbar: '0px 3px 10px 0px rgba(0,0,0,0.5)',
        square: '0 0 10px rgba(0,0,0,0.12)'
      },
      height: {
        'three-lines': '4.5rem'
      },
      colors: {
        'pastel-green': '#77DD77',
        'almost-black': '#313131',
        'mid-gray': '#73838C',
        'light-gray': '#F5FAFD'
      }
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      backgroundColor: ['disabled']
    }
  }
};
